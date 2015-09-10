var $            = require('jquery'),
	imagesLoaded = require('imagesLoaded'),
	owlCarousel  = require('owlCarousel'),
	mq           = require('./media-queries');


if ( $(window).width() >= mq.px.medium ) {

	var gallery = $('.gallery');

	imagesLoaded(gallery, function() {
		gallery.owlCarousel({
			items: 1,
			margin: 0,
			loop: true,
			nav: false
		});

		/*
		var labelPrev = '<span class="visuallyhidden">prev</span>',
			labelNext = '<span class="visuallyhidden">next</span>';

		$('.owl-prev').html(labelPrev);
		$('.owl-next').html(labelNext);
		*/
	});

}
