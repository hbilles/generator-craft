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

		'generateTransformsAfterPageLoad' => false
	),

	'<%= craftDomainName %>.dev' => array(
		'devMode'				=> true,
		
		'environmentVariables'	=> array(
			'siteUrl' => 'http://<%= craftDomainName %>.dev'
		)
	),

	'<%= craftDomainName %>.<%= craftStaging %>' => array(
		'devMode'				=> true,
		
		'environmentVariables'	=> array(
			'siteUrl' => 'http://<%= craftDomainName %>.<%= craftStaging %>'
		)
	),

	'<%= craftDomainName %>.<%= craftProductionTLD %>' => array(
		'devMode'				=> false,
		
		'environmentVariables'	=> array(
			'siteUrl' => 'http://<%= craftDomainName %>.<%= craftProductionTLD %>'
		)
	),

);
