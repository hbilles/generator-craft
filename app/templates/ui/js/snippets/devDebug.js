// ----------------------------------------------------------------------
// debug. do not leave in production!

define(['jquery'], function($) {

	// grid toggler for layout debugging
	var grid_toggle_link = '<p class="debugger"><a href="">[+]';

	if ($(window).width() > 480) {
		$('#site').after(grid_toggle_link);
	}

	if ($.cookie('show_grid') == 'yes') {
		$('body').addClass('debug');
	}
	$('p.debugger a').on('click', function(e){
		e.preventDefault();

		if ($.cookie('show_grid') == 'yes') {
			$.cookie('show_grid', null, {path: '/'});
		} else {
			$.cookie('show_grid', 'yes', {path: '/'});
		}
		$('body').toggleClass('debug');
	});

});
