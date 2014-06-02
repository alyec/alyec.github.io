---
layout: index-en
title: RAMP Architecture Overview
categories: [documentation]
---
{% include JB/setup %}

## Scope and Exclusions

Add appropriate content here

## Terminology

AMD
: [Asynchronous Module Definition](https://github.com/amdjs/amdjs-api/wiki/AMD).  The API DOJO implements to help achieve a more "object oriented" framework in javascript.  Detailed documentation with respect to DOJO's implementation can be found [here](http://dojotoolkit.org/reference-guide/1.9/loader/amd.html)

Anchor Tip 
: A map tip that remains open until either manually closed by the user, or another anchor tip is opened.  This means you can change the map extent and hover over other features, and the anchor tip will stay active.

Basemap
: Background imagery on a map that provides context to features.  Is non-interactive.

Bounding Box
: A box drawn on the map that indicates the area that a feature set covers.

Extended Grid
: A grid that has a rich collection of columns.  When active, the map is not visible.  This provides access to the underlying feature data in a traditional table format, and allows data to be sorted.  The extended grid shows the contents of one feature set at a time.

Highlight
: Causes a feature on the map to stand out from other features and background imagery.  Typically accomplished by dulling out non-highlighted imagery.

Hover Tip 
: A map tip that is visible only when the mouse is hovering over a feature.

RAMP 
: Reusable Accessible Mapping Platform.  RAMP is a web application that allows for a webmap to be easily created in the WET Template.  The site will meet WCAG AA accessibility standards, and will have useful features available for use.

Summary Grid
: A grid that has minimal information in it, just enough to identify a point.   The summary grid has entries for all features visible, and combines features across different feature sets.

Topic
: A publication and subscription framework in [DOJO](http://dojotoolkit.org/reference-guide/1.9/dojo/topic.html).  This is used to pass events in the RAMP source.


## Block Diagram

[High Level Block Diagram](../assets/images/block_diagram.png)

## Popup handling

The utility module PopupManager contains the majority of routines to handle popups.  A popup is something that is hidden until the user performs an action, and then the popup appears on the site with the appropriate content.

The core function in PopupManager is registerPopup, which allows the implementor to specify the triggering effects of a popup.

Often we will have popups that will close other popups when they open.  Examples of this are the Help panel, the Add Layer panel, and the Bookmark Link panel.  This behavior is achieved via topics: a topic is published when a popup is opened.  If a listening popup is open, it will close itself. The topics to achieve this end in "_PANEL_CHANGED"

## Filtering cycle

In RAMP Arctic Fox we do not have any attribute based filtering.  Filtering is determined by two factors: the map extent and the visibility of feature layers.  A change in either of these two items (user pans/zooms the map, or toggles a layer on or off) will trigger the filtering cycle, which is as follows:

* Retrieve a list of visible layers
* For each visible layer, perform a spatial query on the features using the map extent as the filter criteria.  Have the query output objectIds for features that satisfy the filter
* Create a collection of objectId/layerId pairs, and have this be the source for the data grid

[Filter Data Sequence](../assets/images/filter_data_sequence.svg)

## Map layer management

The layers exist in the following order on the map

* Basemap Layer
* Static Layers 
* Bounding Box Layers
* Feature Layers
* Highlighting Layers
  * Zoomlight
  * Highlight
  * Hoverlight

The Feature Layers can be re-ordered via the filter control, but always stay in the same range.

Layers are arranged in this order as it makes sense from a drawing perspective.  Highlights have the most visual precedence, followed by the feature layers.  Basemaps are on the bottom as they are solid tile.  Static layers and bounding boxes have lower priority than the feature layers.

## Datagrid Architecture

The data grid can exist in two different states.  This allows the map to be accessible (by providing feature data in a screen readable and keyboard navigateable grid), and also allows a more table-centric view of the data.

The default state is the _summary grid_.  This grid provides basic information about features on the map (name, icon, what layer it belongs to) and provides links to zoom to features and view details about them.  This grid works in concert with what is visible on the map; as the user navigates around the map, the grid will stay snynchronized with the view.

The alternate state is the _extended grid_.  This grid provides a more traditional multi-column view of the data.  When open, the map is no longer visible, and the extent is fixed until the user reverts back to the summary grid.  The extended grid shows data from one feature set at a time (this is because different features can have different columns).  The active feature can be selected from the dropdown combo box above the grid.  It is possible to have the columns in the extended grid be sortable.


