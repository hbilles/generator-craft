// ---------------------------------------------------------------------
// form validation

define(['jquery', 'plugins/jquery.validate'], function($) {

	$('.contact-form').validate({
		rules: {
			fromName: 'required',
			fromEmail: {
				required: true,
				email: true
			},
			subject: 'required',
			message: 'required',
			captcha: 'required'
		},

		messages: {
			fromName: 'Please provide your Name',
			fromEmail: {
				required: 'Please provide your Email Address',
				email: 'This is not a valid Email Address'
			},
			subject: 'Please select a Subject',
			message: 'Please provide a Message',
			captcha: 'Please prove that you are a human'
		},

		errorElement: 'span',
		errorClass: 'error',
		errorPlacement: function(error, element) {
			error.appendTo( element.parent() );
		}

	}); // end validation rules

});