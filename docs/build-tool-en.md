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

~~~
$ npm install -g grunt-cli
~~~

This will add the grunt command in your system path, allowing it to be run from any directory. You might want to restart your machine, just in case.


## Build Tool
The build tool is just a Grunt project set up to automate the processing of the template, JS and CSS files before deployment. It also outputs the English and French versions of the main page template using supplies locale strings.

The Build tool can also

* monitor __*.less__ files in __RAMP/src/css/__ for changes and autoconvert them to css – very handy since you don’t have to run the build tool manually to see changes; see _wcss_ task;
* monitor __*.js__ files in __RAMP/src/js/RAMP/__ for changes and run [JSHint](http://www.jshint.com/) on the modified file – very handy since you can avoid silly JavaScript errors; see _wjs_ task; additionaly, it can also reminify JS files after each change - see _wjse_ taks;

### Structure
There are two files required to configure and run the build tool: __package.json__ and __Gruntfile__. They resided in __RAMP__ at the root level.

__package.json__: stores metadata for the project; defines the list of Grunt plugins needed;

__Gruntfile__: configures and defines tasks;

Apart from these two files, there is also the __node_modules__ folder in the root of __RAMP__ containing Grunt modules which will be pulled from GitHub when you run __npm install__ in the next section. This folder is [cloaked](http://blogs.msdn.com/b/fai/archive/2008/10/02/cloaking-in-tfs.aspx) in TFS to prevent several thousand files being shuffled back and forth, so don’t try to check stuff in please.

You can read more about Grunt projects [here](http://gruntjs.com/getting-started)


### Running the Build Tool
To run the build tool do the following:

1. Open Command Prompt or PowerShell
2. Change to the project’s root directory
3. Use __npm install__ to install project dependencies (need to run only once or when adding new modules)
4. You might need to check out for editing __RAMP/css/src/ramp-theme/ramp.less.pref.css__ as this is the only source file the build tool requires access to modify
5. Use the following to run the build tool: 

~~~
grunt
~~~

if you get an error that something is not found, try running __npm install__ again.


### Default Task
Unless you specify a task to run, __grunt__ command runs _css_, _js_, and _page_ tasks and they will 

1. increment the project’s version number;
2. convert LESS files from __RAMP\css\src__ to CSS, add browser-specific prefixes to CSS files in __RAMP\css\src__, minimize CSS, and copy them to __RAMP\css\build__; concatenate CSS libraries located in __RAMP\css\lib src__, and copy the resulting __lib.min.css__ to __RAMP\css\lib__;
3. run JSHint on all JS source files – the default build task _will_ fail if there are any errors present; [uglify](http://lisperator.net/uglifyjs/compress) JS files from __RAMP\javascript\src\RAMP__ and move them to __RAMP\javascript\build\RAMP__; uglifiy modified/pretty JS libraries from __RAMP\javascript\lib src__, concatenate them with other, already uglified JS libraries and copy the resulting __lib.min.js__ file to __RAMP\javascript\lib__; copy templates from __RAMP\javascript\src\RAMP\Modules\templates__ to __RAMP\javascript\build\RAMP\Modules\templates__; change the state variable from “__src/__” to “__build/__” in __RAMP-starter.js__;
4. output English and French versions of the content template file (__ramp-map-src.html__) by replacing placeholders with provided locale strings; save them as __map.html__ and __carte.html__;
5. generate API documentation using [YUIDoc](http://yui.github.io/yuidoc/) and annotated source code documents using [Docco](http://jashkenas.github.io/docco/) and save them in “__docs/docco__” and “__docs/yuidoc__” folder

#### --source
To generate source mappings for the core JS files, use source option as follows:

~~~
$ grunt --source
~~~
 
Note: folders __RAMP/javascript/build__, __RAMP/javascript/lib__, __RAMP/docs__, __RAMP/css/build__, and __RAMP/css/lib__ are also cloaked, so don’t check them in either.


### Other Tasks
The default task calls the three main build tasks and if you don’t want to build everything at once all the time, you can call any of the of build tasks individually. You can also call any of the utility tasks defined in the __Gruntfile__. You can do that by using

~~~
$ grunt <task-name>
~~~

#### api
Generate API documentation using YUIDoc and annotated source code documents using Docco and save them in “__docs/docco__” and “__docs/yuidoc__” folder. Use the following to run this task:

~~~
$ grunt api
~~~


#### bump
Increments the project’s version number; needs to have write access to __package.json__ and __yuidoc.json__. Use the following to run this task:

~~~
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

#### cleanAll
Removes all temporary and build folders:

* RAMP/javascript/build
* RAMP/javascript/lib
* RAMP/javascript/lib/_temp
* RAMP/css/build
* RAMP/css/lib
* RAMP/css/build/_temp
* RAMP/css/lib/_temp
* RAMP/css/src/**/*.pref.css
* RAMP/css/src/**/*.less.css (except for *.less.pref.css)
* RAMP/css/src/**/*.min.css
* RAMP/map.html and RAMP/carte.html
* RAMP/docs/docco
* RAMP/docs/yuidoc

Use the following to run this task:

~~~
$ grunt cleanAll
~~~

#### css
Converts LESS, prefixes CSS, minifies and copies the resulting CSS files to the __build__ and __lib__ folders. Use the following to run this task:

~~~
$ grunt css
~~~

Note: You need to run this task every time you modify any *.less files since the browser cannot interpret them directly and no changes will be reflected in rendering of the page. It’s best to use _wcss_ task to auto-convert LESS to CSS on every change. 

#### deploy
Copies only the necessary files to a specified location leaving out source folders. This task _will_ fail if there are any JS errors present. Use the following to run this task:

~~~
$ grunt deploy
~~~

Note: The target folder is cleaned prior to copying files.


#### hint
Runs JSHint on all JS files in __RAMP/javascript/src/RAMP/__. Use the following to run this task:

~~~
$ grunt hint
~~~

##### --target / -tr
To lint a specific JS file, use the __--target__ or its shortcut __-tr__ options and specify the path to the file relative to __RAMP/javascript/src/RAMP/__:

~~~
$ grunt hint --target=Modules/datagrid.js
$ grunt hint -tr Modules/datagrid.js
~~~


##### --output / -o
To lint a specific JS file, use the __--target__ or its shortcut __-tr__ options and specify the path to the file relative to __RAMP/javascript/src/RAMP/__:

~~~
$ grunt hint --output=jsHintErrors.my
$ grunt hint -o jsHintErrors.my
~~~


#### js
JShints, uglifies, concatenates, and copies the resulting JS files and templates to the __build__ and __lib__ folders. This task _will_ fail if there are any errors present. Use the following to run this task

~~~
$ grunt js
~~~


##### --source
To generate source mappings for the core JS files, use __source__ option as follows:

{% highlight bash %}
$ grunt js --source
{% endhighlight %}

#### page
Outputs English and French versions of the content template file (__ramp-map-src.html__) by replacing placeholders with provided locale strings; saves them as __map.html__ and __carte.html__. Updates CSS references to the following:

{% highlight html linenos %}
<link href="css/lib/lib.min.css" rel="stylesheet" type="text/css" />
<link href="css/build/ramp-theme/ramp.less.min.css" rel="stylesheet" type="text/css" />
{% endhighlight %}

JS references are updated to the following:

~~~
<script src="javascript/lib/lib.min.js" type="text/javascript"></script>
<script src="javascript/build/RAMP/RAMP-starter.js" type="text/javascript"></script>
~~~
 
It reads two csv files containing English and French strings respectively from __RAMP/assets/strings_en.csv__ and __RAMP/assets/strings_fr.csv__. The files are a simple set of key-values with the header of __key,value__. The build tool also loads the config file located at _configFileLocation_ and mixes found __stringResources__ with strings from the csv files. After that, it runs a replacement task on the content template, generating a language specific html files.

Saves the newly created files as __map.html__ and __carte.html__ in the root of RAMP. Try not to check these files into TFS.

Use the following to run this task:

~~~
$ grunt page
~~~


#### wcss
Watches all [LESS](http://lesscss.org) files in __RAMP/css/src/__ and runs the _css_ task on change. Use the following to run this task:

~~~
$ grunt wcss
~~~


#### wjs
Watches all JS files in __RAMP/javascript/src/RAMP/__ and runs the _hint_ task on the changed file. Use the following to run this task:

~~~
$ grunt wjs
~~~

##### --target / -tr
To watch for a specific JS file, use the __--target__ or its shortcut __-tr__ options and specify the path to the file relative to __RAMP/javascript/src/RAMP/__:

~~~
$ grunt wjs --target=Modules/datagrid.js
$ grunt wjs -tr Modules/datagrid.js
~~~


### Config File - package.json

package.json contains the metadata about the build tool project, grunt dependencies to be installed and some of the variables used by the build tool such as various paths, folders, and file names. package.json is a pure JSON file (no comments, no unquoted strings, no multiline values allowed). All the variables related to the build tool stored in __ramp__ object.

#### jsFolder
Path to the JavaScript folder relative to the root of RAMP.

#### jsLibToUglify
A list of JS libraries’ files to be uglified, their paths relative to the __lib src__ folder in __RAMP/javascript/__. Since some of the libraries come in a non-uglified state and some of the libraries’ source code was modified by us, we need to uglify them before concatenating with other, already uglified JS libraries.

__console.log, warn, etc.__ statements are removed during uglification.

#### jsLibToConcat
A list of JS libraries’ files to be concatenated together. Make sure you only include the uglified version of the files. This list must include all the files from the _jsLibToUglify_ list with __.min.js__ extensions instead of just __.js__.

#### jsLibResourcesToCopy
A list of JS libraries’ resources that need to be in the same folder as the main library file. They will be copied over to the __RAMP/javascript/lib__ folder. Right now this list is empty.

#### cssFolder
Path to the CSS folder relative to the root of RAMP.

#### cssLibToMinify
A list of CSS libraries’ to be minified, their paths relative to the __lib src__ folder in __RAMP/css/__. As with JS libraries, we modify some of the libraries’ CSS and they need to be modified before concatenation.

#### cssLibToConcat
A list of CSS libraries’ files to e concatenated together. Make sure you only include the minified version of the files. The list must include all the files from the cssLibToConcat list with __.min.css__ extensions instead of just __.css__.

#### lessFileToCss
A list of LESS files to be converted to CSS, their paths relative to __RAMP/css/src/__. When LESS files are converted, they are saved with __*.less.css__ extension.

#### pageFolder
Path to the folder containing the content files relative to the root of RAMP. Now it points to the root.

#### pageSource
Specifies the name of the content template file. The content template file instead of language-specific strings has place holders in the form of __@@{stringKey}__ that would be replaced by supplied locale strings during the build tool’s page task.

#### deployToFolder
A path to the deploy folder.

#### pageToBuildEn
The name of the English version of the build page.

#### pageToBuildFr
The name of the French version of the build page.

#### foldersToDeploy
A list of folders and files to be copied as part of the deploy task.

#### configFileLocation
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
* [grunt-bump](https://www.npmjs.org/package/grunt-bump)


### Other

#### Making your Grunt Snarl
To see sweet notification balloons when your Grunt wants to tell you that your task has failed (or when JS has been JShinted successfully, or when LESS has been converted to proper CSS), install [Snarl](http://snarl.fullphat.net/) from here: <http://sourceforge.net/projects/snarlwin/files/latest/download?source=files>

You don’t need to do anything else.

#### Adding JavaScript Library
To add a JavaScript library, do the following:

1.	create a folder in __RAMP/javascript/lib src/{library name}.{ library  version}__, and copy the library files into this folder;
2.	add the main uglified library file name(s) to the _jsLibToConcat_ property in __package.json__ file making sure the path is relative to the _jsFolder_ property; if the library doesn’t have an uglified version, do __step 3__ even if you didn’t modify the library’s source;
3.	if you made changes to the library’s source file(s), add their names to the _jsLibToUglify_ property of  the __package.json__ file; the build tool will create an uglified version with __*.min.js__ extension;
4.	include the reference to the library’s source file(s) if you modified them and to main uglified file(s) if you didn’t in __ramp-map-src.html__ between the <!-- JS LIB --> comment tags: 
5.	run the tool;

#### Adding CSS Library
To add a CSS library, do the following:

1.	create a folder in __RAMP/css/lib src/{library name}.{ library  version}__, and copy the library files into this folder;
2.	add the main minified library file name(s) to the _cssLibToConcat_ property in __package.json__ file making sure the path is relative to the _cssFolder_ property; if the library doesn’t have an minified version, do __step 3__ even if you didn’t modify the library’s source;
3.	if you made changes to the library’s source file(s), add their names to the _cssLibToMinify_ property of  the __package.json__ file; the build tool will create an minified version with __*.min.css__ extension;
4.	include the reference to the library’s source file(s) if you modified them and to main minified file(s) if you didn’t in __ramp-map-src.html__ between the <!-- CSS LIB --> comment tags: 
5.	run the tool;

#### Making Cake
To have the build tool make you a cake, do the following:

1.	save a picture of the cake you want in __RAMP/assets/images/cake.png__;
2.	save the cake’s recipe in __RAMP/assets/recipe.txt__;
3.	spin three times on your chair clapping your hands and shouting “Cake”;
4.	use the command __grunt cake__
5.	enjoy your cake;


### Troubleshooting

#### Task Not Found
If you get a “Task not found” error like this one:

~~~
Warning: Task "***" not found.  Use --force to continue.
Aborted due to warnings.
~~~

Run the __npm install__ command again (you may want to delete the __node_modules__ folder from the root, if it didn’t work after the first try, just in case):
 
#### Unable to Write “ramp.less.pref.css”

~~~
Warning: Unable to write "css/src/ramp-theme/ramp.less.pref.css" file (Error code: EPERM).  Use --force to continue.
Aborted due to warnings.
~~~

The CSS file __ramp.less.pref.css__ has to be updated every time you change __.less__ source and want to see these changes; since is __ramp.less.pref.css__ needed to run RAMP even in development mode, it’s checked into TFS and you need to explicitly check it out so the build tool can modify it.
