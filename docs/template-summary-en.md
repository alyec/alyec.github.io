---
layout: index-en
title: Template Summary Chart
categories: [documentation]
---
{% include JB/setup %}

#Template Summary Chart

Below is all the modules that are customizable through templating. The chart summarizes all the information the developers need in order to customize each module through templating. For details on how templating works, refer to this [guide](template-guide-en.html). For an example of modifying a module through templating, refer to this [guide](template-example-en.html).

##Column Description

Module - the name of the module that this template affects\\
Description - a description of what the template modifies\\
Screenshot - a sample screenshot of a RAMP application that shows what the template modifies\\
Template Name - the path in the JSON configuration file containing the name of the template. Each new line denotes the next child in the path.\\
Template File - the template file containing the template, all files reside in the "RAMP/modules/templates" folder\\
Data object - a description of the data object that gets passed into the template

##Summary Chart

<table>
	<tr>
		<td title="The name of the module that this template affects">Module</td>
		<td title="A description of what the template modifies">Description</td>
		<td title="A sample screenshot of a RAMP application that shows what the template modifies">Icon</td>
		<td title="The path in the JSON configuration file containing the name of the template. Each new line denotes the next child in the path.">Template Name</td>
		<td title="The template file containing the template, all files reside in the RAMP/modules/templates folder">Template File</td>
		<td title="A description of the data object that gets passed into the template">Data Object</td>
	</tr>

	<tr>
		<td>Basemap Selector</td>
		<td>Each row in the basemap selector dropdown.</td>
		<td><img src="../assets/images/basemap_selector_screenshot.png" width="213" height="208" /></td>
		<td>siteTemplate.basemapTemplate</td>
		<td>basemap_selector_template.json</td>
		<td>config.basemaps[i]</td>
	</tr>


	<tr>
		<td>Datagrid Summary Mode</td>
		<td>Each row in the datagrid when the datagrid is in the summary mode.</td>
		<td><img src="../assets/images/datagrid_summary_screenshot.png" width="249" height="92" /></td>
		<td>featureLayers[i].datagrid.summaryRowTemplate</td>
		<td>datagrid_template.json</td>
		<td>The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point</td>
	</tr>

	<tr>
		<td>Datagrid Expanded Mode</td>
		<td>Each row in the datagrid when the datagrid is the expanded mode</td>
		<td><img src="../assets/images/extended_grid_screenshot.png" width="387" height="228" /></td>
		<td>?</td>
		<td>extended_datagrid_template.json</td>
		<td>?</td>
	</tr>

	<tr>
		<td>Feature Anchor Tip</td>
		<td>The popup that appears when a feature on the map is clicked.</td>
		<td><img src="../assets/images/feature_anchor_tip_screenshot.png" width="208" height="118" /></td>
		<td>featureLayers[i].mapTipSettings.anchorTemplate</td>
		<td>feature_anchortip_template.json</td>
		<td>The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point</td>
	</tr>


	<tr>
		<td>Feature Hover Tip</td>
		<td>The popup that appears when the mouse hovers over a feature on the map.</td>
		<td><img src="../assets/images/feature_hover_tip_screenshot.png" width="154" height="106" /></td>
		<td>featureLayers[i].mapTipSettings.hoverTemplate</td>
		<td>feature_hovertip_template.json</td>
		<td>The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point</td>
	</tr>


	<tr>
		<td>Feature Details Panel</td>
		<td>The content of the detail panel that slides out whenever a user clicks on a feature on the map or selects a feature from the datagrid.</td>
		<td><img src="../assets/images/feature_detail_panel_screenshot.png" width="201" height="291" /></td>
		<td>featureLayers[i].detailTemplate</td>
		<td>feature_details_template.json</td>
		<td>The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point</td>
	</tr>

	<tr>
		<td>Filter Global Row</td>
		<td>The top row that contain the global layer and bounding box toggles </td>
		<td><img src="../assets/images/filter_global_screenshot.png" width="368" height="36" /></td>
		<td>siteTemplate.filterGlobalRowTemplate</td>
		<td>filter_global_template.json</td>
		<td>config.globalFilter</td>
	</tr>

	<tr>
		<td>Filter Row</td>
		<td>Each row in the filter manager</td>
		<td><img src="../assets/images/filter_row_screenshot.png" width="344" height="133" /></td>
		<td>siteTemplate.filterRowTemplate</td>
		<td>filter_row_template.json</td>
		<td>The ESRI <a href="https://developers.arcgis.com/javascript/jsapi/graphic-amd.html"> Graphic object</a> associated with that point</td>
	</tr>
</table>

