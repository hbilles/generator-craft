({
	mainConfigFile: 'config.js',
	// here the baseUrl needs to be defined relative
	// to the server root, so '.' refers to
	// the current directory
	baseUrl: '.',
	paths: {
		'leaflet': 'empty:',
		'mapbox': 'empty:'
	},
	name: 'config',
	out: './build/config.js'
})