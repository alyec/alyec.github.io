---
layout: index-en
title: RAMP Setup
categories: [documentation]
---
{% include JB/setup %}

#RAMP Setup



##Loading Dojo and ESRI



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



##Dojo Config Parameters



The dojoConfig object contains many different parameters, the ones relevant for RAMP are outlined below, a description of the rest can be found [here](http://dojotoolkit.org/reference-guide/1.9/dojo/_base/config.html). 
