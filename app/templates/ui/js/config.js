requirejs.config({
	// here the baseUrl needs to be defined
	// relative to web root
	baseUrl: '/ui/js',
	// paths config is relative to the baseUrl.
	// Never include a '.js' extension since the
	// paths config could be for a directory.
	'paths': {
		'jquery': './vendor/jquery',
		'EventEmitter': './vendor/EventEmitter',
		'eventie': './vendor/eventie',
		'imagesloaded': './vendor/imagesloaded',
		'plugins': './plugins',
		'snippets': './snippets',
		'leaflet': '//cdn.leafletjs.com/leaflet-0.7/leaflet',
		'mapbox': '//api.tiles.mapbox.com/mapbox.js/v1.5.2/mapbox'
	},
	// shim defines dependencies for the jquery
	// plugins and other non-AMD libraries without
	// modifying the source files.
	'shim': {
		'jquery.cookie': {
			deps: ['jquery']
		},
		'owl.carousel': {
			deps: ['jquery']
		},
		'jquery.validate': {
			deps: ['jquery']
		},
		'jquery.fitvids': {
			deps: ['jquery']
		},
		'mapbox': {
			deps: ['leaflet'],
			exports: 'L'
		}
	}
});

// Load the various frameworks, plugins and snippets
requirejs([
	'jquery',
	'leaflet',
	'mapbox',
	'EventEmitter',
	'eventie',
	'imagesloaded',
	'plugins/domReady',
	'plugins/jquery.cookie',
	'plugins/jquery.fitvids',
	'plugins/owl.carousel',
	'plugins/jquery.validate',
	'snippets/development',
	'snippets/debug',
	'snippets/menu',
	'snippets/fitVids',
	'snippets/owlCarousel',
	//'snippets/linkTracking',
	'snippets/validateForm',
	'snippets/map'
]);