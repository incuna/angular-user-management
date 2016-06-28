/* eslint camelcase: off */
(function () {
    'use strict';

    var fs = require('fs');
    var _ = require('lodash');

    module.exports = function (grunt) {

        grunt.initConfig({});

        require('time-grunt')(grunt);

        if (grunt.option('help')) {
            require('load-grunt-tasks')(grunt);
        } else {
            require('jit-grunt')(grunt, {
                ngtemplates: 'grunt-angular-templates'
            });
        }

        // Get a list of modules
        var modules = fs.readdirSync('src').filter(function (file) {
            return fs.statSync('src/' + file).isDirectory();
        });
        var concatConfig = {};
        var ngtemplatesConfig = {};
        var uglifyConfig = {};
        _.each(modules, function (module) {
            var modulePath = 'src/' + module;
            concatConfig[module] = {
                src: [
                    modulePath + '/scripts/init.js',
                    modulePath + '/scripts/providers.js',
                    modulePath + '/scripts/routes.js',
                    modulePath + '/scripts/services.js',
                    modulePath + '/scripts/controllers.js',
                    modulePath + '/scripts/directives.js'
                ],
                dest: 'dist/' + module + '/' + module + '.js'
            };

            ngtemplatesConfig[module] = {
                cwd: modulePath,
                src: 'templates/user_management/**/*.html',
                dest: 'dist/' + module + '/templates.js',
                options: {
                    module: 'user_management.' + module
                }
            };

            uglifyConfig[module] = {
                files: [{
                    expand: true,
                    cwd: 'dist/' + module,
                    src: '**/*.js',
                    dest: 'dist/' + module
                }]
            };
        });

        grunt.config.merge({
            // Configurable paths
            config: {
                modules: 'src',
                dist: 'dist',
                lib: 'bower_components',
                tests: 'tests',
                files: {
                    lint: [
                        'src/**/*.js',
                        '<%= config.files.karmaMocks %>',
                        '<%= config.files.karmaTests %>',
                        './grunt/**/*.js',
                        'Gruntfile.js'
                    ],
                    karmaHelpers: '<%= config.tests %>/helpers/**/*.js',
                    karmaMocks: '<%= config.tests %>/mocks/**/*.js',
                    karmaTests: '<%= config.tests %>/unit/**/*.js',
                    distScripts: '<%= config.dist %>/**/*.js',
                    distScriptsNoTemplates: '<%= config.dist %>/**/!(templates).js'
                },
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
            eslint: {
                all: {
                    options: {
                        config: '.eslintrc'
                    },
                    src: '<%= config.files.lint %>'
                }
            },
            jscs: {
                options: {
                    config: '.jscsrc'
                },
                src: '<%= config.files.lint %>'
            },
            watch: {
                templates: {
                    files: 'src/**/templates/**/*.html',
                    tasks: 'ngtemplates'
                },
                js: {
                    files: 'src/**/scripts/**/*.js',
                    tasks: 'dist'
                }
            },
            ngtemplates: _.extend({
                options: {
                    htmlmin: '<%= config.htmlmin %>'
                }
            }, ngtemplatesConfig),
            concat: _.extend({}, concatConfig),
            uglify: _.extend({
                options: {
                    compress: {
                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        drop_console: true
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                    }
                }
            }, uglifyConfig)
        });

        grunt.loadTasks('./grunt');

        grunt.registerTask('dist', [
            'concat',
            'uglify',
            'ngtemplates'
        ]);

        grunt.registerTask('default', [
            'dist',
            'watch'
        ]);

        grunt.registerTask('lint', 'Run the JS linters.', [
            'eslint',
            'jscs'
        ]);

        grunt.registerTask('test', [
            'lint',
            'dist',
            'test-module-isolation',
            'karma:ci'
        ]);

    };

}());
