module.exports = function(grunt) {
    'use strict';

    //display times
    require('time-grunt')(grunt);

    //load npm tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            options : {
                hostname: '<%=pkg.config.host%>',
                port:     '<%=pkg.config.port%>',
                base:     '.'
            },
            preview: {
                options: {
                    livereload : true
                }
            }
        },

        open: {
            test: {
                path: 'http://<%=pkg.config.host%>:<%=pkg.config.port%>/test/',
                app:  '<%=pkg.config.browser%>'
            }
        },

        browserify: {
            options: {
                transform: [
                    ['babelify', {
                        'presets' : ['es2015']
                    }],
                    ['hbsfy', {
                        'extensions': ['tpl']
                    }]
                ],
                browserifyOptions: {
                    debug: true
                }
            },
            components: {
                files: {
                    'dist/load.js': ['components/load/load.js']
                }
            },
            test: {
                files: {
                    'test/components/load/test.bundle.js': ['test/components/load/test.js']
                }
            }
        },

        exorcise: {
            options: {
                base: '.'
            },
            components: {
                files: {
                    'dist/load.js.map': ['dist/load.js']
                }
            },
            test: {
                files: {
                    'test/components/load/test.bundle.js.map': ['test/components/load/test.bundle.js']
                }
            }
        },

        uglify: {
            components: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapIn: 'dist/load.js.map'
                },
                files: {
                    'dist/load.min.js': ['dist/load.js']
                }
            }
        },

        watch: {
            components: {
                files: ['src/**/*.js'],
                tasks: ['compile-components']
            },
            test: {
                files: ['test/**/test.js'],
                tasks: ['compile-test'],
                options: {
                    livereload: true
                }
            }
        },

        concurrent: {
            devtest: {
                tasks: ['watch:components', 'watch:test'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    //Compilation tasks
    grunt.registerTask('compile-components', 'Compile sources', ['browserify:components', 'exorcise:components']);
    grunt.registerTask('compile-test', 'Compile tests', ['browserify:test', 'exorcise:test']);

    //build task
    grunt.registerTask('build', 'Build the project', ['browserify:components', 'exorcise:components', 'uglify:components']);

    //develop and run tests
    grunt.registerTask('devtest', 'Develop and preview tests', ['compile-components', 'compile-test', 'connect:preview', 'open:test', 'concurrent:devtest']);
};

