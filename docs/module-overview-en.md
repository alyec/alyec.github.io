---
layout: index-en
title: RAMP Module Overview
categories: [documentation]
---
{% include JB/setup %}

<a name="top" />

#RAMP Module Overview

## Table of Content

[ramp/basemapSelector](#basemapselector)

[ramp/bookmarkLink](#bookmarklink)

[ramp/datagrid](#datagrid)

[ramp/datagridClickHandler](#datagridclickhandler)

[ramp/eventManager](#eventmanager)

[ramp/featureClickHandler](#featureclickhandler)

[ramp/featureHighlighter](#featurehighlighter)

[ramp/filterManager](#filtermanager)

[ramp/globalStorage](#globalstorage)

[ramp/graphicExtension](#graphicextension)

[ramp/gui](#gui)

[ramp/map](#map)

[ramp/maptips](#maptips)

[ramp/navigation](#navigationmodule)

[ramp/quickzoom](#quickzoom)

[ramp/ramp](#ramp)

## ramp/basemapSelector {#basemapselector}

Manages the widget that allows the user to change the basemap. Utilizes the [esri.dijit.Basemap](https://developers.arcgis.com/javascript/jsapi/basemap-amd.html) dijit.  Populates the widget with basemaps from the config.  All basemaps must be in the same projection.

##### API Page
[BaseMapSelector](../api/yuidoc/classes/BaseMapSelector.html)


Relevant Configuration Nodes
: `basemaps`

##### Relevant Sequence Diagrams
![Select A Basemap](../assets/images/select_basemap.svg)

 Relevant Template Files
: `basemap_selector_template`

[Back To Top](#top)

## ramp/bookmarkLink {#bookmarklink}

Manages the widget that allows the maps current state to be displayed as a URL.  Listens for specific site events and updates the link as they occur.  Allows emailing of link, url shortning of link.


##### API Page
[BookmarkLink](../api/yuidoc/classes/BookmarkLink.html)

Relevant Configuration Nodes
: `lang`

[Back To Top](#top)

## ramp/datagrid {#datagrid}

The module handles the construction and population of the data grid. 

The table structure is generated from config values.  Autopagination is provided via the [datatables](link to extensions page) library.

Population of grid rows consists of determining visible features, generating column data (this includes applying templates), and filling the grid with the result set.

Logic to toggle between grid states -- expand when Bill / Jack / Alex are finished

Sorting -- expand when Aly has enhanced it

Finding a feature in the grid -- expand when Aly has enhanced it

The grid contains buttons to obtain details and zoom to row items.  This is done via the dataGridClickHandler module (see below).  In future releases, we plan to have this extensible to allow easy overriding of the controls.


##### API Page
[Datagrid](../api/yuidoc/classes/Datagrid.html)

Relevant Configuration Nodes
: `datagrid`
: `featureLayers[].datagrid`
: `gridstrings`


##### Relevant Sequence Diagrams
![Filter Data Sequence](../assets/images/filter_data_sequence.svg)

 Relevant Template Files
: `datagrid_template`
: `extended_datagrid_template`




[Back To Top](#top)

## ramp/datagridClickHandler {#datagridclickhandler}

The module contains the handler functions that react to buttons in the datagrid being clicked.  Primarily this covers implementation of the Details and Zoom To buttons.  In future releases we intend to have these functions easily extendable.

The zoom function consists of the map zooming to the feature in question, where it will be highlighted and an anchor tip will be displayed.  

The view detail function involves generating a custom detail report (from a template) and displaying it in a slide-out panel.  

##### API Page
[DatagridClickHandler](../api/yuidoc/classes/DatagridClickHandler.html)


##### Relevant Sequence Diagrams

![Zoom To A Feature](../assets/images/zoom_to_feature.svg)

![View Feature Details](../assets/images/view_feature_details.svg)


 Relevant Template Files
: `feature_details_template`

[Back To Top](#top)

## ramp/eventManager {#eventmanager}

The module defines event names as constants to avoid typing errors.

##### API Page
[EventManager](../api/yuidoc/classes/EventManager.html)


[Back To Top](#top)

## ramp/featureClickHandler {#featureclickhandler}

The module contains the handler functions that react to the mouse interacting with features on the map.

This primarily consists of clicking a feature, and hovering over a feature.  For the most part, this class publishes appropriate events; the event listeners in other classes implement the reaction to the interactions.


##### API Page
[FeatureClickHandler](../api/yuidoc/classes/FeatureClickHandler.html)



##### Relevant Sequence Diagrams

![Click a Feature](../assets/images/click_a_feature.svg)

![Hover Over a Feature](../assets/images/hover_over_feature.svg)





[Back To Top](#top)

## ramp/featureHighlighter {#featurehighlighter}

The module implements the highlighting of features on the map during hover and selection actions.  

There are three types of highlighting: Click highlighting, Zoom highlighting, and Hover highlighting.  All are acomplished by fading out the map and duplicating the feature in question in a highliting layer, shown at regular brightness above the faded items.

The module also generates the graphic layers used to manage the highlight imagery



##### API Page
[FeatureHighlighter](../api/yuidoc/classes/FeatureHighlighter.html)



##### Relevant Sequence Diagrams

![Click a Feature](../assets/images/click_a_feature.svg)

![Hover Over a Feature](../assets/images/hover_over_feature.svg)

![Zoom to a Feature](../assets/images/zoom_to_feature.svg)



[Back To Top](#top)

## ramp/filterManager {#filtermanager}

The module implements the generation of the filter control, and implements the filtering. 

There is only layer-level filtering in the Arctic Fox version of RAMP. I.e. a layer can be on or off.  Future versions plan to include more granular filtering, such as by-attribute filters.

The following actions are performed by the module

* Generate the filter interface (including using templates)
* Handle the toggling of layers
* Handle the toggling of bounding boxes for layers
* Changing the draw order of layers on the map



##### API Page
[FilterManager](../api/yuidoc/classes/FilterManager.html)

Relevant Configuration Nodes
: `featureLayers[].id`
: `featureLayers[].displayName`
: `featureLayers[].symbology`


##### Relevant Sequence Diagrams

![Toggle A Bounding Box](../assets/images/toggle_bounding_box.svg)

![Filter Data Sequence](../assets/images/filter_data_sequence.svg)

![Change Map Drawing Order](../assets/images/reorder_a_layer.svg)

 Relevant Template Files
: `filter_global_template`
: `filter_row_template`




[Back To Top](#top)

## ramp/globalStorage {#globalstorage}

The module defines global items to make things easier to share across modules.  We place location specific string here (e.g. a configuration server URL), so this servers as the spot to tweak when moving the application to a different environment.  Implementers can also add items to this module on the fly.


##### API Page
[GlobalStorage](../api/yuidoc/classes/GlobalStorage.html)




[Back To Top](#top)

## ramp/graphicExtension {#graphicextension}

The module contains helper functions for [graphic](https://developers.arcgis.com/javascript/jsapi/graphic-amd.html) objects.  E.g. get objectId, get layer, get detail text


##### API Page
[GraphicExtension](../api/yuidoc/classes/GraphicExtension.html)

Relevant Configuration Nodes
: `featureLayers[].detailTemplate`


[Back To Top](#top)

## ramp/gui {#gui}

Contains the gui related logic for the app.

Has a subpanel prototype.  This defines properties, constructor / destructor, open/close animation methods, content update.

Implements the side panel, help popup, add layer popup and registers those panels.

Contains logic to go to full-screen mode.


##### API Page
[GUI](../api/yuidoc/classes/GUI.html)

Relevant Configuration Nodes
: `stringResources`


[Back To Top](#top)

## ramp/map {#map}

The map module generates the map control and adds layers to the map, as defined in the configuration.

It also generates and hosts the scale bar.



##### API Page
[Map](../api/yuidoc/classes/Map.html)

Relevant Configuration Nodes
: `basemaps[].showOnInit`
: `basemaps[].url`
: `extents`
: `featureLayers[].url`
: `featureLayers[].layerAttributes`
: `featureLayers[].staticLayers`
: `levelOfDetails.minLevel`
: `levelOfDetails.maxLevel`
: `spatialReference`



##### Relevant Sequence Diagrams

![Filter Data Sequence](../assets/images/filter_data_sequence.svg)




[Back To Top](#top)

## ramp/maptips {#maptips}

The module handles maptip interaction (both hover and anchor). Includes positioning logic for tips.

Fills the tips with contents from the template.


##### API Page
[Maptips](../api/yuidoc/classes/Maptips.html)

Relevant Configuration Nodes
: `featureLayers[].mapTipSettings`


##### Relevant Sequence Diagrams

![Close an Anchor Tip](../assets/images/close_anchor.svg)

![Hover Over a Feature](../assets/images/hover_over_feature.svg)


 Relevant Template Files
: `feature_hovertip_template`
: `feature_anchortip_template`


[Back To Top](#top)

## ramp/navigation {#navigationmodule}

The module handles the navigation widget.  It constructs it and applies a CSS skin to it.  

Also handles the two-way synchronization between the map extent and the widget state.


##### API Page
[Navigation](../api/yuidoc/classes/Navigation.html)

Relevant Configuration Nodes
: `navWidget`



[Back To Top](#top)

## ramp/quickzoom {#quickzoom}

Quick zoom widget is populated with target items, will zoom the map when an item is selected

THIS ITEM IS UNDER CONSIDERATION FOR COMPLETE OVERHAUL

NOTE: Depends on one of our quickzoom services.  These will be on public production after 10.1 migration.

NOTE: our current config file does not have the appropriate node.  We should add this to the sample



##### API Page
[QuickZoom](../api/yuidoc/classes/QuickZoom.html)

Relevant Configuration Nodes
: `quickzoom`


[Back To Top](#top)

## ramp/ramp {#ramp}

The map module contains shared functions used by RAMP.  In particular, it houses functions that depend on the configuration object.  

##### API Page
[RAMP](../api/yuidoc/classes/RAMP.html)

[Back To Top](#top)
