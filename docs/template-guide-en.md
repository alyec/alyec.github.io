---
layout: index-en
title: Templating Guide
categories: [documentation]
---
{% include JB/setup %}

# RAMP Templating Guide

## Libraries

RAMP templating uses the [JavaScript Templates engine by BlueImp](https://github.com/blueimp/JavaScript-Templates).  

The library resides in RAMP at /javascript/libs/tmplEx.js, and should be loaded in the main html page.

The library has been modified from its original form.  It has been enhanced to allow the loading of JSON files that contain multiple template definitions.


## Template Structure

Templates are stored in .json files, but can contain extended json (such as inline comments and embedded javascript)

### Basic Structure

The basic structure of the template file is a key value dictionary, the keys being the template names, the values being the templates.  E.g.

~~~
{
    "TemplateOne": "<b>A bold template</b>",
    "TemplateTwo": "A plain template"
}
~~~



### Comments

Comments can be added to the files to improve readability.  Both // and /* */ formats are accepted.  E.g.

~~~
/*
* A fun sample template file
* to help with your code learnin
*/
{
    //A template that returns bold text
    "TemplateOne": "<b>A bold template</b>",

    //A template that returns unformatted text
    "TemplateTwo": "A plain template"
}
~~~

Be careful not to put comments inside the template strings, as they will be included in the template and look funny.


### Simple Value Replacement

The template references a data object called o.  The value of o is the data object supplied to the template engine when it is called.  Using the embedded value tags {{ "{%= " }} %} we can reference the object and have the value appear in the template output.  E.g. this template will output a hyperlink based on the values in the data object.  The data object must have properties .url and .text to work.

~~~
{% raw %}{
    "UrlTemplate": "<a href='{%=o.url%}'>{%=o.text%}</a>"	
}{% endraw %}
~~~

### Global Javascript Function Calls

The template can also call any globally defined javascript function for additional formatting. E.g. this template will return a div exclaiming that a given subject in school is fun.

(in global javascript space)

~~~
function itIsFun(subject) {
    return subject + " is fun!";
}
~~~

(template)

~~~
{% raw %}{
    "SubjectReview": "<div>{%=itIsFun(o.subjectName)%}</div>"	
}{% endraw %}
~~~


### Linking Templates

Templates can embed other templates within them.  They do this by calling the __include__ function inside code tags {{ "{% " }} %}.  The include function parameters are the template name, and a data object for that template.  E.g.

~~~
{% raw %}{
    //A link in a div
    "DivTemplate": "<div class='nice-format'>
            {% include('UrlTemplate', o); %}
        </div>",

    //A url link
    "UrlTemplate": "<a href='{%=o.url%}'>{%=o.text%}</a>"
}{% endraw %}
~~~


### Embedded Javascript
The template can also include embedded javascript to help construct more complex templates.  Code is contained in {{ "{% " }} %} tags.  E.g. this template will loop through all the properties in the data object and generate list items for each property based on a second template.  Note how the __include__ call bundles up a custom data object to pass to the simpleListItem template.

~~~
{% raw %}{
    //make a full list of properties
    "PropertiesTemplate": 
        "<div>
            <ul>
                {% for (var prop in o ) { 
                    if (o.hasOwnProperty(prop)) { 
                           include('simpleListItem', 
                           {key: prop, value: o[prop]}); 
                    }
                } %}
            </ul>
        </div>",

    //make a list item for one property
    "simpleListItem": "<li>
                <p>{%=o.key%}</p>
                <p>{%=o.value%}</p>
            </li>"    
}{% endraw %}
~~~


## Template Usage

Once the template is loaded from a file, it must be parsed from the human-readable file form to a computer readable form.  This parsing includes: removing inline comments; removing hard returns; removing tabs.  A function in module __utils/tmplHelper__ called __stringifyTemplate__ will perform this parsing.

The parsed contents are then converted to a JSON object, and assigned to the customized templates property of the template engine.  E.g.

~~~
tmpl.templates = JSON.parse(tmplHelper.stringifyTemplate(tmplFileContent));
~~~

Now the template object is ready to generate content using the templates provided.  To get the content, provide the template name (as defined in the template file) and a data JSON object (that has the appropriate properties required by the template).  E.g.

~~~
result = tmpl("myTemplateName", oDataObject)
~~~

## Full Example

### Template File

~~~
{% raw %}{
    //make a full list of properties
    "PropertiesTemplate": 
        "<div>
            <ul>
                {% for (var prop in o ) { 
                    if (o.hasOwnProperty(prop)) { 
                           include('simpleListItem', 
                            {key: prop, value: o[prop]}); 
                    }
                } %}
            </ul>
        </div>",

    //make a list item for one property
    "simpleListItem": "<li>
                            <p>{%=o.key%}</p>
                            <p>{%=o.value%}</p>
                        </li>"    
}{% endraw %}
~~~


### Javascript

We assume the main page has included the Templating javascript library.

~~~
define([
    "utils/tmplHelper",
    "dojo/text!./templates/sample_template.json"],

function (tmplHelper, sample_template) { return {

    testTemplate: function() {

        //make some sample data
        var data = {"user": "HappyDuck", "pwd": "QUACK"};
        var dataPkg = tmplHelper.dataBuilder(data)

        //turn template into JSON, assign to template engine
        tmpl.templates = JSON.parse(tmplHelper.stringifyTemplate(sample_template));

        var result = tmpl("PropertiesTemplate", dataPkg);

        return result;
    }

};
});
~~~


### Result

~~~
<div>
    <ul>
        <li>
            <p>user</p><p>HappyDuck</p>
        </li>
        <li>
            <p>pwd</p><p>QUACK</p>
        </li>
    </ul>
</div>
~~~

## Template Files

Template files are currently stored in folder __/javascript/src/RAMP/Modules/templates__.  In the future we may have two folders, one for RAMP core templates, another for custom templates.

Our default approach to loading template files is via the __dojo/text!__ importer.  This is a simple and effective way of loading files with fixed names.  Note that templates should be language neutral, and any text should be supplied via the data for the template.

Developers are also free to implement alternative loading techniques to suit specific needs.  These can include

* Embedding a simple, pure-JSON template within the main config file
* Loading a template file via [dojo/xhr](http://dojotoolkit.org/reference-guide/1.9/dojo/xhr.html).  Again, templates should be in proper JSON format (i.e. no comments)


## Template Data Object Standard Properties

The template engine allows the caller to pass in any JSON object to supply values to the template.  In RAMP, we look to standardize this input object so that templates can access common data and javascript functions in a consistent and efficient manner.   


### Data Object Layout

o.data
: contains the primary data supplied by the caller.  For example, a hover-tip would likely supply the feature being hovered over here.  The caller can optionally supply a compound object consisting of many useful parameters.

o.config
: points to the global config object.  Allows templates to access data in the config.

o.str
: points to the stringResources dictionary within the config object.  We provide this as a shortcut pointer to reduce template clutter.

o.fn
: contains formatting functions that can be called within the template.  Currently this includes helper functions defined in tmplUtil module.  In the future we want to include user-defined custom functions as well.

o.lyr
: (optional) points to the layer object that is relevant for the current template.  Allows the template to avoid iterating through the layer collection in the global config object.


### Data Object Constructor

The dojo module __utils/tmplHelper__ provides the function dataBuilder that generates and returns the data object using the above layout.  

The function takes two parameters.  The first parameter determines the JSON object that is stored in o.data.  The second optional parameter is a url for a feature layer.  If provided, the data object will have its o.lyr property pointing to the appropriate layer config node.  If not provided, o.lyr will be undefined.  The other properties in the data object are automatically assigned by the function.


## Common Template Functions

The module __utils/tmplUtil__ provides common functions that can be used inside the templates.  As an example, one function is __getGraphicIcon__, which will return the symbology image for a feature.

Note that a scoping issue exists when calling functions from the template.  Any function called from within the template cannot call a second function, unless that function is defined within the scope of the first function.  __THIS ISSUE MAY NOT ACTUALLY EXIST.  MORE RESEARCH TO BE DONE!__

