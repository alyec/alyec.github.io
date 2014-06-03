---
layout: index-en
title: Templating Example
categories: [documentation]
---
{% include JB/setup %}

#Templating Example

This section will show describe how the templating engine works and the steps to customizing a module using templates. The basemap selector module with be used as an example throughout the article.

<img src="../assets/images/basemap_selector_screenshot.png" alt="Basemap Selector Screenshot" title="A sample screenshot of the basemap selector menu" width="285" height="278"/>

##How Templating Works
The dropdown menu of the basemap selector is customizable through templating. The template that the basemap selector is using can be specified by editing the "basemapTemplate" field in the JSON config (currently it is using "default_basemap"). 

<img src="../assets/images/basemap_template_screenshot.png" alt="Basemap Template Screenshot" title="The basemap_template field is located at the root of the configuration file" width="521" height="66"/>

The template uses the JSON configuration file to populate the data in each row. The "basemaps" entry in the JSON configuration file is an array of Objects, each Object describes one basemap. 

<img src="../assets/images/basemap_config_screenshot.png" alt="Basemap Config Screenshot" title="The default structure of each entry in the basemap array in the JSON configuration file" width="226" height="330"/>

The templating engine takes each entry in the basemap config and stores it in the data object that becomes available to the template. Below is the default template for the basemap selector, note the use of o.data to populate fields:

	<div class='esriBasemapGalleryLabelContainer'>
	{% raw %}<span alt='{%= o.data.name %} ({%= o.data.type %})' title='{%= o.data.name %} ({%= o.data.type %})'>{%= o.data.name %}({%=o.data.type%})</span> <span class='font-xsmall extra'>{%= o.data.description %}</span>{% endraw %}
	{% raw %}</div><img class='esriBasemapGalleryThumbnail' src='{%=%20o.data.thumbnail%20%}' alt='{%= o.data.altText %}' />{% endraw %}

The template then uses the data from the config to generate HTML elements to represent the basemap. Note for example in the default template, the "name" and "type" fields in the config are used as the text visible to the user that describes the basemap. 

##Templating Steps

Developers can change how each entry in the basemap selector dropdown is rendered by following these steps:

1. Add a new template to the template file and give it a unique name.
2. Update the "basemapTemplate" field in the JSON config to the name of the new template.
3. Edit the new template. For example, if the developers would like to also include a year information next to each basemap, indicating what year the basemap was published, they could substitute the line: `{% raw %}{%= o.data.name %} ({%= o.data.type %}){% endraw %}` with: `{% raw %}{%= o.data.name %}({%= o.data.type %}, {%= o.data.year %}){% endraw %}` instead.
4. If any data is needed by the template which does not currently exist in the JSON configuration file, add it. For example in this case, the developer would need to add a "year" field to *each* entry in the basemap selector configuration.