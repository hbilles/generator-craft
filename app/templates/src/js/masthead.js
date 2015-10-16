// ----------------------------------------------------------------
// Scroll behavior

var $        = require('jquery'),
	debounce = require('lodash/function/debounce');


var lastScrollTop = 0,
	delta = 5,
	$masthead = $('#masthead'),
	mastheadHeight = $masthead.outerHeight();

// on scroll, run hasScrolled
$(window).on('scroll', debounce(function() {
	hasScrolled();
}, 250));

function hasScrolled() {
	var st = $(this).scrollTop();

	if (Math.abs(lastScrollTop - st) <= delta) {
		return;
	}

	// If current position > last position AND scrolled past navbar...
	if (st > lastScrollTop && st > mastheadHeight) {
		//Scroll down
		$masthead.removeClass('masthead--down').addClass('masthead--up');
	} else {
		//Scroll up
		// If did not scroll past the document (possible on mac)...
		if (st + $(window).height() < $(document).height()) {
			$masthead.removeClass('masthead--up').addClass('masthead--down');
		}
	}

	lastScrollTop = st;
}
