// ---------------------------------------------------------------------
// set form validation...

define(['jquery', 'plugins/jquery.validate', 'plugins/jquery.validate.additional'], function($) {

	return function($input) {

		var inputRules = {},
			inputMessages = {};

		if ($input.data('validation-required')) {
			inputMessages.required = $input.data('validation-required');
		}

		if ($input.data('validation-email')) {
			inputRules.email = true;
			inputMessages.email = $input.data('validation-required');
		}

		if ($input.data('validation-tel')) {
			inputRules.intlphone = true;
			inputMessages.intlphone = $input.data('validation-tel');
		}

		// add inputMessages to inputRules object
		inputRules.messages = inputMessages;

		$input.rules('add', inputRules);

	}

});
