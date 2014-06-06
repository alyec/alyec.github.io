---
layout: index-en
title: JSON Config Definition
categories: [documentation]
---
# JSON Config Definition {#wb-cont}

This page will walk you through the layout of the application configuration object and all of its properties.

## Contents

  * [Object Outline](#object-outline)
  * [Object Property Dictionary](#object-property-dictionary)

## Object Outline


* stringResources								
* gridstrings								
	* oPaginate						
	* oAria						
* lang								
* helpContent								
* geometryService								
* proxyUrl								
* spatialReference								
* extents								
	* defaultExtent						
	* fullExtent						
	* maximumExtent						
* navWidget								
	* sliderMinVal						
	* sliderMaxVal						
	* debug						
	* animate						
	* locale						
	* cssPath						
	* skin						
* levelOfDetails								
	* minLevel						
	* maxLevel						
	* levels (collection)						
		* level				
		* resolution				
		* scale				
* basemaps (collection)								
	* id						
	* url						
	* thumbnail						
	* showOnInit						
	* scaleCssClass						
	* type						
	* name						
	* altText						
	* description						
* featureLayers (collection)								
	* id						
	* displayName						
	* url						
	* datagrid						
		* rowsPerPage				
		* gridColumns (collection)				
			* id		
			* fieldName		
			* width		
			* isSortable		
			* sortType		
			* alignment		
			* title		
			* columnTemplate		
		* summaryRowTemplate				
	* layerAttributes						
	* filter						
	* mapTipSettings						
		* hoverTemplate				
		* anchorTemplate				
	* symbology						
		* renderer				
			* type		
			* key1		
			* key2		
			* Key3		
		* icons				
			* default		
				* imageUrl
				* legendText
	* uuid						
	* detailTemplate						
	* nameField						
* datagrid								
	* globalGridRowsPerPage						
	* defaultState						
	* summaryEnabled						
	* extendedEnabled						
	* extendedColumns (collection)						
		* column1				
* siteTemplate								
	* basemapTemplate						
	* filterGlobalRowTemplate						
	* filterRowTemplate						
* globalFilter								
	* txtAllData						
	* toggleLabels (collection)						
		* id				
		* dataAttribute				
		* value				
		* checked				
		* title				
		* classAddition				
* divNames								
	* map						
	* navigation						
	* filter						
	* datagrid						

		
## Object Property Dictionary

| JSON Object Field	| Data Type	| Description
|----+----|----+----|----+----
| <a name="stringresources"/>stringResources	| key value dictionary	| holds all application strings and language specific values for a SINGLE LANGUAGE.  Switching languages will trigger the load of a new config object with separate dictionary
| <a name="gridstrings" />gridstrings	| Key value dictionary	| holds all datagrid strings and language specific value for a SINGLE LANGUAGE. Switching languages will trigger the load of a new config object with separate dictionary
| <a name="lang_field"/> lang	| string	| language of current object; en or fr
| helpContent	| string	| blob content the of help section for current language
| geometryService	| string	| URL to geometry service
| proxyUrl	| string	| Path to proxy service (relative path)
| <a name="spatialreference"/>spatialReference	| numeric	| the WKID of the spatial reference for the map.  WILL BREAK IF YOU STORE IT AS A STRING!
| <a name="extents"/>extents.defaultExtent	| envelope	| extent the app should initialize to
| extents.fullExtent	| envelope	| extent the app should go to when full extent button is pushed
| extents.maximumExtent	| envelope	| extent the app not allow user to pan past
| <a name="navwidget"/>navWidget	| 	| 
| navWidget.sliderMinVal	| numeric	| Navigation widget slider minimum value
| navWidget.sliderMaxVal	| numeric	| Navigation widget slider maximum value
| navWidget.debug	| numeric	| Debug flag, generate console log when set
| navWidget.animate	| string	| 
| navWidget.locale	| string	| Navigation widget locale
| navWidget.cssPath	| string	| Path to CSS
| navWidget.skin	| string	| Skin style
| levelOfDetails	| 	| 
| <a name="levelofdetails_minlevel"/>levelOfDetails.minLevel	| numeric	| Minimum level of detail
| <a name="levelofdetails_maxlevel"/>levelOfDetails.maxLevel	| numeric	| Maximum level of detail
| levelOfDetails.levels[]	| 	| 
| levelOfDetails.levels[].level	| numeric	| ID for each level
| levelOfDetails.levels[].resolution	| numeric	| Resolution in map units of each pixel in a tile for each level
| levelOfDetails.levels[].scale	| numeric	| Scale for each level
| <a name="basemaps"/> basemaps	| collection of map items	| order of collection will determine order they are added to the map.  can be empty.  if more than one entry, basemap selector widget could/(should?) initialize.
| basemaps[].id	| string	| to identify layer.  unique across all map items.  no spaces!  use this to derive language based strings from stringResources (e.g. text to go in basemap selector would have a key like "basemapName<id>")
| <a name="basemaps_url"/> basemaps[].url	| string	| REST url of the basemap
| <a name="basemaps_thumbnail" />basemaps[].thumbnail	| string	| path to image file for use in basemap selector (optional)
| <a name="basemaps_showoninit"/>basemaps[].showOnInit	| boolean	| indicates if map should be active on load.  Only one TRUE per collection
| basemaps[].scaleCssClass	| string	| Map scale style
| <a name="basemaps_type"/>basemaps[].type	| string	| Base map type
| <a name="basemaps_name"/>basemaps[].name	| string	| Basemap name
| basemaps[].altText	| string	| Alt text for the basemap thumbnail image
| <a name="basemaps_description"/>basemaps[].description	| string	| Description of the basemap
| featureLayers	| collection of map items	| order of collection will determine order they are added to the map.  can be empty. if more than one entry, layer selector widget could/(should?) initialize.
| <a name="featurelayers_id" />featureLayers[].id	| string	| to identify layer.  unique across all map items.  no spaces!
| <a name="featurelayers_displayname" />featureLayers[].displayName	| 	| Display name of the feature layer
| <a name="featurelayers_url"/> featureLayers[].url	| string	| REST URL of the layer
| <a name="featurelayers_datagrid" />featureLayers[].datagrid	| 	| 
| featureLayers[].datagrid.rowsPerPage	| numeric	| number of rows to show in the grid (i.e. one page of results)
| featureLayers[].datagrid.gridColumns [].id	| string	| to identify column.  unique across all columns for all layers in the app.  no spaces!
| featureLayers[].datagrid.gridColumns [].fieldName	| string	| attribute field that populates this column.  really just used as a reference now.
| featureLayers[].datagrid.gridColumns [].width	| numeric	| width of the field (pixels?  em's?)
| featureLayers[].datagrid.gridColumns [].isSortable	| boolean	| tells if we can sort on this column
| featureLayers[].datagrid.gridColumns [].sortType	| string	| not sure what goes here.  text/number/date sort?
| featureLayers[].datagrid.gridColumns [].alignment	| string	| alignment type.  use values from current services
| featureLayers[].datagrid.gridColumns [].title	| Int	| Title of the grid column.  This will show in the grid header
| <a name="featurelayers_datagrid_gridcolumns_columntemplate" />featureLayers[].datagrid.gridColumns [].columnTemplate	| 	| Template name to be used to generate the content of the given column
| <a name="featurelayers_datagrid_summaryrowtemplate" />featureLayers[].datagrid.summaryRowTemplate	| 	| Summary row template name to be used to generate content
| <a name="featurelayers_layerattributes"/>featureLayers[].layerAttributes	| string	| An array of strings which correspond to fields to include in the FeatureLayer. If not specified, the feature layer will return the OBJECTID field and if applicable the start time field, end time field and type id field. You can specify ["*"] to fetch the values for all fields in the layer, this is useful when editing features. Associated with outfield options in ESRI FeatureLayer.
| featureLayers[].filter	| 	| 
| <a name="featurelayers_maptipsettings"/> featureLayers[].mapTipSettings	| 	| 
| <a name="featurelayers_maptipsettings_hovertemplate" /> featureLayers[].mapTipSettings.hoverTemplating	| string	| has template of what to show in hover tip.  if blank, hover tips are not initialized.  template processor should be able to generate text, as well as derive image names from feature attributes
| <a name="featurelayers_maptipsettings_anchortemplate" />featureLayers[].mapTipSettings.anchorTemplate	| string	| Template name used to generate anchored map tip
| <a name="featurelayers_symbology"/>featureLayers[].symbology	| 	| 
| featureLayers[].symbology.renderer	| 	| 
| featureLayers[].symbology.renderer.type	| string	| The type of renderer being used on the layer.  Current supported values are "simple" and "unique"
| featureLayers[].symbology.renderer.key1	| string	| First attribute used in unique value renderer
| featureLayers[].symbology.renderer.key2	| string	| Second attribute used in unique value renderer
| featureLayers[].symbology.renderer.key3	| string	| Third attribute used in unique value renderer
| featureLayers[].symbology.icons[]	| 	| 
| featureLayers[].symbology.icons[].default.imageUrl	| string	| Url to symbology image
| featureLayers[].symbology.icons[].default.legendText	| string	| Legend text for the given symbology
| featureLayers[].uuid	| string	| Feature layer UUID
| <a name="featurelayers_detailtemplate" /> featureLayers[].detailTemplate	| string	| Template used to generate detail content of a selected feature
| featureLayers[].nameField	| string	| Field to be used to describe a feature.  Utilized in summary grid, detail content, map tip, and anchored maptip
| <a name="datagrid" />datagrid	| 	| 
| datagrid.globalGridRowsPerPage	| numeric	| Number of rows per page to be displayed in datagrid in summary view
| datagrid.defaultState	| string	| Default state of the datagrid: summary or entexted
| datagrid.summaryEnabled	| boolean	| Flag indicate summary grid is enabled
| datagrid.extendedEnabled	| boolean	| Flag indicate extended grid is enabled
| datagrid.extendedColumns[]	| collections	| Column definition for extended datagrid
| siteTemplate	| 	| 
| <a name="sitetemplate_basemaptemplate" /> siteTemplate.basemapTemplate 	| string	| The JSON template for each entry in the basemap selector (defaults to name of map and a thumbnail)
| <a name="sitetemplate_filterglobalrowtemplate" />siteTemplate.filterGlobalRowTemplate	| string	| Template for
| <a name="sitetemplate_filterrowtemplate" />siteTemplate.filterRowTemplate	| string	| Filter template used to generate filter content for map layers.
| <a name="globalfilter" /> globalFilter	| 	| 
| globalFilter.txtAllData	| string	| Global filter text for All Data
| globalFilter.toggleLabel	| <collection>	| Attributes and settings for individual toggle in the global section of filter manager
| globalFilter.toggleLabel[].id	| string	| Id of the toggle label
| globalFilter.toggleLabel[].dataAttribute	| string	| Data attribute
| globalFilter.toggleLabel[].value	| string	| 
| globalFilter.toggleLabel[].checked	| string	| Value of the checked attribute
| globalFilter.toggleLabel[].title	| string	| Value for the title attribute
| globalFilter.toggleLabel[].classAddition	| string	| Additional CSS to be added to toggle label style
| divNames	| 	| RAMP div container names in code and in html
| divNames.map	| string	| Map container name; default is mainMap
| divNames.navigation	| string	| Navigation container name; default is map-navigation
| divNames.filter	| string	| Filter container name; default is searchMapSectionBody
| divNames.datagrid	| string	| Datagrid container name; default is searchMapSectionBody
	 		 
		
 		 		 



