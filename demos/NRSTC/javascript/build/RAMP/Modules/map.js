/*! ramp-gis-viewer 23-05-2014 */
define(["dojo/_base/declare","dojo/_base/array","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/number","dojo/query","dojo/_base/lang","dojo/topic","dojo/on","esri/map","esri/layers/FeatureLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/geometry/Polygon","esri/SpatialReference","esri/dijit/Scalebar","esri/geometry/Extent","esri/graphicsUtils","ramp/globalStorage","ramp/ramp","ramp/featureClickHandler","ramp/navigation","ramp/eventManager","utils/util","utils/array","utils/dictionary"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){"use strict";function D(){$("#map-load-indicator").removeClass("hidden")}function E(){$("#map-load-indicator").addClass("hidden")}function F(a){if(a.levelChange){var b=f.format(a.lod.scale),c="1 : "+b;e.empty("scaleLabel"),$("#scaleLabel").text(c)}}function G(a){var b=a.map,c=e.create("div",{id:"scaleDiv","class":"esriScalebarLabel"});$(c).html("<span>Scale</span><br><span id='scaleLabel'><span/>");var d=f.format(b.getScale()),h="1 : "+d;e.place(c,g(".esriScalebarRuler")[0],"before"),e.empty("scaleLabel"),$("#scaleLabel").text(h),i.subscribe(z.BasemapSelector.BASEMAP_CHANGED,function(a){$(".esriScalebar > div").removeClass().addClass(a.cssStyle)})}function H(a){function b(b){a.on(b,function(a){i.publish(c+"/"+b,a)})}var c="map";b("update-end"),b("extent-change"),b("zoom-start"),b("zoom-end"),b("pan-start"),b("pan-end")}function I(a){i.subscribe(z.Map.CENTER_AT,function(b){a.centerAt(b.point)}),i.subscribe(z.Map.CENTER_AND_ZOOM,function(b){var c=new esri.geometry.Point(b.graphic.geometry.x,b.graphic.geometry.y,a.spatialReference),d=a.centerAndZoom(c,b.level);b.callback&&d.then(b.callback)}),i.subscribe(z.Map.SET_EXTENT,function(b){b.extent.spatialReference=a.spatialReference;var c=a.setExtent(b.extent);b.callback&&c.then(b.callback)}),i.subscribe(z.Navigation.PAN,function(b){a[b.direction]()}),i.subscribe(z.Navigation.ZOOM_STEP,function(b){a.setLevel(a.getLevel()+b.level)}),i.subscribe(z.Navigation.ZOOM,function(b){a.setLevel(b.level)}),i.subscribe(z.Navigation.FULL_EXTENT,function(){a.setExtent(Q)}),i.subscribe(z.GUI.LAYOUT_CHANGE,function(){a.resize(!0)}),i.subscribe(z.GUI.SUBPANEL_CHANGE,function(a){a.visible||"rampPopup"!==a.origin&&"datagrid"!==a.origin||i.publish(z.FeatureHighlighter.HIGHLIGHT_HIDE,{})}),i.subscribe(z.FilterManager.LAYER_VISIBILITY_TOGGLED,function(c){var d=c.node.checked,e=c.node.value,f=a.getLayer(e);f.setVisibility(d);try{b.forEach(v.LayerMap[e],function(b){var c=a.getLayer(b);c.setVisibility(d)})}catch(g){}}),i.subscribe(z.FilterManager.BOX_VISIBILITY_TOGGLED,function(a){var b=N[a.node.value];b.setVisibility(a.checked)}),i.subscribe(z.FilterManager.GLOBAL_LAYER_VISIBILITY_TOGGLED,function(c){b.forEach(M,function(d){d.setVisibility(c.checked);try{b.forEach(v.LayerMap[d.id],function(b){var d=a.getLayer(b);d.setVisibility(c.checked)})}catch(e){}})}),i.subscribe(z.FilterManager.GLOBAL_BOX_VISIBILITY_TOGGLED,function(a){C.forEachEntry(N,function(b,c){c.setVisibility(a.checked)})}),i.subscribe(z.FilterManager.SELECTION_CHANGED,function(b){O||(O=B.indexOf(a.graphicsLayerIds,function(b){var c=a.getLayer(b);return c.type&&"Feature Layer"===c.type})),a.reorderLayer(a.getLayer(b.id),O+b.index),i.publish(z.Map.REORDER_END)}),i.subscribe(z.Map.ADD_LAYER,function(){var a=c.byId("addLayer-select-type").value,b=c.byId("addLayer-URL-input").value,d=c.byId("addLayer-Opacity").value;L(a,b,d)}),i.subscribe(z.Map.ADD_LAYER_READY,function(b){a.addLayer(b)})}function J(a){b.forEach(M,function(a){a.on("click",function(a){a.stopImmediatePropagation(),x.onFeatureSelect(a)}),a.on("mouse-over",function(a){x.onFeatureMouseOver(a)}),a.on("mouse-out",function(a){x.onFeatureMouseOut(a)})}),a.on("load",G),a.on("extent-change",function(b){F(b),j.once(a,"update-end",function(){i.publish(z.Datagrid.APPLY_EXTENT_FILTER)})}),a.on("click",function(a){x.onFeatureDeselect(a)}),a.on("update-end",function(){}),a.on("update-start",D),a.on("update-end",E)}function K(a,b){return new t(a.xmin,a.ymin,a.xmax,a.ymax,b)}function L(a,b,c){c/=100;var d;switch(a){case"feature":d=new l(b,{opacity:c,mode:l.MODE_SNAPSHOT});break;case"tile":d=new m(b,{opacity:c});break;case"dynamic":d=new n(b,{opacity:c})}i.publish(z.Map.ADD_LAYER_READY,d),i.publish(z.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!1})}var M,N,O,P,Q,R,S;return{getMaxExtent:function(){return R},getMap:function(){return A.isUndefined(P),P},getVisibleFeatureLayers:function(){return b.filter(P.getLayersVisibleAtScale(),function(a){return a.type&&"Feature Layer"===a.type})},getFeatureLayer:function(a){return B.find(M,function(b){return b.url===a})},checkBoundary:function(a,b){var c,d,e=a,f=e.width(),g=e.height(),h=e.centerX(),i=e.centerY();d=e.clone();var j=b.height();g>j&&(g=j),i>b.ymax?(d.ymax=b.ymax,d.ymin=b.ymax-g,c=!0):i<b.ymin&&(d.ymin=b.ymin,d.ymax=b.ymin+g,c=!0);var k=b.width();return f>k&&(f=k),h>b.xmax?(d.xmax=b.xmax,d.xmin=b.xmax-f,c=!0):h<b.xmin&&(d.xmin=b.xmin,d.xmax=b.xmin+f,c=!0),c?d:void 0},init:function(){var a=v.config,c=new esri.SpatialReference({wkid:a.spatialReference}),d=B.find(a.basemaps,function(a){return a.showOnInit}).url,e=new m(d,{id:"basemapLayer"});R=K(a.extents.maximumExtent,c),S=K(a.extents.defaultExtent,c),Q=K(a.extents.fullExtent,c),M=b.map(a.featureLayers,function(a){var b=new l(a.url,{id:String.format("featureLayer_{0}",w.getLayerConfig(a.url).displayName),mode:l.MODE_SNAPSHOT,outFields:[a.layerAttributes]});return b});var f=b.map(M,function(a){var b=new esri.layers.GraphicsLayer({id:String.format("boundingBoxLayer_{0}",w.getLayerConfig(a.url).displayName),visible:!1});return b});P=new k(a.divNames.map,{extent:S,logo:!1,minZoom:a.levelOfDetails.minLevel,maxZoom:a.levelOfDetails.maxLevel,slider:!1}),P.addLayers([e]);var g=[],h=[],i=[];b.map(a.featureLayers,function(a){h=[],b.forEach(a.staticLayers,function(a,b){var c;switch(a.layerType){case"feature":c=new l(a.url,{opacity:a.opacity,mode:l.MODE_SNAPSHOT,id:"static_"+a.id});break;case"tile":c=new m(a.url,{opacity:a.opacity,id:"static_"+a.id});break;case"dynamic":c=new n(a.url,{opacity:a.opacity,id:"static_"+a.id})}g.push(c),h[b]="static_"+a.id}),i[String.format("featureLayer_{0}",w.getLayerConfig(a.url).displayName)]=h}),P.addLayers(g),v.LayerMap=i,P.addLayers(f.concat(M)),N={};var o=function(){b.forEach(M,function(a,b){var c=u.graphicsExtent(a.graphics);c.xmin=Math.max(c.xmin,R.xmin),c.ymin=Math.max(c.ymin,R.ymin),c.xmax=Math.min(c.xmax,R.xmax),c.ymax=Math.min(c.ymax,R.ymax);var d=new esri.Graphic({geometry:c,symbol:{color:[255,0,0,64],outline:{color:[240,128,128,255],width:1,type:"esriSLS",style:"esriSLSSolid"},type:"esriSFS",style:"esriSFSSolid"}});f[b].add(d),N[a.id]=f[b]})};j.once(P,"update-end",o);var p=new s({map:P,attachTo:"bottom-left",scalebarUnit:"metric"});p.show(),H(P),I(P),J(P,M)}}});