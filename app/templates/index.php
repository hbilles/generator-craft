<?php

// Path to your craft/ folder
$craftPath = '../craft';

// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

define('CRAFT_TEMPLATES_PATH', '../public/ui/templates/');


if (!is_file($path))
{
	exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
