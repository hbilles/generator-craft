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
	),

	'<%= domainName %>.dev' => array(
		'devMode'				=> true,
		'environmentVariables'	=> array(
			'siteUrl' => 'http://<%= domainName %>.dev'
		)
	),

	'<%= domainName %>.<%= stagingDomain %>' => array(
		'devMode'				=> true,
		'environmentVariables'	=> array(
			'siteUrl' => 'http://<%= domainName %>.<%= stagingDomain %>'
		)
	),

	'<%= domainName %>.<%= productionTLD %>' => array(
		'environmentVariables'	=> array(
			'siteUrl' => 'http://<%= domainName %>.<%= productionTLD %>'
		)
	),

);
