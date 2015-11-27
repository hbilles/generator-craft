<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
	'*' => array(
		'defaultImageQuality'	=> 80,
		'omitScriptNameInUrls' => true,
		'generateTransformsAfterPageLoad' => false,
		// custom global variables
		'titleBullet' => '·',
		'homeLinkTitle' => 'back to homepage',
		'googleAnalyticsProfileId' => 'UA-XXXXXXXX-X',
		'campaignMonitorUrl' => '',
		'campaignMonitorEmailFieldId' => '',
	),

	'<%= domainName %>.dev' => array(
		'devMode'				=> true,
		'environmentVariables'	=> array(
			'basePath' => '../public/',
			'baseUrl' => '/'
		)
	),

	'<%= domainName %>.<%= stagingDomain %>' => array(
		'environmentVariables'	=> array(
			'basePath' => '../public/',
			'baseUrl' => 'http://<%= domainName %>.<%= stagingDomain %>/'
		)
	),

	'<%= domainName %>.<%= productionTLD %>' => array(
		'environmentVariables'	=> array(
			'basePath' => '../public/',
			'baseUrl' => 'http://<%= domainName %>.<%= productionTLD %>/'
		)
	),

);
