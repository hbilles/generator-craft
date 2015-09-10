// ---------------------------------------------------------------------
// set form validation...

var $                  = require('jquery'),
	validate           = require('validate'),
	validateAdditional = require('validateAdditional');


module.exports = function($input) {

	var inputRules = {},
		inputMessages = {};

	if ($input.data('validation-required')) {
		inputMessages.required = $input.data('validation-required');
		//console.log('Added a required rule.');
	}

	if ($input.data('validation-email')) {
		inputRules.email = true;
		inputMessages.email = $input.data('validation-required');
		//console.log('Added an email rule.');
	}

	if ($input.data('validation-tel')) {
		inputRules.intlphone = true;
		inputMessages.intlphone = $input.data('validation-tel');
		//console.log('Added a telephone rule.');
	}

	// add inputMessages to inputRules object
	inputRules.messages = inputMessages;

	$input.rules('add', inputRules);

}
