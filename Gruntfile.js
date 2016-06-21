'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {

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

    grunt.initConfig({
        // Configurable paths
        config: {
            modules: 'src',
            dist: 'dist',
            lib: 'bower_components',
            tests: 'tests',
            files: {
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
                htmlmin: '<%= config.htmlmin %>',
            }
        }, ngtemplatesConfig),
        concat: _.extend({}, concatConfig),
        uglify: _.extend({
            options: {
                compress: {
                    drop_console: true
                }
            }
        }, uglifyConfig),
        karma: {
            options: {
                basePath: '',
                files: [
                    '<%= config.lib %>/angular/angular.js',
                    '<%= config.lib %>/angular-mocks/angular-mocks.js',
                    '<%= config.lib %>/angular-route/angular-route.js',
                    '<%= config.lib %>/angular-bootstrap/ui-bootstrap-tpls.js',

                    '<%= config.files.karmaMocks %>',

                    // Keep this order to closely match what apps would source.
                    '<%= config.dist %>/password/password.js',
                    '<%= config.dist %>/password/templates.js',
                    '<%= config.dist %>/profile/profile.js',
                    '<%= config.dist %>/profile/templates.js',
                    '<%= config.dist %>/registration/registration.js',
                    '<%= config.dist %>/registration/templates.js',
                    '<%= config.dist %>/sms-password/sms-password.js',
                    '<%= config.dist %>/sms-password/templates.js',
                    '<%= config.dist %>/sms-verification/sms-verification.js',
                    '<%= config.dist %>/sms-verification/templates.js',
                    '<%= config.dist %>/verification/verification.js',
                    '<%= config.dist %>/verification/templates.js',

                    '<%= config.files.karmaTests %>'
                ],
                exclude: [
                ],
                frameworks: ['jasmine'],
                plugins: [
                   'karma-jasmine',
                   'karma-firefox-launcher',
                   'karma-chrome-launcher',
                   'karma-coverage'
                ],
                preprocessors: {
                    '<%= config.files.distScriptsNoTemplates %>': 'coverage'
                },
                reporters: ['progress', 'coverage'],
                port: 9876,
                colors: true,
                browsers: ['Chrome', 'Firefox'],
                logLevel: 'DEBUG'
            },
            dev: {
                browsers: ['Chrome'],
                logLevel: 'INFO',
                autoWatch: true
            },
            ci: {
                singleRun: true,
                reporters: ['dots', 'coverage'],
                browsers: ['Firefox']
            }
        }
    });

    grunt.registerTask('dist', [
        'concat',
        'uglify',
        'ngtemplates'
    ]);

    grunt.registerTask('default', [
        'dist',
        'watch'
    ]);

    grunt.registerTask('test', [
        'dist',
        'karma:ci'
    ]);

};
