// ---------------------------------------------------------------------
// initialize form validation on page load

define(['jquery', 'snippets/setValidation', 'plugins/domReady!'], function($, setValidation) {

	var form = $('#contact-form form'),
		formInputs = form.find(':input');
	
	// initialize form validation
	form.validate();

	// add validation rules for each input
	formInputs.each(function() {
		var $this = $(this);

		setValidation($this);
	});

});
