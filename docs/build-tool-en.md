---
layout: "index-en"
title: Build Tool
categories:
  - documentation
published: true
---

{% include JB/setup %}

# Build Tool Setup {#wb-cont}

## Dependencies
The build tool uses [Grunt](http://gruntjs.com/) for automation of linting, minifying, concatenating and other magical things we do with our JS and CSS files.

To install Grunt on Windows, you first need to install [Node.js](http://nodejs.org/) and [Git](http://msysgit.github.io/) binary, and then you can use the command prompt or PowerShell to run Grunt tasks.

* Node.js [installer](http://nodejs.org/#download)
* msysGit [installer](http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git)
* msysGit [mirror](https://github.com/msysgit/msysgit/releases)

After installing the dependencies, run the following in your command shell as Administrator

~~~ js
$ npm install -g grunt-cli
~~~

This will add the grunt command in your system path, allowing it to be run from any directory. You might want to restart your machine, just in case.

## Build Tool
The build tool is just a Grunt project set up to automate the processing of the template, JS and CSS files before deployment. It also outputs the English and French versions of the main page template for both WET [Government of Canada Intranet](http://wet-boew.github.io/themes-dist/theme-gc-intranet/index-en.html) and [Government of Canada Web Usability](http://wet-boew.github.io/themes-dist/theme-gcwu-fegc/index-en.html) themes using supplies locale strings and templates.

The Build tool can also

* monitor __*.less__ files in __RAMP/src/css/__ for changes and autoconvert them to css – very handy since you don’t have to run the build tool manually to see changes; see _wcss_ task;
* monitor __*.js__ files in __RAMP/src/js/RAMP/__ for changes and run [JSHint](http://www.jshint.com/) on the modified file and, if no errors detected, reminifty JS files – very handy since you can avoid silly JavaScript errors; see _wjs_ task;
* monitor __src/ramp-src.html__ main template file and all the theme-specific template files in __src/pages/**/*.html__ for changes and output localized version for both templates; see _wpage_ task;
* monitor __*.json__ files in __RAMP/src/js/RAMP/Modules/templates/__ for changes and automatically copy them to the build folder; see _wtemplate_ task;
* do all of the above at teh same time; see _watch_ task;

### Structure
There are two files required to configure and run the build tool: __package.json__ and __Gruntfile__. They resided in __RAMP__ at the root level.

__package.json__: stores metadata for the project; defines the list of Grunt plugins needed;

__Gruntfile__: configures and defines tasks;

Apart from these two files, there is also the __node_modules__ folder in the root of __RAMP__ containing Grunt modules which will be pulled from GitHub when you run __npm install__ in the next section.

You can read more about Grunt projects [here](http://gruntjs.com/getting-started)

### Running the Build Tool
To run the build tool do the following:

1. Open Command Prompt or PowerShell
2. Change to the project’s root directory
3. Use __npm install__ to install project dependencies (need to run only once or when adding new modules)
4. Use the following to run the build tool:

~~~ js
$ grunt
~~~

if you get an error that something is not found, try running __npm install__ again.

### Default Task
Unless you specify a task to run, __grunt__ command runs _cleanAll_, _css_, _js_, _page_ and _assets_ tasks and they will

1. increment the project’s version build number;
2. convert LESS files from __RAMP\src\css__ to CSS, add browser-specific prefixes to CSS files in __RAMP\src\css__, minimize CSS, and copy them to __RAMP\buildcss\__; concatenate CSS libraries located in __RAMP\src\css\lib__, and copy the resulting __lib.min.css__ to __RAMP\build\css\lib__;
3. run JSHint on all JS source files – the default build task _will_ fail if there are any errors present; [uglify](http://lisperator.net/uglifyjs/compress) JS files from __RAMP\src\js\RAMP__ and move them to __RAMP\build\js\RAMP__; uglifiy modified/pretty JS libraries from __RAMP\src\js\lib__, concatenate them with other, already uglified JS libraries and copy the resulting __lib.min.js__ file to __RAMP\build\js\lib__; copy templates from __RAMP\src\js\RAMP\Modules\templates__ to __RAMP\build\js\RAMP\Modules\templates__;
4. output English and French versions of the content template file (__src/ramp-src.html__) by replacing placeholders with provided locale strings and applying templates from theme foldes in __src\pages\ramp-gcwu-intranet__ and __src\pages\ramp-gcwu-fegc__; save them as in the __build__ folder;
5. generate API documentation using [YUIDoc](http://yui.github.io/yuidoc/) and annotated source code documents using [Docco](http://jashkenas.github.io/docco/) and save them in "__docs/docco__" and "__docs/yuidoc__" folder

#### --source
To generate source mappings for the core JS files, use source option as follows:

~~~ js
$ grunt --source
~~~

### Other Tasks
The default task calls the three main build tasks and if you don’t want to build everything at once all the time, you can call any of the of build tasks individually. You can also call any of the utility tasks defined in the __Gruntfile__. You can do that by using

~~~ js
$ grunt <task-name>
~~~

#### api
Generate API documentation using YUIDoc and annotated source code documents using Docco and save them in "__docs/docco__" and "__docs/yuidoc__" folder. Use the following to run this task:

~~~ js
$ grunt api
~~~

#### bump
Increments the project’s version number in files __package.json__ and __yuidoc.json__. Use the following to run this task:

~~~ js
$ grunt bump
>> Version bumped to 0.0.2

$ grunt bump:patch
>> Version bumped to 0.0.3

$ grunt bump:minor
>> Version bumped to 0.1.0

$ grunt bump:major
>> Version bumped to 1.0.0

$ grunt bump:build
>> Version bumped to 1.0.0-1
~~~

Everytime the default or _css_, _js_, _page_ tasks are run, _bump-only:build_ is also ran as well.

#### cleanAll
Removes all temporary and build folders:

* RAMP/build/
* RAMP/docs/

Use the following to run this task:

~~~ js
$ grunt cleanAll
~~~

#### css
Converts LESS, prefixes CSS, minifies and copies the resulting CSS files to the __build/css__ folder. Use the following to run this task:

~~~ js
$ grunt css
~~~

Note: You need to run this task every time you modify any *.less files since the browser cannot interpret them directly and no changes will be reflected in rendering of the page. It’s best to use _wcss_ or _watch_ task to auto-convert LESS to CSS on every change.

#### deploy
Runs the _build_ and then copies only the necessary files to a specified location leaving out source folders. This task _will_ fail if there are any JS errors present. Use the following to run this task:

~~~ js
$ grunt deploy
~~~

Note: The target folder is cleaned prior to copying files.

#### hint
Runs JSHint on all JS files in __RAMP/src/js/RAMP/__. Use the following to run this task:

~~~ js
$ grunt hint
~~~

##### --target / -tr
To lint a specific JS file, use the __--target__ or its shortcut __-tr__ options and specify the path to the file relative to __RAMP/src/js/RAMP/__:

~~~ js
$ grunt hint --target=Modules/datagrid.js
$ grunt hint -tr Modules/datagrid.js
~~~

##### --output / -o
To lint a specific JS file, use the __--target__ or its shortcut __-tr__ options and specify the path to the file relative to __RAMP/src/js/RAMP/__:

~~~ js
$ grunt hint --output=jsHintErrors.my
$ grunt hint -o jsHintErrors.my
~~~

#### js
JShints, uglifies, concatenates, and copies the resulting JS files and templates to the __build/js__ folder. This task _will_ fail if there are any errors present. Use the following to run this task

~~~ js
$ grunt js
~~~

##### --source
To generate source mappings for the core JS files, use __source__ option as follows:

~~~ js
$ grunt js --source
~~~

#### page
Outputs English and French versions of the content template file (__ramp-src.html__) for both themes  by replacing placeholders with provided locale strings; saves them into the __build__ folder. Certain sections in the tempate file will be replaced:

##### head.wetCss

~~~ html
<!-- build:section head.wetCss -->
    ...
<!-- /build -->
~~~

is replaced by the content of the theme-specific file __src/pages/[theme]/head.wetCss.html__.

##### head.wetCss

~~~ html
<!-- build:style head.rampCssLib -->
    ...
<!-- /build -->
~~~

is replaced by the CSS reference to __build/css/lib/lib.min.css__.

##### head.rampCssCore

~~~ html
<!-- build:style head.rampCssCore -->
    ...
<!-- /build -->
~~~

is replaced by the CSS reference to __build/css/[theme]/theme.less.min.css__.

#####  body.wetHeader

~~~ html
<!-- build:section body.wetHeader -->
    ...
<!-- /build -->
~~~

is replaced by the content of the theme-specific file __src/pages/[theme]/body.wetHeader.html__.

##### body.wetFooter

~~~ html
<!-- build:section body.wetFooter -->
    ...
<!-- /build -->
~~~

is replaced by the content of the theme-specific file __src/pages/[theme]/body.wetFooter.html__.

##### body.wetJs

~~~ html
<!-- build:section body.wetJs -->
    ...
<!-- /build -->
~~~

is replaced by the content of the theme-specific file __src/pages/[theme]/body.wetJs.html__.

##### body.rampJsLib

~~~ html
<!-- build:script body.rampJsLib -->
    ...
<!-- /build -->
~~~

is replaced by the JS reference to __build/js/lib/lib.min.js__.

##### body.rampJsCore

~~~ html
<!-- build:script body.rampJsCore -->
    ...
<!-- /build -->
~~~

is replaced by the JS reference to __build/js/RAMP/RAMP-starter.js__.

It reads two csv files containing English and French strings respectively from __RAMP/src/assets/strings_en.csv__ and __RAMP/src/assets/strings_fr.csv__. The files are a simple set of key-values with the header of __key,value__. The build tool also loads the config file located at _configFileLocation_ and mixes found __stringResources__ with strings from the csv files. After that, it runs a replacement task on the content template, generating a language specific html files.

Saves the newly created files into the __build__ folder.

Use the following to run this task:

~~~ js
$ grunt page
~~~

#### watch
_watch_ is a shortcut to run _wcss_, _wjs_, _wpage_, and _wtempate_ tasks. Use the following to run this task:

~~~ js
$ grunt watch
~~~

#### wcss
Watches all [LESS](http://lesscss.org) files in __RAMP/src/css/__ and runs the _css_ task on change. Use the following to run this task:

~~~ js
$ grunt wcss
~~~

#### wjs
Watches all JS files in __RAMP/src/js/RAMP/__ and runs the _hint_ task on the changed file and then runs _js_ task. Use the following to run this task:

~~~ js
$ grunt wjs
~~~

##### --target / -tr
To watch for a specific JS file, use the __--target__ or its shortcut __-tr__ options and specify the path to the file relative to __RAMP/javascript/src/RAMP/__:

~~~ js
$ grunt wjs --target=Modules/datagrid.js
$ grunt wjs -tr Modules/datagrid.js
~~~

#### wpage
Watches main HTML template file __RAMP/src/ramp-src.html__ and all the theme-specific templates in __src/pages__ folder; runs _page_ task when changes are detected:

~~~ js
$ grunt wpage
~~~

#### wtempate
Watches all JSON files in __RAMP/src/js/RAMP/Modules/Templates__ and copies them to the __build__ folder when changes are detected. Use the following to run this task:

~~~ js
$ grunt wtempaltes
~~~

### Config File - package.json

package.json contains the metadata about the build tool project, grunt dependencies to be installed and some of the variables used by the build tool such as various paths, folders, and file names. package.json is a pure JSON file (no comments, no unquoted strings, no multiline values allowed). All the variables related to the build tool stored in __ramp__ object.

#### jsLibToUglify
A list of JS libraries’ files to be uglified, their paths relative to the __lib__ folder in __RAMP/src/js/__. Since some of the libraries come in a non-uglified state and some of the libraries’ source code was modified by us, we need to uglify them before concatenating with other, already uglified JS libraries.

__console.log, warn, etc.__ statements are removed during uglification.

#### jsLibToConcat
A list of JS libraries’ files to be concatenated together. Make sure you only include the uglified version of the files. This list must include all the files from the _jsLibToUglify_ list with __.min.js__ extensions instead of just __.js__.

#### jsLibResourcesToCopy (not used right now)
A list of JS libraries’ resources that need to be in the same folder as the main library file. They will be copied over to the __RAMP/javascript/lib__ folder. Right now this list is empty.

#### jsExtraToCopy
A list of other JS libraries, or just files to be copied to the __build__ folder without modifications.

#### cssLibToMinify
A list of CSS libraries’ to be minified, their paths relative to the __lib__ folder in __RAMP/src/css/__. As with JS libraries, we modify some of the libraries’ CSS and they need to be modified before concatenation.

#### cssLibToConcat
A list of CSS libraries’ files to e concatenated together. Make sure you only include the minified version of the files. The list must include all the files from the cssLibToConcat list with __.min.css__ extensions instead of just __.css__.

#### cssLibResourcesToCopy
A list of CSS libraries' resources/assets like images, fonts, etc. that will be copied to the __build/css/lib__ folder.

#### themes
A list of theme names corresponding to the folder names in the __src/pages__ folder. Right now two themes are used: _ramp-gcwu-fegc_ and _ramp-gcwu-intranet_.

#### pageToBuildEn
The suffix to be appended to the English version of the built page.

#### pageToBuildFr
The suffix to be appended to the French version of the built page.

#### assetsToCopy
A list of folders and files to be copied as part of the deploy task.

#### deployToFolder
A path to the deploy folder.

#### configFileLocation  (not used right now)
Points to the config file to be harvested for locale strings. Can be either a local file (__config.{lang}.json__) or a remote url (__http://sncr01wbingsdv1.ncr.int.ec.gc.ca/RAMP_Service/getConfig/{lang}/?keys=___). Make sure to leave {__lang__} in the file path instead of specifying a language. If it’s a remote url, make sure it returns pure JSON, not [JSONP](http://en.wikipedia.org/wiki/JSONP) .

#### docco.path
A path to the JavaScript folder to be parsed.

#### docco.outdir
A path where to put generated documents.

#### yuidocconfig
The Config object for YUIDoc is located in yuidoc.json file. You can read about its structure here: <http://yui.github.io/yuidoc/args/index.html>

#### hintColors
Specifies the colors to be used by JSHint when outputting to the console; this property is in the root of package.json.

### Grunt Modules
The build tool uses a number of Grunt-specific and general [NPM](https://www.npmjs.org/) modules. They are:

* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
* [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
* [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
* [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
* [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
* [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
* [grunt-replace](https://github.com/outaTiME/grunt-replace)
* [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
* [csvtojson](https://github.com/Keyang/node-csvtojson)
* [request](https://github.com/mikeal/request)
* [grunt-docco](https://github.com/DavidSouther/grunt-docco)
* [grunt-contrib-yuidoc](https://github.com/gruntjs/grunt-contrib-yuidoc)
* [grunt-notify](https://github.com/dylang/grunt-notify)
* [jshint-stylish-plain](https://github.com/AleksueiR/jshint-stylish-plain)
* [grunt-complexity](https://github.com/vigetlabs/grunt-complexity)
* [grunt-bump](https://www.npmjs.org/package/grunt-bump)
* [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)
* [grunt-jscs-checker](https://github.com/gustavohenke/grunt-jscs-checker)
* [grunt-html-build](https://github.com/spatools/grunt-html-build)
* [grunt-chmod](https://github.com/JamesMGreene/grunt-chmod)

### Other

#### Making your Grunt Snarl
To see sweet notification balloons when your Grunt wants to tell you that your task has failed (or when JS has been JShinted successfully, or when LESS has been converted to proper CSS), install [Snarl](http://snarl.fullphat.net/) from here: <http://sourceforge.net/projects/snarlwin/files/latest/download?source=files>

You don’t need to do anything else.

#### Adding JavaScript Library
To add a JavaScript library, do the following:

1.	create a folder in __RAMP/src/js/lib/{library name}.{ library  version}__, and copy the library files into this folder;
2.	add the main uglified library file name(s) to the _jsLibToConcat_ property in __package.json__ file making sure the path is relative to the _jsFolder_ property; if the library doesn’t have an uglified version, do __step 3__ even if you didn’t modify the library’s source;
3.	if you made changes to the library’s source file(s), add their names to the _jsLibToUglify_ property of  the __package.json__ file; the build tool will create an uglified version with __*.min.js__ extension;
4.	include the reference to the library’s source file(s) if you modified them and to main uglified file(s) if you didn’t in __ramp-src.html__ between the <!-- JS LIB --> comment tags:
5.	run the tool;

#### Adding CSS Library
To add a CSS library, do the following:

1.	create a folder in __RAMP/src/css/lib/{library name}.{ library  version}__, and copy the library files into this folder;
2.	add the main minified library file name(s) to the _cssLibToConcat_ property in __package.json__ file making sure the path is relative to the _cssFolder_ property; if the library doesn’t have an minified version, do __step 3__ even if you didn’t modify the library’s source;
3.	if you made changes to the library’s source file(s), add their names to the _cssLibToMinify_ property of  the __package.json__ file; the build tool will create an minified version with __*.min.css__ extension;
4.	include the reference to the library’s source file(s) if you modified them and to main minified file(s) if you didn’t in __ramp-src.html__ between the <!-- CSS LIB --> comment tags:
5.	run the tool;

#### Making Cake
To have the build tool make you a cake, do the following:

1.	save a picture of the cake you want in __RAMP/assets/images/cake.png__;
2.	save the cake’s recipe in __RAMP/assets/recipe.txt__;
3.	spin three times on your chair clapping your hands and shouting "Cake";
4.	use the command __grunt cake__
5.	enjoy your cake;

### Troubleshooting

#### Task Not Found
If you get a "Task not found" error like this one:

~~~
Warning: Task "***" not found.  Use --force to continue.
Aborted due to warnings.
~~~

Run the _npm install_ command again (you may want to delete the __node_modules__ folder from the root, if it didn’t work after the first try, just in case):