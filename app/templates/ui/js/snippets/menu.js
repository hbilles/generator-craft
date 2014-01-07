// --------------------------------------------------------------------
// mobile menu
//
// domReady with the trailing ! below has the effect of delaying module execution
// until the DOM is ready.

define(['jquery', 'plugins/domReady!', 'variables/mediaQueries'], function($, domReady, mq) {

	// ----------------------------------------------------------------
	// Global variables

	var navMenu = $('#menu'),
		menuTrigger = $('.jump a'),
		open = false,
		showTrigger = true,
		resizeTimer;

	// ----------------------------------------------------------------
	// Functions

	function toggleTrigger() {

		menuTrigger.toggleClass('visuallyhidden');
		showTrigger = !showTrigger;

	}

	function toggleOpen() {

		if (open) {
			navMenu.slideUp('fast');
		} else {
			navMenu.slideDown('fast');
		}

		menuTrigger.toggleClass('open');
		open = !open;

	}

	// ----------------------------------------------------------------
	// Initialization

	navMenu.insertAfter('#header').addClass('js');

	if ( $(window).width() < mq.px.medium ) {
		
		navMenu.hide();

	} else {
		
		menuTrigger.addClass('visuallyhidden');
		showTrigger = false;

	}


	$('#site').removeClass('preload');

	
	menuTrigger.on('click', function(e){
		e.preventDefault();

		toggleOpen();

	});

	function onResizeDo() {

		if ( $(window).width() >= mq.px.medium ) {
			
			if (showTrigger) {

				toggleTrigger();

			}

			if (!open) {
				
				toggleOpen();

			}
		} else { // window is back to smaller screen width

			if (!showTrigger) {

				toggleTrigger();

			}

			if (open) {

				toggleOpen();

			}

		}

	}


	$(window).resize(function() {
		
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(onResizeDo, 250);

	});
	
});