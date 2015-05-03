// --------------------------------------------------------------------
// set placeholders
//
// polyfill for older browsers

var $           = require('jquery'),
	placeholder = require('placeholder');


$('.hideLabels li label, .hideLabels p label, .hide-label label').addClass('visuallyhidden');
$('input, textarea').placeholder();
