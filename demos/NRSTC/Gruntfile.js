var fs = require('fs'),
    request = require('request'),
    extend = require('util')._extend,
    csvToJson = require("csvtojson").core.Converter;

module.exports = function(grunt) {
    var tempJsLibToClear = [],
        tempCssLibToClear = [],

        localeStrings = {
            en: {},
            fr: {}
        };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        hintColors: '<%= pkg.hintColors %>',

        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 0 // maximum number of notifications from jshint output
            }
        },

        notify: {
            hint: {
                options: {
                    message: 'JSHint is a GO.' //required
                }
            },

            jscs: {
                options: {
                    message: 'JSCS-Checker is a GO.' //required
                }
            },

            css: {
                options: {
                    message: 'CSS is a GO.' //required
                }
            },

            js: {
                options: {
                    message: 'JavaScript is a GO.' //required
                }
            },

            page: {
                options: {
                    message: 'Pages are a GO.' //required
                }
            },

            api: {
                options: {
                    message: 'API docs are a GO.' //required
                }
            },

            build: {
                options: {
                    message: 'The Build is ready!' //required
                }
            },

            deploy: {
                options: {
                    title: 'Build is Deployed', // optional
                    message: 'Done, thanks!' //required
                }
            },

            clean: {
                options: {
                    message: 'Mopping up is done!'
                }
            },

            bump: {
                options: {
                    message: ''
                }
            }
        },

        clean: {
            options: {
                force: true
            },

            rampJsBefore: [
                '<%= pkg.ramp.jsFolder %>/build/',
                '<%= pkg.ramp.jsFolder %>/lib/'
            ],

            rampJsAfter: [
                '<%= pkg.ramp.jsFolder %>/lib/_temp/',
                tempJsLibToClear
            ],

            rampCssBefore: [
                '<%= pkg.ramp.cssFolder %>/build/',
                '<%= pkg.ramp.cssFolder %>/lib/'
            ],

            rampCssAfter: [
                '<%= pkg.ramp.cssFolder %>/build/_temp/',
                '<%= pkg.ramp.cssFolder %>/lib/_temp/',
                tempCssLibToClear,
                '<%= pkg.ramp.cssFolder %>/src/**/*.pref.css',
                '<%= pkg.ramp.cssFolder %>/src/**/*.less.css',
                '<%= pkg.ramp.cssFolder %>/src/**/*.min.css',
                '!**/*.less.pref.css'
            ],

            page: [
                '<%= pkg.ramp.pageFolder %>/<%= pkg.ramp.pageToBuildEn %>',
                '<%= pkg.ramp.pageFolder %>/<%= pkg.ramp.pageToBuildFr %>',
                '<%= pkg.ramp.pageFolder %>/*-build.html',
                '!<%= pkg.ramp.pageFolder %>/*-src.html'
            ],

            yuidoc: ['<%= yuidocconfig.options.outdir %>'],

            docco: ['<%= pkg.ramp.docco.outdir %>']
        },

        concat: {
            options: {
                stripBanners: true,
                // define a string to put between each file in the concatenated output
                separator: ''
            },

            rampJsLib: {
                files: [{
                    src: ['<%= pkg.ramp.jsFolder %>/lib/_temp/**/*.js'],
                    dest: '<%= pkg.ramp.jsFolder %>/lib/lib.min.js'
                }]
            },

            rampCssCore: {
                files: [{
                    src: ['<%= pkg.ramp.cssFolder %>/build/_temp/**/*.css'],
                    dest: '<%= pkg.ramp.cssFolder %>/build/ramp.min.css'
                }]
            },

            rampCssLib: {
                files: [{
                    src: ['<%= pkg.ramp.cssFolder %>/lib/_temp/**/*.css'],
                    dest: '<%= pkg.ramp.cssFolder %>/lib/lib.min.css'
                }]
            }
        },

        uglify: {
            rampJsCore: {
                options: {
                    compress: {
                        drop_console: true
                    },
                    report: 'min',
                    sourceMap: false,
                    sourceMapIncludeSources: false,
                    preserveComments: false,
                    // the banner is inserted at the top of the output
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.jsFolder %>/src/',
                    src: '**/*.js',
                    dest: '<%= pkg.ramp.jsFolder %>/build/'
                }]
            },

            rampJsLib: {
                options: {
                    report: 'min'
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.jsFolder %>/lib src/',
                    src: '<%= pkg.ramp.jsLibToUglify %>',
                    dest: '<%= pkg.ramp.jsFolder %>/lib src/',
                    rename: function(dest, src) {
                        var nd = dest + src.replace(".js", ".min.js");
                        tempJsLibToClear.push(nd);
                        return nd;
                    }
                }]
            }
        },

        replace: {
            options: {
                force: true
            },
            rampJsCore: {
                options: {
                    patterns: [{
                        match: 'src/',
                        replacement: 'build/'
                    }, {
                        match: /$/,
                        replacement: '\nconsole.log("<%= pkg.ramp.arcticFox %>");'
                    }],
                    usePrefix: false
                },
                files: [{
                    src: '<%= pkg.ramp.jsFolder %>/build/RAMP/RAMP-starter.js',
                    dest: '<%= pkg.ramp.jsFolder %>/build/RAMP/RAMP-starter.js'
                }]
            },

            page: {
                options: {
                    patterns: [{
                            match: '<%= pkg.ramp.cssFolder %>/src/',
                            replacement: '<%= pkg.ramp.cssFolder %>/build/'
                        },

                        {
                            match: /<!-- CSS LIB -->[\s\S]+?<!-- !CSS LIB -->/ig,
                            replacement: '<link href="css/lib/lib.min.css" rel="stylesheet" type="text/css" />'
                        },

                        {
                            match: /<!-- CSS RAMP -->[\s\S]+?<!-- !CSS RAMP -->/ig,
                            replacement: '<link href="css/build/ramp-theme/ramp.less.min.css" rel="stylesheet" type="text/css" />'
                        },

                        {
                            match: /<!-- JS LIB -->[\s\S]+?<!-- !JS LIB -->/ig,
                            replacement: '<script src="javascript/lib/lib.min.js" type="text/javascript"></script>'
                        },

                        {
                            match: /<!-- JS RAMP -->[\s\S]+?<!-- !JS RAMP -->/ig,
                            replacement: '<script src="javascript/build/RAMP/RAMP-starter.js" type="text/javascript"></script>'
                        }
                    ],
                    usePrefix: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.pageFolder %>/',
                    src: ['*.html', '!*-src.html'],
                    dest: '<%= pkg.ramp.pageFolder %>/'
                }]
            },

            stringsEn: {
                options: {
                    patterns: [{
                        json: localeStrings.en
                    }]
                },

                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.pageFolder %>/',
                    src: '<%= pkg.ramp.pageToBuildEn %>',
                    dest: '<%= pkg.ramp.pageFolder %>/'
                }]
            },

            stringsFr: {
                options: {
                    patterns: [{
                        json: localeStrings.fr
                    }]
                },

                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.pageFolder %>/',
                    src: '<%= pkg.ramp.pageToBuildFr %>',
                    dest: '<%= pkg.ramp.pageFolder %>/'
                }]
            },

            api_esri: {
                options: {
                    patterns: [{
                        json: '<%= yuidocconfig.options.exlinks.esri %>'
                    }],
                    prefix: 'href="',
                    preservePrefix: true,
                    preserveOrder: false
                },

                files: [{
                    expand: true,
                    cwd: '<%= yuidocconfig.options.outdir %>',
                    src: ['**/*.html', '!**/*-src.html'],
                    dest: '<%= yuidocconfig.options.outdir %>'
                }]
            },

            api_dojo: {
                options: {
                    patterns: [{
                        json: '<%= yuidocconfig.options.exlinks.dojo %>'
                    }],
                    prefix: 'href="',
                    preservePrefix: true,
                    preserveOrder: false
                },

                files: [{
                    expand: true,
                    cwd: '<%= yuidocconfig.options.outdir %>',
                    src: ['**/*.html', '!**/*-src.html'],
                    dest: '<%= yuidocconfig.options.outdir %>'
                }]
            },

            api_other: {
                options: {
                    patterns: [
                        /*{
                        match: /href=".*?\|/ig,
                        replacement: 'href="'
                    }*/
                    ],
                    usePrefix: false
                },

                files: [{
                    expand: true,
                    cwd: '<%= yuidocconfig.options.outdir %>',
                    src: ['**/*.html', '!**/*-src.html'],
                    dest: '<%= yuidocconfig.options.outdir %>'
                }]
            }
        },

        jshint: {
            files: ['<%= pkg.ramp.jsFolder %>/src/RAMP/**/*.js'],
            options: {
                reporter: require('jshint-stylish-plain'),

                // options here to override JSHint defaults
                // enforce
                bitwise: true,
                camelcase: false, //true, //(optional)
                curly: true,
                eqeqeq: true,
                es3: false,
                forin: true,
                freeze: true,
                immed: true,
                indent: false,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: false, //(sometimes want "do nothing" functions)
                nonew: true,
                plusplus: false,
                quotmark: false,
                undef: true,
                unused: true, //"strict",
                strict: true,
                trailing: true,

                // relax

                asi: false,
                boss: false,
                debug: false,
                eqnull: true,
                esnext: false,
                evil: false,
                //expr: false, (?)
                funcscope: false,
                gcl: false,
                globalstrict: false,
                iterator: false,
                lastsemic: false,
                laxbreak: false,
                laxcomma: false,
                loopfunc: false,
                maxerr: 50, // (default is good)
                moz: false,
                multistr: false,
                notypeof: false,
                proto: false,
                scripturl: false,
                smarttabs: true,
                shadow: false,
                sub: false,
                supernew: false,
                validthis: false,
                noyield: false,

                globals: {
                    jQuery: true,
                    $: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        watch: {
            wjs: {
                options: {
                    spawn: false
                },
                files: ['<%= pkg.ramp.jsFolder %>/src/RAMP/**/*.js'],
                tasks: ['hint', 'jsstyle']
            },
            wcss: {
                files: ['<%= pkg.ramp.cssFolder %>/src/**/*.less'],
                tasks: ['css']
            }
        },

        copy: {
            options: {
                force: true
            },

            templates: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.jsFolder %>/src/RAMP/Modules/templates',
                    src: '**',
                    dest: '<%= pkg.ramp.jsFolder %>/build/RAMP/Modules/templates'
                }]
            },

            rampJsLib: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.jsFolder %>/lib src/',
                    src: ['<%= pkg.ramp.jsLibToConcat %>'],
                    dest: '<%= pkg.ramp.jsFolder %>/lib/_temp/'
                }]
            },

            rampJsLibResources: {
                files: '<%= pkg.ramp.jsLibResourcesToCopy %>'
            },

            rampCssCore: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.cssFolder %>/src/',
                    src: '**/*.min.css',
                    dest: '<%= pkg.ramp.cssFolder %>/build/'
                }]
            },

            rampCssLib: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.cssFolder %>/lib src/',
                    src: ['<%= pkg.ramp.cssLibToConcat %>'],
                    dest: '<%= pkg.ramp.cssFolder %>/lib/_temp/'
                }]
            },

            cssLibResourcesToCopy: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.cssFolder %>/lib src/',
                    src: ['<%= pkg.ramp.cssLibResourcesToCopy %>'],
                    dest: '<%= pkg.ramp.cssFolder %>/lib/'
                }]
            },

            pageEn: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.pageFolder %>/',
                    src: '<%= pkg.ramp.pageSource %>',
                    dest: '<%= pkg.ramp.pageFolder %>/',
                    rename: function(dest, src) {
                        return dest + src.replace('-src', '-' + '<%= pkg.ramp.pageToBuildEn %>' + '-build');
                    }
                }]
            },

            pageFr: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.pageFolder %>/',
                    src: '<%= pkg.ramp.pageSource %>',
                    dest: '<%= pkg.ramp.pageFolder %>/',
                    rename: function(dest, src) {
                        return dest + src.replace('-src', '-' + '<%= pkg.ramp.pageToBuildFr %>' + '-build');
                        //return dest + '<%= pkg.ramp.pageToBuildFr %>';
                    }
                }]
            },

            deploy: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: '<%= pkg.ramp.foldersToDeploy %>',
                    dest: '<%= pkg.ramp.deployFolder %>/'
                }]
            }
        },

        cssmin: {
            rampCssCore: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.cssFolder %>/src/',
                    src: ['**/*.pref.css'],
                    dest: '<%= pkg.ramp.cssFolder %>/src/',
                    rename: function(dest, src) {
                        return dest + src.replace(".pref.css", ".min.css");
                    }
                }]
            },

            rampCssLib: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.cssFolder %>/lib src/',
                    src: '<%= pkg.ramp.cssLibToMinify %>',
                    dest: '<%= pkg.ramp.cssFolder %>/lib src/',
                    rename: function(dest, src) {
                        var nd = dest + src.replace(".css", ".min.css");
                        tempCssLibToClear.push(nd);
                        return nd;
                    }
                }]
            }
        },

        autoprefixer: {
            options: {
                map: false,
                browsers: ['> 1%', 'last 5 versions', 'Firefox ESR', 'Opera 12.1']
            },

            rampCssCore: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.cssFolder %>/src/',
                    src: ['**/*.css', '!**/*.pref.css', '!**/*.min.css'],
                    dest: '<%= pkg.ramp.cssFolder %>/src/',
                    rename: function(dest, src) {
                        return dest + src.replace(".css", ".pref.css");
                    }
                }]
            }
        },

        less: {
            rampLessCore: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.ramp.cssFolder %>/src/',
                    src: ['<%= pkg.ramp.lessFileToCss %>'],
                    dest: '<%= pkg.ramp.cssFolder %>/src/',
                    rename: function(dest, src) {
                        return dest + src.replace(".less", ".less.css");
                    }
                }]
            }
        },

        docco: {
            debug: {
                src: ['<%= pkg.ramp.docco.path %>/**/*.js'],
                options: {
                    output: '<%= pkg.ramp.docco.outdir %>'
                }
            }
        },

        yuidocconfig: grunt.file.readJSON('yuidoc.json'),

        yuidoc: {
            compile: '<%= yuidocconfig %>'
        },

        bump: {
            options: {
                files: ['package.json', 'yuidoc.json'],
                updateConfigs: ['pkg', 'yuidocconfig'],
                commit: false,
                //commitMessage: 'Release v%VERSION%',
                //commitFiles: ['package.json'], // '-a' for all files
                createTag: false,
                //tagName: 'v%VERSION%',
                //tagMessage: 'Version %VERSION%',
                push: false //,
                //pushTo: 'upstream',
                //gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },

        complexity: {
            generic: {
                src: ['<%= pkg.ramp.jsFolder %>/src/RAMP/**/*.js'],
                options: {
                    breakOnErrors: true,
                    jsLintXML: 'report.xml', // create XML JSLint-like report
                    checkstyleXML: 'checkstyle.xml', // create checkstyle report
                    errorsOnly: false, // show only maintainability errors
                    cyclomatic: [3, 7, 12], // or optionally a single value, like 3
                    halstead: [8, 13, 20], // or optionally a single value, like 8
                    maintainability: 100,
                    hideComplexFunctions: true // only display maintainability
                }
            }
        },

        htmlmin: {
            page: {
                options: { // Target options: https://github.com/kangax/html-minifier#options-quick-reference
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                files: { // Dictionary of files
                    '<%= pkg.ramp.pageToBuildFr %>': '<%= pkg.ramp.pageToBuildFr %>',
                    '<%= pkg.ramp.pageToBuildEn %>': '<%= pkg.ramp.pageToBuildEn %>'
                }
            }
        },

        jscs: {
            main: {
                options: {
                    requireCurlyBraces: [
                        'if',
                        'else',
                        'for',
                        'while',
                        'do',
                        'try',
                        'catch'
                        //'case',
                        //'default'
                    ],
                    requireSpaceAfterKeywords: [
                        'if',
                        'else',
                        'for',
                        'while',
                        'do',
                        'switch',
                        'return',
                        'try',
                        'catch'
                    ],
                    requireSpaceBeforeBlockStatements: true,
                    requireParenthesesAroundIIFE: true, //JSHint: immed
                    requireSpacesInFunctionExpression: {
                        //beforeOpeningRoundBrace: true,
                        beforeOpeningCurlyBrace: true
                    },
                    requireSpacesInAnonymousFunctionExpression: {
                        beforeOpeningRoundBrace: true,
                        beforeOpeningCurlyBrace: true
                    },
                    requireSpacesInNamedFunctionExpression: {
                        //beforeOpeningRoundBrace: true,
                        beforeOpeningCurlyBrace: true
                    },
                    requireSpacesInFunctionDeclaration: {
                        //beforeOpeningRoundBrace: true,
                        beforeOpeningCurlyBrace: true
                    },
                    requireMultipleVarDecl: true,
                    requireBlocksOnNewline: 1,
                    disallowEmptyBlocks: true,
                    //disallowSpacesInsideObjectBrackets: true,
                    disallowSpacesInsideArrayBrackets: true,
                    disallowSpacesInsideParentheses: true,
                    disallowQuotedKeysInObjects: true,
                    disallowSpaceAfterObjectKeys: true,
                    requireCommaBeforeLineBreak: true,
                    //requireOperatorBeforeLineBreak: ?
                    disallowLeftStickedOperators: [
                        '?',
                        '+',
                        '-',
                        '/',
                        '*',
                        '=',
                        '==',
                        '===',
                        '!=',
                        '!==',
                        '>',
                        '>=',
                        '<',
                        '<='
                    ],
                    requireRightStickedOperators: ['!'],
                    disallowRightStickedOperators: [
                        '?',
                        '+',
                        '/',
                        '*',
                        ':',
                        '=',
                        '==',
                        '===',
                        '!=',
                        '!==',
                        '>',
                        '>=',
                        '<',
                        '<='
                    ],
                    requireLeftStickedOperators: [','],
                    disallowSpaceAfterPrefixUnaryOperators: [
                        '++',
                        '--',
                        '+',
                        '-',
                        '~',
                        '!'
                    ],
                    disallowSpaceBeforePostfixUnaryOperators: [
                        '++',
                        '--'
                    ],
                    requireSpaceBeforeBinaryOperators: [
                        '+',
                        '-',
                        '/',
                        '*',
                        '=',
                        '==',
                        '===',
                        '!=',
                        '!=='
                    ],
                    requireSpaceAfterBinaryOperators: [
                        '+',
                        '-',
                        '/',
                        '*',
                        '=',
                        '==',
                        '===',
                        '!=',
                        '!=='
                    ],
                    disallowImplicitTypeConversion: [
                        'numeric',
                        'boolean',
                        'binary',
                        'string'
                    ],
                    //requireCamelCaseOrUpperCaseIdentifiers: true,
                    disallowTrailingComma: true,
                    disallowKeywords: ['with'],
                    disallowMultipleLineStrings: true,
                    disallowMultipleLineBreaks: true,
                    disallowMixedSpacesAndTabs: true, // spaces???
                    disallowKeywordsOnNewLine: ['else'],
                    requireCapitalizedConstructors: true,
                    safeContextKeyword: ['that'],
                    requireDotNotation: true,
                    disallowYodaConditions: true,
                    validateJSDoc: {
                        checkParamNames: true,
                        checkRedundantParams: true,
                        requireParamTypes: true
                    }
                    //config: '.jscs-secondary.json'
                },
                files: {
                    src: ['<%= pkg.ramp.jsFolder %>/src/RAMP/**/*.js']
                }
            }
        }
    });

    //# Load Tasks

    grunt.loadNpmTasks('grunt-notify');
    // This is required if you use any options.
    grunt.task.run('notify_hooks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks("grunt-jscs-checker");

    //# !Load Tasks

    //# Register Tasks

    // CLEAN
    grunt.registerTask('cleanAll', ['clean', 'notify:clean', 'hint:cleanUp']);

    // HINT
    grunt.registerTask('hint:cleanUp', function() {
        var done = this.async();
        grunt.file.delete('.stylishcolors', {
            force: true
        });
        done();
    });

    grunt.registerTask('hint', ['jshint', 'hint:cleanUp', 'notify:hint']);

    // JSCS
    grunt.registerTask('jsstyle', ['jscs', 'notify:jscs']);

    // WATCH
    // watch and hint a file on change
    grunt.registerTask('wjs', ['watch:wjs']);
    // watch and compile CSS on change
    grunt.registerTask('wcss', ['watch:wcss']);

    // STRINGS
    // load and parse locale strings from an csv file
    grunt.registerTask('csvStrings', function(suffix) {
        var done = this.async(),
            fileName = 'assets/strings_' + suffix + '.csv',
            csvToJsonConverter = new csvToJson();

        csvToJsonConverter.on("end_parsed", function(jsonObj) {
            if (jsonObj.csvRows.length === 0) {
                console.log('File', fileName, "is empty or doesn't exit");
            } else {
                jsonObj.csvRows.map(function(elm) {
                    localeStrings[suffix][elm.key] = elm.value;
                });
            }

            done();
        });

        console.log("Loading", fileName);
        csvToJsonConverter.from(fileName);
    });
    // load and parse locale strings from the config file either local or returned by the service
    grunt.registerTask('configStrings', function(suffix) {
        var done = this.async(),
            fileName = grunt.config('pkg.ramp.configFileLocation');

        if (fileName) {
            fileName = fileName.replace('{lang}', suffix);
        } else {
            done();
            return;
        }

        function parseStrings(json) {
            localeStrings[suffix] = extend(localeStrings[suffix], json.stringResources);
        }

        console.log("Loading", fileName);

        fs.readFile(fileName, function(err, data) {
            if (err) {
                request(fileName,
                    function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            parseStrings(JSON.parse(JSON.parse(body).json));
                            done();
                        } else {
                            console.log("Error loading file", fileName);
                            done();
                        }
                    }
                );
            } else {
                parseStrings(JSON.parse(data));
                done();
            }
        });
    });

    grunt.registerTask('cake', function() {
        var done = this.async();

        console.log("The cake is a lie\nThe cake is a lie\nThe cake is a lie\nThe cake is a lie...");
        done();
    });

    // OTHER
    //
    grunt.registerTask('thanks', function() {
        var done = this.async(),
            fileName = './node_modules/grunt/lib/grunt/fail.js';

        fs.readFile(fileName, {
                encoding: "utf8"
            },
            function(err, data) {
                if (err) {
                    console.log("Error loading file", fileName, err);
                    done();
                } else {
                    data = data.replace('Done, without errors.', 'Done, thanks!');
                    fs.writeFileSync(fileName, data);
                    done();
                }
            });
    });

    // JS
    grunt.registerTask('jsClean', ['clean:rampJsBefore', 'clean:rampJsAfter']);
    grunt.registerTask('jsCopy', ['copy:rampJsLib', 'copy:rampJsLibResources', 'copy:templates']);
    grunt.registerTask('jsConcat', ['concat:rampJsLib']);
    grunt.registerTask('jsReplace', ['replace:rampJsCore']);

    grunt.registerTask('js', ['hint', 'clean:rampJsBefore', 'uglify', 'jsCopy', 'jsConcat', 'jsReplace', 'clean:rampJsAfter', 'notify:js']);

    // CSS
    grunt.registerTask('lessCss', ['less:rampLessCore']);
    grunt.registerTask('prefix', ['autoprefixer:rampCssCore']);
    grunt.registerTask('cssClean', ['clean:rampCssBefore', 'clean:rampCssAfter']);
    grunt.registerTask('cssCopy', ['copy:rampCssCore', 'copy:rampCssLib']);
    grunt.registerTask('cssConcat', ['concat:rampCssLib']); //'concat:rampCssCore'

    grunt.registerTask('css', ['clean:rampCssBefore', 'lessCss', 'prefix', 'cssmin', 'cssCopy', 'cssConcat', 'clean:rampCssAfter', 'copy:cssLibResourcesToCopy', 'notify:css']);

    // PAGES
    grunt.registerTask('pageStrings', ['csvStrings:en', 'csvStrings:fr', 'configStrings:en', 'configStrings:fr']);
    grunt.registerTask('pageCopy', ['copy:pageEn', 'copy:pageFr']);
    grunt.registerTask('pageReplace', ['replace:stringsEn', 'replace:stringsFr']);

    grunt.registerTask('page', ['pageStrings', 'clean:page', 'pageCopy', 'replace:page', 'pageReplace', 'htmlmin:page', 'notify:page']);

    // API - Docs
    grunt.registerTask('api:enhance', function() {
        var done = this.async(),
            themeFileName = './node_modules/grunt-contrib-yuidoc/node_modules/yuidocjs/themes/default/layouts/main.handlebars',
            optionsFileName = './node_modules/grunt-contrib-yuidoc/node_modules/yuidocjs/themes/default/partials/options.handlebars',
            builderFileName = './node_modules/grunt-contrib-yuidoc/node_modules/yuidocjs/lib/builder.js',
            q = 'this.NATIVES = Y.merge(options.exnatives, this.NATIVES);',
            data;

        data = fs.readFileSync(optionsFileName, {
            encoding: "utf8"
        });
        if (data) {
            data = data.replace('<input type="checkbox" id="api-show-inherited" checked>', '<input type="checkbox" id="api-show-inherited">');
            fs.writeFileSync(optionsFileName, data);
        }

        data = fs.readFileSync(themeFileName, {
            encoding: "utf8"
        });
        if (data) {
            data = data.replace('<h1><img src="{{projectLogo}}" title="{{projectName}}"></h1>', '<h1><img src="{{projectLogo}}" title="{{projectName}}">{{projectName}}</h1>');
            fs.writeFileSync(themeFileName, data);
        }

        data = fs.readFileSync(builderFileName, {
            encoding: "utf8"
        });
        if (data && data.indexOf(q) === -1) {
            data = data.replace('Y.DocBuilder = function (options, data) {', 'Y.DocBuilder = function (options, data) {\n' + q);
            data = data.replace('return url + name;', 'return url.indexOf("developer.mozilla.org") !== -1 ? url + name : url;');
            fs.writeFileSync(builderFileName, data);
        }

        done();
    });

    grunt.registerTask('api', ['clean:yuidoc', 'api:enhance', 'yuidoc', 'replace:api_dojo', 'replace:api_esri', 'clean:docco', 'docco', 'notify:api']);

    grunt.registerTask('force', 'turns the --force option ON',
        function(value) {
            if (value === 'true') {
                grunt.option('force', true);
            } else {
                grunt.option('force', false);
            }
        });

    // BUILD
    grunt.registerTask('build', ['css', 'js', 'page', 'api', 'notify:build']);
    grunt.registerTask('build:deploy', ['css', 'js', 'page', 'api', 'notify:build']);

    // DEPLOY
    grunt.registerTask('clean:deploy', function() {
        var done = this.async();

        grunt.config('clean.deploy_', grunt.config('pkg.ramp.deployFolder'));
        grunt.task.run('clean:deploy_');

        done();
    });
    grunt.registerTask('deploy', ['build:deploy', 'clean:deploy', 'copy:deploy', 'notify:deploy']);

    grunt.registerTask('default', ['build']);

    //# !Register Tasks

    //# Register Options

    var target = grunt.option('target') || grunt.option('tr') || null,
        output = grunt.option('output') || grunt.option('o') || null,
        hintColorFile = '.stylishcolors';

    if (target) {
        console.log(target);

        grunt.config('jshint.files', '<%= pkg.ramp.jsFolder %>/src/RAMP/' + target);
        grunt.config('watch.wjs.files', '<%= pkg.ramp.jsFolder %>/src/RAMP/' + target);
        grunt.config('jscs.main.files.src', '<%= pkg.ramp.jsFolder %>/src/RAMP/' + target);

        // update what the notify tell
        grunt.config('notify.hint.options.title', grunt.config('jshint.files').replace(/^.*[\\\/]/, ''));
    }

    if (output) {
        output = output === true ? 'jsHintOutput.txt' : output;

        if (grunt.file.exists(hintColorFile)) {
            grunt.file.delete(hintColorFile, {
                force: true
            });
        }
        grunt.config('jshint.options.reporterOutput', output);
    } else {
        grunt.file.write(hintColorFile, JSON.stringify(grunt.config('hintColors')), {
            force: true
        });
    }

    if (grunt.option('source')) {
        grunt.config('uglify.rampJsCore.options.sourceMap', true);
        grunt.config('uglify.rampJsCore.options.sourceMapIncludeSources', true);
    }

    // on watch events configure jshint:all to only run on changed file
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.files', filepath);
        grunt.config('jscs.main.files.src', filepath);

        // update what the notify tell
        grunt.config('notify.hint.options.title', filepath.replace(/^.*[\\\/]/, ''));
        grunt.config('notify.jscs.options.title', filepath.replace(/^.*[\\\/]/, ''));
    });

    //# !Register Options
};