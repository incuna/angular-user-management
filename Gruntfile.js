'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Get a list of modules
    var modules = fs.readdirSync('src');
    var templatesConfig = {};
    _.each(modules, function (module) {
        var modulePath = 'src/' + module;
        templatesConfig[module] = {
            cwd: modulePath,
            src: 'templates/user_management/**/*.html',
            dest: modulePath + '/scripts/templates.js',
            options: {
                module: 'user_management.' + module
            }
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
            }
        },
        ngtemplates: _.extend({
            options: {
                htmlmin: '<%= config.htmlmin %>',
            }
        }, templatesConfig)
    });

};
