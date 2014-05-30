---
layout: index-en
title: Naming Conventions
categories: [documentation]
---
{% include JB/setup %}

# RAMP Naming Conventions

Resource dictionary 
: a singleton object that only contain read-only fields (in C# or Java, these would be classes that cannot be instantiated and only contain public static fields)

Utilities 
: a singleton object that contain useful functions but does not contain any fields (in C# or Java, these would be classes that cannot be instantiated and only contain public static functions) 

Singleton object 
: a singleton object that contains both fields and functions (in C# or Java, these would be classes that cannot be instantiated, have static fields, and static functions). These are the only objects can have states that change over time (e.g. Map can have different extents, Datagrid can have different points, whereas the Resource dictionary never changes, neither do the Utility classes).


| Module Path | Return Type | Preferred Arg Alias |
|:--------|:-------|:--------|
| ramp/basemapselector | singleton object | BasemapSelector |
| ramp/bookmarklink | singleton object | BookmarkLink |
| ramp/datagrid | singleton object | Datagrid |
| ramp/datagridClickHandler | singleton object | DatagridClickHandler |
| ramp/ecdmp | singleton object | Ecdmp |
| ramp/eventManager | resource dictionary | EventManager |
| ramp/featureClickHandler | singleton object | FeatureClickHandler |
| ramp/featureHighlighter | singleton object | FeatureHighlighter |
| ramp/filterManager | singleton object | FilterManager |
| ramp/globalStorage | singleton object | GlobalStorage |
| ramp/graphicExtension | singleton object | GraphicExtension |
| ramp/map | singleton object | Map |
| ramp/maptips | singleton object | Maptips |
| ramp/navigation | singleton object | Navigation |
| ramp/quickzoom | class | Quickzoom |
| ramp/ramp | singleton object | Ramp |
| utils/array | utilities | UtilArray |
| utils/decorator | utilities | Decorator |
| utils/dictionary | utilities | UtilDict |
| utils/functionMangler | singleton object | FunctionMangler |
| utils/popupManager | ? (singleton or utilities) | PopupManager |
| utils/prototype | singleton object | UtilPrototype |
| utils/url | class | UtilUrl |
| utils/util | utilities | UtilMisc |



## Module Architecture
Why everything is singleton in RAMP:

* There is only one map, one navigation widget, one datagrid, etc. There is no point of having an option to create two datagrids or two maps. Even if the datagrid needs a tabbing option, there may be multiple “tab” objects, but there is still only one datagrid. 
* Keeps code simpler. We no longer need to use “this.” everywhere. Using “this” caused a lot of problems with scope when we’re using anonymous functions (e.g. in publish/subscribe, arrayUtil.forEach, deferred.after). We need to “hitch” (using dojo/lang’s hitch function) the scope onto the function, and sometimes when there is an anonymous function nested in another anonymous function, the scoping gets tricky. Numerous times, a variable or function is unexpectedly undefined due to scoping issues. When everything is singleton, we no longer use “this”, instead we declare all the variables at the top of the file, and due to closure, the variables are always in scope. 
* Each Utility class only needs one instance of itself, there’s no point of having two instance of the same Utility class.
* Each Resource class only needs one instance of itself for the same reason. 