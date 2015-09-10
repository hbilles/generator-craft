// ---------------------------------------------------------------------
// load forms from javascript templates

var $             = require('jquery'),
	setValidation = require('./set-validation');

// TODO: refactor for IE8 support?
var formTemplates = document.querySelectorAll('script[data-type="form"]'),
	formCount = formTemplates.length;

// function to add validation rules for each input
function validateForm($form, options) {
	var options = options || {},
		$inputs = $form.find(':input');

	$form.validate(options);

	$inputs.each(function() {
		var $this = $(this);

		setValidation($this);
	});
}


for ( var i = 0; i < formCount; i++ ) {
	var formTemplate = formTemplates[i],
		formEl = document.createElement('form');

	// set the form's attributes and content
	formEl.className = formTemplate.getAttribute('data-class') || '';
	formEl.id = formTemplate.getAttribute('data-id') || '';	
	formEl.setAttribute('method', 'post');
	formEl.setAttribute('accept-charset', 'UTF-8');
	formEl.innerHTML = formTemplate.innerHTML;

	// add the form to the DOM
	var parent = formTemplate.parentNode,
		form = parent.insertBefore(formEl, formTemplate),
		$form = $(form);

	// set the form's validation rules
	validateForm($form);
}