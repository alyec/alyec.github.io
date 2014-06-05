---
layout: index-en
title: Template Overview
categories: [documentation]
---
{% include JB/setup %}

<a name="top" />

#Template Overview {#wb-cont}

Below is all the modules that are customizable through templating. This summarizes all the information the developers need in order to customize each module through templating. For details on how templating works, refer to this [guide](template-guide-en.html). For an example of modifying a module through templating, refer to this [guide](template-example-en.html).

###Quick Links

[Header Description](#header_description)

[Basemap Selector](#basemap_selector)

[Datagrid Summary Mode](#datagrid_summary_mode)

[Datagrid Expanded Mode](#datagrid_expanded_mode)

[Feature Hover Tip](#feature_hover_tip)

[Feature Details Panel](#feature_details_panel)

[Feature Anchor Tip](#feature_anchor_tip)

[Filter Global Row](#filter_global_row)

[Filter Row](#filter_row)

###Header Description {#header_description}

Description - a description of what the template modifies\\
Template Name - the path in the JSON configuration file containing the name of the template. Each new line denotes the next child in the path.\\
Template File - the template file containing the template, all files reside in the "RAMP/modules/templates" folder\\
Data object - a description of the data object (o.data) that gets passed into the template

###Basemap Selector {#basemap_selector}

**Sample Screenshot**

<section class="wb-lbx lbx-gal">	
	<a href="../assets/images/basemap_selector_screenshot.png">
		<img src="../assets/images/basemap_selector_screenshot.png" width="213" height="208" />
	</a>
</section>

Each row in the basemap selector dropdown.

**Template Name**

[siteTemplate.basemapTemplate]("json-config-en.html#sitetemplate_basemaptemplate")

**Template File**

basemap_selector_template.json

**Data Object**

[config.basemaps[i]](json-config-en.html#basemaps)

[Back To Top](#top)

###Datagrid Summary Mode {#datagrid_summary_mode}

**Sample Screenshot**

<section class="wb-lbx lbx-gal">	
<a href="../assets/images/datagrid_summary_screenshot.png">
<img src="../assets/images/datagrid_summary_screenshot.png" width="249" height="92" />
</a>
</section>

Each row in the datagrid when the datagrid is in the summary mode.

**Template Name**

[featureLayers[i].datagrid.summaryRowTemplate](json-config-en.html#featurelayers_datagrid_summaryrowtemplate)

**Template File**

datagrid_template.json

**Data Object**

The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point

[Back To Top](#top)

###Datagrid Expanded Mode {#datagrid_expanded_mode}

Each row in the datagrid when the datagrid is the expanded mode

**Sample Screenshot**

<section class="wb-lbx lbx-gal">
<a href="../assets/images/extended_grid_screenshot.png">	
<img src="../assets/images/extended_grid_screenshot.png" width="387" height="228" />
</a>
</section>

**Template Name**

<a href="json-config-en.html#featurelayers_datagrid_gridcolumns_columntemplate">config.featureLayers[i].datagrid.gridColumns[j].columnTemplate</a>

**Template File**

extended_datagrid_template.json

**Data Object**

The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point

[Back To Top](#top)

###Feature Anchor Tip {#feature_anchor_tip}

The popup that appears when a feature on the map is clicked.

**Sample Screenshot**

<section class="wb-lbx lbx-gal">
<a href="../assets/images/feature_anchor_tip_screenshot.png">	
<img src="../assets/images/feature_anchor_tip_screenshot.png" width="208" height="118" />
</a>
</section>

**Template Name**

<a href="json-config-en.html#featurelayers_maptipsettings_anchortemplate"> featureLayers[i].mapTipSettings.anchorTemplate</a>

**Template File**

feature_anchortip_template.json

**Data Object**

The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point

[Back To Top](#top)

###Feature Hover Tip {#feature_hover_tip}

The popup that appears when the mouse hovers over a feature on the map.

**Sample Screenshot**

<section class="wb-lbx lbx-gal">
<a href="../assets/images/feature_hover_tip_screenshot.png">	
<img src="../assets/images/feature_hover_tip_screenshot.png" width="154" height="106" />
</a>
</section>

**Template Name**

<a href="json-config-en.html#featurelayers_maptipsettings_hovertemplate">featureLayers[i].mapTipSettings.hoverTemplate</a>

**Template File**

feature_hovertip_template.json

**Data Object**

The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point

[Back To Top](#top)
	
###Feature Details Panel {#feature_details_panel}

The content of the detail panel that slides out whenever a user clicks on a feature on the map or selects a feature from the datagrid.

**Sample Screenshot**

<section class="wb-lbx lbx-gal">	
<a href="../assets/images/feature_detail_panel_screenshot.png">
<img src="../assets/images/feature_detail_panel_screenshot.png" width="201" height="291" />
</a>
</section>

**Template Name**

<a href="json-config-en.html#featurelayers_detailtemplate">featureLayers[i].detailTemplate</a>

**Template File**

feature_details_template.json

**Data Object**

The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point

[Back To Top](#top)

###Filter Global Row {#filter_global_row}

The top row that contain the global layer and bounding box toggles

**Sample Screenshot**

<section class="wb-lbx lbx-gal">	
<a href="../assets/images/filter_global_screenshot.png">
<img src="../assets/images/filter_global_screenshot.png" width="368" height="36" />
</a>
</section>

**Template Name**

<a href="json-config-en.html#sitetemplate_filterglobalrowtemplate"> siteTemplate.filterGlobalRowTemplate</a>

**Template File**

filter_global_template.json

**Data Object**

<a href="json-config-en.html#globalfilter">config.globalFilter</a>

[Back To Top](#top)

###Filter Row {#filter_row}

Each row in the filter manager

**Sample Screenshot**

<section class="wb-lbx lbx-gal">
<a href="../assets/images/filter_row_screenshot.png">	
<img src="../assets/images/filter_row_screenshot.png" width="344" height="133" />
</a>
</section>

**Template Name**

<a href="json-config-en.html#sitetemplate_filterrowtemplate">siteTemplate.filterRowTemplate</a>

**Template File**

filter_row_template.json

**Data Object**

?

[Back To Top](#top)
