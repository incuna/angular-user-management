'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        config: {
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        },
        watch: {
            templates: {
                files: 'registration/templates/**/*.html',
                tasks: 'ngtemplates:app'
            }
        },
        ngtemplates: {
            options: {
                htmlmin: '<%= config.htmlmin %>',
            },
            app: {
                cwd: 'registration',
                src: 'templates/**/*.html',
                dest: 'registration/scripts/templates.js',
                options: {
                    module: 'angular-registration'
                }
            }
        }
    });

};
