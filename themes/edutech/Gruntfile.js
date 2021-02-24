'use strict';

const sass = require('node-sass');

/*!
 * Starberry Gruntfile
 * Copyright 2015 Seth Warburton.
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

module.exports = function(grunt) {

// Time how long tasks take. Can help when optimizing build times
require('time-grunt')(grunt);

    // Configurable paths
    var config = {
    app: 'scss',
    dist: 'css'
    };

    //Initializing the configuration object
    grunt.initConfig({

        // Project settings
        config: config,

        // Add vendor prefixed styles. This should be kept inline with the settings
        // at https://github.com/twbs/bootstrap/blob/master/grunt/configBridge.json#L21
        autoprefixer: {
            options: {
                browsers: ['Android 2.3','Android >= 4','Chrome >= 20','Firefox >= 24','Explorer >= 8','iOS >= 6','Opera >= 12','Safari >= 6']
            },
            dist: {
                src: '<%= config.dist %>/style.css'
            }
        },

        // Reload browser when watched files are changed and provide a url for device testing
        browserSync: {
            dev: {
                bsFiles: {
                    src : '<%= config.dist %>/style.css'
                },
                options: {
                    watchTask: true,
                    files: [
                        '<%= config.dist %>/*.css'
                    ],
                    // Set this to match your localhost path and port for *your* environment
                    proxy: 'http://localhost/edutech'
                }
            }
        },

        // Empties output folders to start fresh
        clean: {
            dist: {
                files: [{
                dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*'
                    ]
                }]
            },
        },

        // Combine and copy JS, without minification, for development. Because JS
        // uglify is very slow in comparison we only uglify on build.
        concat: {
                options: {
                stripBanners: false
            },
            dev: {
                files: {
                    // '<%= config.dist %>/js/plugins.js': ['<%= config.app %>/js/plugins/*.js'],
                },
            },
        },

        // Check compiled CSS for bad-practices
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: ['<%= config.dist %>/style.css'],
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= config.dist %>/style.css': '<%= config.app %>/style.scss'
                }
            }
        },

        // Compress JS files for production
        uglify: {
            dist: {
                files: {
                    // '<%= config.dist %>/js/plugins.js': '<%= config.app %>/js/plugins/*.js'
                }
            }
        },

        // Watch files for changes and run tasks based on the changed files
        watch: {
            scss: {
              files: ['<%= config.app %>/**/*.scss'],
              tasks: ['sass']
            },
              gruntfile: {
              files: ['Gruntfile.js']
            }
        }
    });

    // Just-in-time plugin, for loading plugins…
    require('jit-grunt')(grunt);


    // Primary Task definition
    //grunt.registerTask('dev', ['styles','browserSync','watch']);
    grunt.registerTask('dev', ['styles','watch']);
    grunt.registerTask('dist', ['clean','styles','uglify']);

    // Sub-tasks, called by primary tasks, for better organisation.
    grunt.registerTask('images', ['imagemin','grunticon']);
    grunt.registerTask('styles', ['sass', 'autoprefixer']);
    grunt.registerTask('test', ['jshint','csslint']);
};
