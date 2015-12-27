// ---------------------------------------------------------------------
// load forms from javascript templates

var $             = require('jquery'),
	setValidation = require('./set-validation'),
	pushEvent     = require('./push-event');


var formTemplates  = document.querySelectorAll('script[data-type="form"]'),
	formCount      = formTemplates.length;

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

// function to add/remove a dependent form field
function toggleField() {
	var templateId = this.options[this.selectedIndex].getAttribute('data-dependent-template-id'),
		activeFieldId = this.getAttribute('data-active-dependent-field-id');

	// remove the current dependent field
	if ( activeFieldId && activeFieldId != templateId ) {
		var activeField = document.querySelector('#' + activeFieldId);

		if (activeField) {
			activeField.parentNode.removeChild(activeField);
		}
	}

	// turn the selected template into an active field
	if ( templateId ) {
		var template = document.querySelector('#' + templateId),
			el       = document.createElement(template.getAttribute('data-el'));

		el.className = template.getAttribute('data-class') || '';
		el.id        = template.getAttribute('data-id');
		el.innerHTML = template.innerHTML;

		if ( this.nodeName.toLowerCase() === 'input' ) {
			this.parentNode.parentNode.parentNode.insertBefore(el, this.parentNode.parentNode.nextSibling);
		} else {
			this.parentNode.parentNode.insertBefore(el, this.parentNode.nextSibling);
		}

		// set the ID of the current field on the select node for later removal
		this.setAttribute('data-active-dependent-field-id', template.getAttribute('data-id'));
	}
}


for ( var i = 0; i < formCount; i++ ) {
	var formTemplate = formTemplates[i],
		formEl = document.createElement('form'),
		formEnctype = formTemplate.getAttribute('data-enctype');

	// set the form's attributes and content
	formEl.className = formTemplate.getAttribute('data-class') || '';
	formEl.id = formTemplate.getAttribute('data-id') || '';	

	if ( formEnctype ) {
		formEl.setAttribute('enctype', formEnctype);
	}

	formEl.setAttribute('method', 'post');
	formEl.setAttribute('accept-charset', 'UTF-8');
	formEl.innerHTML = formTemplate.innerHTML;

	// add the form to the DOM
	var parent = formTemplate.parentNode,
		form = parent.insertBefore(formEl, formTemplate),
		$form = $(form);

	// set the form's validation rules
	if ( dataSector ) {
		var options = {
			submitHandler: function(form) {
				pushEvent('Sector', 'download', dataSector);

				form.submit();
			}
		}

		validateForm($form, options);
	} else {
		validateForm($form);
	}

}


var triggers     = document.querySelectorAll('*[data-type="field-trigger"]'),
	triggerCount = triggers.length;

// Setup events for showing/hiding dependent form fields
for ( var i = 0; i < triggerCount; i++ ) {
	var trigger = triggers[i];

	switch (trigger.nodeName.toLowerCase()) {
		case 'select':
			//console.log('Found a select!');
			trigger.addEventListener('change', toggleField, false);
			break;

		/*
		case 'input':
			console.log('Found an input!');
			trigger.addEventListener('click', toggleField, false);
			break;
		*/
	}
}
