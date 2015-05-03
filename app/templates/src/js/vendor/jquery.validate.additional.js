// Internation phone number validation
// Found on Stack Overflow at: http://stackoverflow.com/questions/8397523/jquery-plugin-for-international-phone-number-validations
// References blog post at: http://www.24hourapps.com/2009/02/jquery-international-phone-number.html

jQuery.validator.addMethod('intlphone', function(value) {
	return (value.match(/^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}(\s*(ext|x)\s*\.?:?\s*([0-9]+))?$/));
}, 'Please enter a valid phone number');
