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
                files: 'src/**/templates/**/*.html',
                tasks: 'ngtemplates'
            },
            js: {
                files: 'src/**/scripts/**/*.js',
                tasks: 'dist-js'
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
        }, uglifyConfig)
    });

    grunt.registerTask('dist-js', [
        'concat',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'dist-js',
        'ngtemplates'
    ]);

};
