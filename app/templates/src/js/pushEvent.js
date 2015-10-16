// ---------------------------------------------------------------------
// push events to Google Analytics


module.exports = function(category, action, label) {
	// Test which version of Google Analytics is running and
	// execute the appropriate tracking call.
	if (typeof _gaq === 'function') {
		if (typeof label === 'undefined') {
			_gaq.push(['_trackEvent', category, action ]);
		} else {
			_gaq.push(['_trackEvent', category, action, label ]);
		}
	} else if (typeof ga === 'function') {
		if (typeof label === 'undefined') {
			ga('send', 'event', category, action);
		} else {
			ga('send', 'event', category, action, label);
		}
	}
};
