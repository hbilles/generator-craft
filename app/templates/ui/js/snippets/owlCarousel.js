define(['jquery', 'imagesloaded', 'plugins/owl.carousel'], function($, imagesLoaded) {


	$('.carousel').owlCarousel({
		navigation : true,
		pagination : false,
		slideSpeed : 500,
		autoHeight : true,
		singleItem : true,
		addClassActive : true,
		rewindNav : false,
		afterMove : doAfterMove
	});


	var slidesTotal = $('.owl-item').size();

	$('.owl-controls').prepend('<div class="slidecount">');
	$('.slidecount').text('1 / ' + slidesTotal);


	function doAfterMove() {
		var slideIndex = $('.owl-item').index($('.active'));
		slideIndexDisplay = slideIndex + 1;

		$('.slidecount').text(slideIndexDisplay + ' / ' + slidesTotal);

		if ( slideIndexDisplay === slidesTotal ) {
			$('.owl-next').addClass('disabled');
		} else {
			$('.owl-next').removeClass('disabled');
		}

		if ( slideIndexDisplay === 1 ) {
			$('.owl-prev').addClass('disabled');
		} else {
			$('.owl-prev').removeClass('disabled');
		}
	}
	




});
