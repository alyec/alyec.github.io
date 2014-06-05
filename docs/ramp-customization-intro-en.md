---
layout: index-en
title: RAMP Customization Introduction
categories: [documentation]
---
{% include JB/setup %}

#RAMP Customization Introduction {#wb-cont}

Each visible module in RAMP can be customized either through the JSON configuration file or through templating.

##JSON Configuration File

RAMP loads its customizable settings from a JSON configuration file, located at the RAMP root directory: config.en.json (config.fr.json for the French version). The JSON configuration file contain all visible text, parameters to adjust the look and display of various modules, as well as the name of templates to use for a particular module. For more information, refer to this [document](json-config-en.html).

##Templating

RAMP allows the user to customize the look-n-feel of all the modules that are visible to the user through templating. The templating engine allows the user to write using HTML and Javascript how certain part of a module gets rendered. For instance, the datagrid uses a template that defines how each row in the datagrid is displayed. For detail information on how templating works and how to write templates, refer to this [document](template-guide-en.html).
