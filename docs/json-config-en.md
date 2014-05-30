---
layout: index-en
title: JSON Config Definition
categories: [documentation]
---
# JSON Config Definition

This page will walk you through the layout of the application configuration object and all of its properties.

## Contents

  * [Object Outline](#object-outline)
  * [Object Property Dictionary](#object-property-dictionary)

## Object Outline

* stringResources
* lang
* helpContent
* defaultFeatureLayer
* singleFeatureMode
* geometryService
* proxyUrl
* CityNameService
* CityExtentService
* spatialReference
* extents
    * defaultExtent
    * fullExtent
    * maximumExtent
* navWidget
    * sliderMinVal
    * sliderMaxVal
    * animate
    * cssPath
    * skin
    * debug
* basemaps <collection>
    * id
    * url
    * thumbnail
    * showOnInit
* featureLayers <collection>
    * id
    * url
    * thumbnail
    * iconKey
    * IconService
    * infoKey
    * hoverTipTemplate
    * layerAttributes
    * infoWindow
        * tolerance
        * curb
        * resultFields
        * infoWindowTemplate
    * datagrid
        * rowsPerPage
        * gridColumns <collection>
            * id
            * fieldName
            * width
            * isSortable
            * sortType
            * alignment
            * name
            * renderFunction
        * featureSources <collection>
            * attribute
    * detailInfo
        * serviceUrl
        * serviceJsFunction
        * detailKey		
    * staticLayers <collection>
        * id
        * url
        * layerType
        * opacity	
    * filter
        * filterAttributes <collection>
            * attribute
            * filterValues <collection>
                * value
                * grouping
                * visible
        * renderFunction

## Object Property Dictionary

| JSON Object Field	|	Data Type	|	Description
|----+----|----+----|----+----
| stringResources	| |	key value dictionary that holds all application strings and language specific values for a SINGLE LANGUAGE.  Switching languages will trigger the load of a new config object with separate dictionary
| lang	|	string	|	language of current object
| helpContent	|	string	|	blob content the of help section for current language
| defaultFeatureLayer	|	string	|	Collection of active featureLayers visible on the applications load
| [Modified.  Id of default layer.  Was decided first version of RAMP would not support multiple active layers]
| basemaps	|	collection of map items	|	order of collection will determine order they are added to the map.  can be empty.  if more than one entry, basemap selector widget could/(should?) initialize.
| basemaps[].id	|	string	|	to identify layer.  unique across all map items.  no spaces!  use this to derive language based strings from stringResources (e.g. text to go in basemap selector would have a key like "basemapName<id>")
| basemaps[].url	|	string	|	REST url of the basemap
| basemaps[].thumbnail	|	string	|	path to image file for use in basemap selector (optional)
| basemaps[].showOnInit	|	boolean	|	indicates if map should be active on load.  Only one TRUE per collection
| featureLayers	|	collection of map items	|	order of collection will determine order they are added to the map.  can be empty. if more than one entry, layer selector widget could/(should?) initialize.
| featureLayers[].id	|	string	|	to identify layer.  unique across all map items.  no spaces!  use this to derive language based strings from stringResources (e.g. text to go in active layer selector would have a key like "featureName<id>")
| featureLayers[].url	|	string	|	REST url of the layer
| featureLayers[].thumbnail	|	string	|	path to image file for use in layer selector (optional)
| featureLayers[].iconKey	|	string	|	feature field that derives the icon
| featureLayers[].iconService	|	string	|	???? (Added by Bill… what is the specifics?)
| featureLayers[].infoKey	|	string	|	feature field that is the key for the info service.
| featureLayers[].hoverTipTemplate	|	string	|	has template of what to show in hover tip.  if blank, hover tips are not initialized.  template processor should be able to generate text, as well as derive image names from feature attributes
| featureLayers[].infoWindow.tolerance	|	numeric	|	tolerance to use on identify click.  if we have multiple features active, this number will need to be the same across feature layers
| featureLayers[].infoWindow.curb	|	numeric	|	maximum number of results to present to the user
| featureLayers[].infoWindow.resultFields	|	string	|	comma delimited list of attributes to be returned in the identify.  can be an asterisk (for all).  again, need to be wary when multiple features are active
| featureLayers[].infoWindow.infoWindowTemplate	|	string	|	has template of what to show in infowindow.  template processor should be able to generate text, as well as derive image names, hyperlinks, and other sweet stuff, from feature attributes.
| featureLayers[].datagrid.rowsPerPage	|	numeric	|	number of rows to show in the grid (i.e. one page of results)
| featureLayers[].datagrid.gridColumns [].id	|	string	|	to identify column.  unique across all columns for all layers in the app.  no spaces!
| featureLayers[].datagrid.gridColumns [].fieldName	|	string	|	attribute field that populates this column.  really just used as a reference now.
| featureLayers[].datagrid.gridColumns [].width	|	numeric	|	width of the field (pixels?  em's?)
| featureLayers[].datagrid.gridColumns [].isSortable	|	boolean	|	tells if we can sort on this column
| featureLayers[].datagrid.gridColumns [].sortType	|	string	|	not sure what goes here.  text/number/date sort?
| featureLayers[].datagrid.gridColumns [].alignment	|	string	|	alignment type.  use values from current services
| featureLayers[].datagrid.gridColumns [].name	|	Int	|	Title of the grid column.  This will show in the grid header
| featureLayers[].datagrid.gridColumns [].renderFunction	|	string	|	Name of rendering function.  Empty string if no rendering function.  Function must exist in datagrid.js within the renderFunctions object.
| featureLayers[].datagrid.featureSources [].attribute	|	string	|	Feature layer attribute name to pull data from.  Case sensitive!  Order matters for non-rendered columns, and also determines the value of "info" parameter in rendered columns.  Can have more sources than columns, but will error if there are less.
| featureLayers[].detailInfo	|	object	|	if missing, there is no detail service
| featureLayers[].detailInfo.serviceUrl	|	string	|	if we are using a rest service to fetch the detail block, this is the URL
| featureLayers[].detailInfo.serviceJsFunction	|	string	|	if we are using a client side javascript function to generate the detail block, this is the function call
| featureLayers[].detailInfo.detailKey	|	string	|	the feature attribute which is the key value used to fetch/generate the detail block.  Likely OBJECTID but could be something else.
| singleFeatureMode	|	boolean	|	if true, layer selector should unselect/unload current feature layer when new one is loaded.  if false, can have multiple features active at once
| featureLayers[].staticLayers	|	collection of map items	|	this is for layers that are always active and don't users don't interact with.  stuff like overlays.  order of collection will determine order they are added to the map.  can be empty.
| featureLayers[].staticLayers[].id	|	string	|	to identify layer.  unique across all map items.  no spaces!
| featureLayers[].staticLayers[].url	|	string	|	REST url of the layer
| featureLayers[].staticLayers[].layerType	|	string	|	the type of layer this is. domain: ["tile", "feature", "dynamic", "wms"].  This is used by RAMP to determine which layer object to instantiate
| featureLayers[].staticLayers[].opacity	|	numeric	|	 
| featureLayers[].filter.filterAttributes	|	collection of filter attribute items	|	an item represents a field (attribute)  in the feature that can be filtered on
| featureLayers[].filter.filterAttributes[].attribute	|	string	|	the name of the attribute that can be filtered.  this is case sensitive.  must match the feature name exactly
| featureLayers[].filter.filterAttributes[].filterValues[]	|	collection of filter value items	|	an item represents a unique value in the filterable field.
| featureLayers[].filter.filterAttributes[].filterValues[].value	|	string	|	the value that can be filtered
| featureLayers[].filter.filterAttributes[].filterValues[].grouping	|	string	|	the group key if the value belongs to a group of values.  blank if no grouping
| featureLayers[].filter.filterAttributes[].filterValues[].visible	|	boolean	|	determines the initial visibility on layer load of the filter for this value.  
| featureLayers[].filter.renderFunction	|	string	|	name of the javascript function to call to render the filter in HTML on the webpage.
| geometryService	|	string	|	url to geometry service (optional)
| proxyUrl	|	string	|	url to the proxy page (optional)
| extents.defaultExtent	|	envelope	|	extent the app should initialize to
| extents.fullExtent	|	envelope	|	extent the app should go to when full extent button is pushed
| extents.maximumExtent	|	envelope	|	extent the app not allow user to pan past
| CityNameService	|	string	|	URLfor the service returning city names by province
| CityExtentService	|	string	|	URL for the service return a selected city's extent
| navWidget.sliderMinVal	|	numeric	|	 
| navWidget.sliderMaxVal	|	numeric	|	 
| navWidget.animate	|	string	|	 
| navWidget.cssPath	|	string	|	 
| navWidget.skin	|	string	|	 
| navWidget.debug	|	numeric	|	 
| spatialReference	|	numeric	|	the WKID of the spatial reference for the map.  WILL BREAK IF YOU STORE IT AS A STRING!
	 		 
		
 		 		 



