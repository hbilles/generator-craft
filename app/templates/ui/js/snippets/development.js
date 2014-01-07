define(['jquery'], function($) {

	// Only run when in development environment
	if (window.location.host === '<%= craftDomainName %>.dev') {

		var site = $('#site'),
			script = '<script src="//localhost:35729/livereload.js"><\/script>';

		site.after(script);

	}

});