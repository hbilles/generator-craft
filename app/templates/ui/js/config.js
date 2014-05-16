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
		'variables': './variables',
		'leaflet': '//cdn.leafletjs.com/leaflet-0.7/leaflet',
		'mapbox': '//api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox',
		// YouTube URL doesn't work with requirejs due to not having a 'js' extension
		// So we append '?dummy=' query parameter to avoid breaking the URL
		'youtubeAPI': '//www.youtube.com/iframe_api?dummy=',
		'vimeoAPI': '//a.vimeocdn.com/js/froogaloop2.min'
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
		'jquery.fitvids': {
			deps: ['jquery']
		},
		'jquery.validate': {
			deps: ['jquery']
		},
		'jquery.validate.additional': {
			deps: ['jquery', 'jquery.validate']
		},
		'mapbox': {
			deps: ['leaflet'],
			exports: 'L'
		},
		'youtubeAPI': {
			exports: 'YT'
		},
		'vimeoAPI': {
			exports: 'Froogaloop'
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
	'plugins/jquery.validate.additional',
	'snippets/menu',
	'snippets/setValidation',
	'snippets/initValidation',
	'snippets/fitVids',
	'snippets/owlCarousel',
	//'snippets/trackLinks',
	//'snippets/trackVideos',
	'snippets/mapboxMap',
	'snippets/devLiveReload',
	'snippets/devDebug',
]);