define(['jquery', 'leaflet', 'mapbox', 'plugins/domReady!'], function($, leaflet, mapbox, domReady) {

	// ---------------------------------------------------------------------
	// Variables

	var showMap = true,
		mapLoaded = false,
		mapParent = $('.contact-secondary'),
		toggleParent = $('.contact-main'),
		parentContainer = mapParent.parent(),
		contactForm = $('.contact-secondary .contact-form');


	// ------------------------------------------------------------------------
	// Functions - create a mapbox map

	function doMapbox(mapData) {

		// default map coordinates (will be overwritten by fitBounds)
		var zoom = 16,
			latitude = 29.963263113048257,
			longitude = -90.0575065612793;

		// draw the map
		var map = L.map('map')
			.setView([latitude, longitude], zoom)
			.addLayer(L.mapbox.tileLayer('line58.map-p3n461m6', {
				detectRetina: true,
				attribution: 'Line 58'
		}));

		// disable UI controls
		//map.dragging.disable();
		//map.touchZoom.disable();
		map.doubleClickZoom.disable();
		map.scrollWheelZoom.disable();


		// empty array for all marker coordinates
		var markerCoordinates = [];
		
		// make the markers
		$.each(mapData, function(i, item) {

			var mm = item.marker;
			
			var popupContent = '<h3>' + mm.location + '</h3>' + '<p>' + mm.address + '<br>' + mm.address2 + '<br>' + mm.city + ', ' + mm.state + ' ' + mm.zipCode + '</p>';

			L.marker([mm.latitude, mm.longitude], {
				icon: L.icon({
					iconUrl: mm.icon,
					iconSize: [100, 55],
					iconAnchor: [50, 27],
					popupAnchor: [0, -28]
				})
			}).addTo(map).bindPopup(popupContent, {
				minWidth: 200
			}).on('click', function() {
				map.panTo([mm.latitude, mm.longitude])
			});

			markerCoordinates[i] = [mm.latitude, mm.longitude];

		});

		// fit map to bounds by passing marker coordinates to a new array with padding
		var mapBounds = new L.LatLngBounds([markerCoordinates]).pad(.15);
		map.fitBounds([mapBounds]);
		map.setZoom(16);


		L.marker.on('click', function(e) {
		    alert(e.latlng);
		});


	} // end doMapbox

	function loadMap() {
		// Get the map tiles
		$.getJSON( '//' + location.hostname + '/contact/mapdata.json' + '?jsoncallback=?', function(json) {
			mapData = json;
			doMapbox(mapData);
		});
	}

	function toggleVisibility() {
		var toggleSwitch = $('#contact-toggle'),
			map = $('.map-wrapper'),
			form = $('.contact-secondary .contact-form');

		toggleSwitch.on('click', function(e) {
			e.preventDefault();

			var oldMessage = toggleSwitch.text(),
				newMessage = toggleSwitch.data('toggle-message');

			map.toggle();
			form.toggle();

			// Toggle the button message
			toggleSwitch.text(newMessage);
			toggleSwitch.data('toggle-message', oldMessage);

			// If the map is not loaded yet..
			if (!mapLoaded) {
				loadMap();
			}
		});
	}


	// ---------------------------------------------------------------------
	// Initialization

	if ( showMap ) {

		// Detach the containers from the DOM
		mapParent.detach();
		toggleParent.detach();

		//contactForm.hide();
		
		// Add the toggle switch object
		toggleParent.append('<p><span id="contact-toggle" data-toggle-message="Send us a message">Show the map</span></p>');

		// Add the map 
		mapParent.append('<div class="map-wrapper"><div id="map"></div></div>');

		// Re-attach the containers to the DOM
		parentContainer.append(toggleParent).append(mapParent);

		// Set the Map size based on wrapper
		var mapWrapper = $('.map-wrapper');
		var mapWrapperWidth = mapWrapper.width();

		var mapWidth = mapWrapperWidth;
		var mapHeight = mapWrapperWidth * (3/4);

		$('#map').css({
			width: mapWidth,
			height: mapHeight
		});

		// Hide the map
		mapWrapper.hide();

		// Setup toggle function
		toggleVisibility();
	}

});