/*!
 * Video Google Analytics Tracking 0.10.1
 * trackVideos.js
 * Last updated February 5, 2014
 *
 * Hite Billes @ Line 58
 * http://line58.com
 *
 * Track all YouTube and Vimeo video embeds on a page
 * without needing to add custom javascript for each
 * video. Only works with modern iframe embeds from
 * both services.
 *
 * NOTE: This module has been written without a dependency on jQuery!
 *
 * Expanded upon work started by Sayf Sharif @sayfsharif
 * http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics/
 *
 * YouTube Player API: https://developers.google.com/youtube/js_api_reference
 * Vimeo Player API:   http://developer.vimeo.com/player/js-api
 * 
 */

define(['youtubeAPI', 'vimeoAPI', 'plugins/domReady!'], function(YT, Froogaloop) {

	// Create arrays that will hold the YouTube and Vimeo videos
	// as well as the YouTube players. Flag variables are set to
	// detect presence of YouTube or Vimeo videos on page.
	var ytVideoIds  = [],
		vmVideoIds  = [],
		ytPlayers = [],
		// videoPlays is a js object to keep track of which videos have been played
		videoPlays = {},
		// The _pauseFlag boolean is designed to prevent the rapid
		// fire pause events that might occur on dragging the slide bar.
		_pauseFlag = false;



	// find and tag all YouTube and Vimeo videos to be tracked
	// NOTE: this function is self-executing, so no need to manually call it
	( function trackVideos() {

		var iframes = document.getElementsByTagName('iframe');

		// loop through all the iframes on the page
		for (var i = 0; i < iframes.length; i++) {
			// Test that the iframe has a source
			if (iframes[i].src != null) {
				// assign the current iframe to variable 'video' and
				// assign the iframe's src attribute to variable 'vidSrc'.
				var video = iframes[i],
					vidSrc = video.src;

				// Define the YouTube and Vimeo regular expression patterns.
				// For each matching iframe an array of two objects is created:
				// The first object contains the full source of the video
				// The second object contains the video id alone
				var ytRegex = /(?:https?:)?\/\/www\.youtube\.com\/embed\/([\w-]{11})(?:\?.*)?/,
					vmRegex = /(?:https?:)?\/\/player\.vimeo\.com\/video\/([0-9]*)(?:\?.*)?/;

				// Tag and save YouTube video ids to ytVideoIds
				if (vidSrc.match(ytRegex)) {

					var matches = vidSrc.match(ytRegex);
					// Define the source and id.
					// Remove any query strings from source with split('?')[0]
					var ytSrc    = matches[0].split('?')[0],
						ytId     = matches[1];

					ytVideoIds.push(ytId);
					
					// tag the video's iframe with an id and data attribute
					iframes[i].id = ytId;
					iframes[i].setAttribute('data-video-vendor', 'youtube');

					//console.log('Found a YouTube video: ' + ytId);
				}
				// Tag and save Vimeo video ids to vmVideoIds
				else if(vidSrc.match(vmRegex)) {

					var matches = vidSrc.match(vmRegex);
					// Define the source and id.
					// Remove any query strings from source with split('?')[0]
					var vmSrc    = matches[0].split('?')[0],
						vmParams = matches[0].split('?')[1],
						vmId     = matches[1];

					vmVideoIds.push(vmId);

					iframes[i].id = vmId;
					iframes[i].setAttribute('data-video-vendor', 'vimeo');
					
					// enable Vimeo API by appending the following to the source
					if(vmParams === undefined) {
						var newSrc = vmSrc + '?api=1&player_id=' + vmId;
					} else {
						var newSrc = vmSrc + '?' + vmParams + '&api=1&player_id=' + vmId;
					}

					iframes[i].src = newSrc;

					//console.log('Found a Vimeo video: ' + vmId);
				}
			}
		}

		// kick off youtube and vimeo event binding
		youTubeInitialize();
		vimeoInitialize();

	})();



	// --------------------------------------------------------
	// YouTube Event Binding

	// When ready, the following initialization function
	// will be called, which will loop through ytVideoIds and
	// attach event listeners to each YouTube video.
	function youTubeInitialize() {
		for (var i = 0; i < ytVideoIds.length; i++) {
			ytPlayers[i] = new YT.Player(ytVideoIds[i], {
				videoId: ytVideoIds[i],
				events: {
				'onReady': onYouTubeReady,
				'onStateChange': onYouTubeStateChange
				}
			});

			// Add this video to the videoPlays object to keep
			// track of whether the video has been played
			videoPlays[ytVideoIds[i]] = false;
		}
	}

	// Optional. Define what happens when a YouTube video is ready.
	function onYouTubeReady(event) {
		//event.target.playVideo();
	}

	function onYouTubeStateChange(event) { 
		var ytURL = event.target.getVideoUrl();

		// strip the video id from the URL
		var regex = /v=(.+)$/;
		var matches = ytURL.match(regex);
		var ytId = matches[1];

		// call the appropriate function for the event
		// passing in the video's Id
		if (event.data == YT.PlayerState.PLAYING) {
			onPlay(ytId, 'YouTube');
		}

		if (event.data == YT.PlayerState.PAUSED) {
			onPause(ytId, 'YouTube');
		}

		if (event.data == YT.PlayerState.ENDED) {
			onFinish(ytId, 'YouTube');
		}
	}



	// --------------------------------------------------------
	// Vimeo Event Binding

	// Cycle through Vimeo videos and attach event listeners
	function vimeoInitialize() {
		for (var i = 0; i < vmVideoIds.length; i++) {
			Froogaloop(document.getElementById(vmVideoIds[i])).addEvent('ready', onVimeoReady);

			// Add this video to the videoPlays object to keep
			// track of whether the video has been played
			videoPlays[vmVideoIds[i]] = false;
		}
	}

	function onVimeoReady(videoId) {
		// Keep a reference to Froogaloop API for this player
		player = Froogaloop(videoId);

		// Attach event listeners
		player.addEvent('play', onPlay);
		player.addEvent('pause', onPause);
		player.addEvent('finish', onFinish);
	}



	// --------------------------------------------------------
	// Track Events from YouTube & Vimeo

	function onPlay(videoId, service) {
		if(service === undefined) service = 'Vimeo';

		// Check whether this video has been played yet.
		// If not, track the event and set this video as
		// having been played.
		if (videoPlays[videoId] === false) {
			pushEvent(service, 'Play', videoId);

			// set the video as having been played
			videoPlays[videoId] = true;
		}

		_pauseFlag = false;
	}

	function onPause(videoId, service) {
		if(service === undefined) service = 'Vimeo';

		// If we are already paused, don't fire again.
		if(_pauseFlag == false) {
			pushEvent(service, 'Pause', videoId);

			// Since we are paused, set the flag to true.
			_pauseFlag = true;
		}
	}

	function onFinish(videoId, service) {
		if(service === undefined) service = 'Vimeo';

		pushEvent(service, 'Watch to End', videoId);
	}



	// --------------------------------------------------------
	// Push Events to Google Analytics

	function pushEvent(service, action, videoId) {
		// Check the version of Google Analytics currently running
		// and execute the appropriate tracking code
		if (typeof _gaq === 'function') {
			_gaq.push(['_trackEvent', service + ' Videos', action, videoId ]);
		} else if (typeof ga === 'function') {
			ga('send', 'event', service + ' Videos', action, videoId);
		}

		//console.log(service + ' video #' + videoId + ': ' + action);
	}


});

// end jquery.trackVideos.js
