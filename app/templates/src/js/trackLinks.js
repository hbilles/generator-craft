// ----------------------------------------------------------------------
// Track all site links
// This setup tags where in the page clicked links reside,
// whether in the #menu, #content, or #footer areas.

var $ = require('jquery');


// Define Regular Expression pattern for phone and email links
var phoneLinkRegex = /^tel\:/,
	emailLinkRegex = /^mailto\:/,
	jumpLinkRegex  = /^#/;

// Loop through all links on the page.
$('a').each(function() {
	var link = $(this),
		linkTarget = link.attr('href');

	// If the RegEx pattern matches, set a data attribute on the link
	// so we can set an event listener on it later.
	if(linkTarget.match(phoneLinkRegex)) {
		link.attr('data-link-type', 'telephone');
	} else if(linkTarget.match(emailLinkRegex)) {
		link.attr('data-link-type', 'email');
	} else if(linkTarget.match(jumpLinkRegex)) {
		link.attr('data-link-type', 'jump');
	}
});

// Tag all external links
$('a').not('[data-link-type="telephone"], [data-link-type="email"], [data-link-type="jump"]').filter(function() {
	return this.hostname && this.hostname !== location.hostname;
}).attr('data-link-type', 'external');

// Tag the rest as internal links
$('a').not('[data-link-type="telephone"], [data-link-type="email"], [data-link-type="jump"], [data-link-type="external"]').attr('data-link-type', 'internal');

// Attach IDs of parent containers to links
$('#header a').attr('data-parent-id', '#header');
$('#content a').attr('data-parent-id', '#content');
$('#menu a').attr('data-parent-id', '#menu');
$('.footer a').attr('data-parent-id', '.footer');

// Define function to push GA Event
var pushEvent = function(category, link, parentID) {
	// Test which version of Google Analytics is running and
	// execute the appropriate tracking call.
	if (typeof _gaq === 'function') {
		_gaq.push(['_trackEvent', category, link, 'Parent ID: ' + parentID ]);
	} else if (typeof ga === 'function') {
		ga('send', 'event', category, link, 'Parent ID: ' + parentID);
	}
}



// Set 'click' event listener on telephone links
$('a[data-link-type="telephone"]').on('click', function(e) {
	var link = $(this),
		parentID = link.data('parent-id') || 'No ID',
		phoneNumber = link.attr('href');
	
	// Track the call event, the phone number called & the link's parent id
	pushEvent('Phone Call', phoneNumber, parentID);
});

// Set 'click' event listener on email links
$('a[data-link-type="email"]').on('click', function(e) {
	var link = $(this),
		parentID = link.data('parent-id') || 'No ID',
		email = link.attr('href');
	
	// Track the click event
	pushEvent('Email Links', email, parentID);
});

// Update the titles of external links
$('a[data-link-type="external"]').each(function() {
	var link = $(this);
		
	link.attr('target', '_blank');

	if (link.attr('title') === undefined) {
		link.attr('title', 'Visit website');
	}

	link.attr('title', link.attr('title') + ' (opens in a new window)');
});

// Set 'click' event listener on external links
$('a[data-link-type="external"]').on('click', function(e) {
	var link = $(this),
		parentID = link.data('parent-id') || 'No ID',
		target = link.attr('href');

	// Track the click event
	pushEvent('External Links', target, parentID);
});

// Set 'click' event listener on internal links
$('a[data-link-type="internal"]').on('click', function(e) {
	var link = $(this),
		parentID = link.data('parent-id') || 'No ID',
		target = link.attr('href');
	
	// Track the click event
	pushEvent('Internal Links', target, parentID);
});
