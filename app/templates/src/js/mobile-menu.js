var $ = require('jquery');


var $body = $('body'),
	$page = $('#page');

$page.on('click', '#masthead-menuTrigger a', function(e) {
	e.preventDefault();

	//toggleLogo();
	toggleVisibility();
});

function toggleLogo() {
	var $logo = $('#logo .logo'),
		logo1,
		logo2;

	logo1 = $logo.attr('src');
	logo2 = $logo.data('altsrc');
	$logo.attr('src', logo2);
	$logo.data('altsrc', logo1);
}

function toggleVisibility() {
	$('#menu-mobile').toggle();
	$('#content').toggle();
	$('.footer').toggle();
	$('#subFooter').toggle();

	$body.toggleClass('body-menuOpen');
}

// ----------------------------------------------------------------
// Scroll behavior

var didScroll,
	lastScrollTop = 0,
	delta = 5,
	$masthead = $('#masthead'),
	mastheadHeight = $masthead.outerHeight();

// on scroll, let the interval function know the user has scrolled
$(window).scroll(function(e) {
	didScroll = true;
});

// run hasScrolled and reset didScroll status
setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);

function hasScrolled() {
	var st = $(this).scrollTop();

	if (Math.abs(lastScrollTop - st) <= delta) {
		return;
	}

	// If current position > last position AND scrolled past navbar...
	if (st > lastScrollTop && st > mastheadHeight) {
		//Scroll down
		$masthead.removeClass('masthead-down').addClass('masthead-up');
	} else {
		//Scroll up
		// If did not scroll past the document (possible on mac)...
		if (st + $(window).height() < $(document).height()) {
			$masthead.removeClass('masthead-up').addClass('masthead-down');
		}
	}

	lastScrollTop = st;
}
