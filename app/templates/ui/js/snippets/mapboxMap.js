define(['jquery', 'leaflet', 'mapbox', 'plugins/domReady!'], function($, leaflet, mapbox) {

	// Detecting IE
	var oldIE;

	if ( $('html').is('.ie6, .ie7, .ie8') ) {
		oldIE = true;
	}

	if ( !oldIE && $('#map').length > 0 ) {

		// ---------------------------------------------------------------------
		// remove the static map and load map data via JSON

		var mapWidth = $('#map').width();

		$('#map').addClass('mapbox').css({
			'width': mapWidth,
			'height': (mapWidth * .75)
		});

		$.getJSON( '//' + location.hostname + '/contact/mapdata.json' + '?jsoncallback=?', function(json) {
			mapData = json;
			$('#map img').remove();
			do_mapbox(mapData[0]);
		});


		// ------------------------------------------------------------------------
		// mapbox map

		function do_mapbox(mapData) {

			// make short vars from JSON data
			var md = mapData,
				mm = mapData.myMarker;

			// make the map
			var map = L.mapbox.map('map', 'line58.map-zf41dod5').setView([md.latitude, md.longitude], md.zoom);

			// make the popup
			var popupContent = '<p><a target="_blank" href="' + mm.url + '" title="' + mm.caption + '"><img src="' + mm.image + '" style="margin:0 0 .5em" width="200" height="auto"><br>' + mm.caption + '</a></p>';

			// make the custom marker
			L.marker([md.latitude, md.longitude], {
				icon: L.icon({
					iconUrl: mm.icon,
					iconSize: [40, 40],
					iconAnchor: [20, 40],
					popupAnchor: [0, -50]
				})
			}).addTo(map).bindPopup(popupContent, {
				minWidth: 200,
				autoPan: true
			});
		}
	} // end msie check

});
