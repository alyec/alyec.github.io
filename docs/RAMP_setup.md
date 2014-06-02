---
layout: index-en
title: RAMP Setup
categories: [documentation]
---
{% include JB/setup %}

RAMP Setup
==========

Loading Dojo and ESRI
---------------------

RAMP uses the [Dojo](http://dojotoolkit.org/) and [ESRI](https://developers.arcgis.com/javascript/) Javascript API, which can be loaded from your main html map page using:

	<script type="text/javascript" src="./javascript/src/RAMP/RAMP-starter.js"></script>
	<script src="http://js.arcgis.com/3.8/" type="text/javascript"></script>

The latter load ESRI and Dojo, the former is a [configuration file](http://dojotoolkit.org/reference-guide/1.9/dojo/_base/config.html) that Dojo needs in order to link up RAMP modules (Note: order matters, the configuration file must be loaded before Dojo). The configuration file contains an object called “dojoConfig” (it is a globalObject that needs to be named exactly like that, case-sensitive):

	dojoConfig = {
		parseOnLoad: false,
		locale: "en",
		async: true,
		packages:[{
			"name" : "ramp",
			"location" : "javascript/src/RAMP/Modules"
		},
		{
			"name" : "utils",
			"location" : "javascript/src/RAMP/Utils"
		}]
	};

Dojo Config Parameters
----------------------

The dojoConfig object contains many different parameters, the ones relevant for RAMP are outlined below, a description of the rest can be found [here](http://dojotoolkit.org/reference-guide/1.9/dojo/_base/config.html). 

_parseOnLoad_: if true, Dojo will parse your HTML page for any Dojo markups and replace them with widgets. If false, you must manually tell Dojo to parse the page at a later time (Recommended: false, since we’re not using any Dojo markups in RAMP, and parsing creates some overhead during loading).

_locale_: the current locale, since the dojoConfig object is built in javascript, there can be logic to figure out the locale before creating this object. For example:

_async_: if true, Dojo will load all the modules asynchronously (Recommended: true)

_packages_: an array of objects, each object contains a “name” and “location” field, which is used to give alias to module locations. The location should be relative to your HTML map page. In the above example, “ramp” is an alias for “javascript/src/RAMP/Modules/”, thus if there is a module located at: “javascript/src/RAMP/Modules/map.js”, then using the alias, the module can simply be referenced with “ramp/map”. 

Loading the bookstrapper
------------------------

The bootstrapper module is responsible for loading the JSON configuration file used by RAMP and for loading all the modules in the proper order. 

	<script type="text/javascript" src="./javascript/src/RAMP/bootstrapper.js"></script>

