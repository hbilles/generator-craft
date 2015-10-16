var $            = require('jquery'),
	_            = require('lodash/function.js'),
	imagesLoaded = require('imagesLoaded'),
	matchHeight  = require('matchHeight');


// Set select items to equal heights
var $featuredNewsItems = $('.featured-news__item');

if ($featuredNewsItems.length) {
	imagesLoaded($featuredNewsItems, function() {
		setMatchHeight();
	});

	$(window).on('resize', _.debounce(setMatchHeight, 300));
}

function setMatchHeight() {
	$featuredNewsItems.matchHeight();
}
