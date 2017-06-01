/* eslint strict: off */

'use strict';

var _ = require('lodash');

module.exports = function (grunt) {

    var moduleNames = [
        'password',
        'profile',
        'registration',
        'sms-password',
        'sms-verification',
        'verification'
    ];

    var setupFiles = [
        '<%= config.lib %>/angular/angular.js',
        '<%= config.lib %>/angular-mocks/angular-mocks.js',
        '<%= config.lib %>/angular-route/angular-route.js',
        '<%= config.lib %>/angular-bootstrap/ui-bootstrap-tpls.js',

        '<%= config.files.karmaHelpers %>',
        '<%= config.files.karmaMocks %>'
    ];
    var allTestFiles = [
        '<%= config.files.karmaTests %>'
    ];

    var makeGruntKarmaFiles = function (moduleFiles, specificTestFiles) {
        var arrayOfSrcFiles = [].concat(setupFiles, moduleFiles, specificTestFiles || allTestFiles);
        return [
            {
                src: arrayOfSrcFiles
            }
        ];
    };

    var ciOptions = {
        singleRun: true,
        reporters: ['dots', 'coverage'],
        browsers: ['Firefox'],
        logLevel: 'DEBUG'
    };

    var allModuleFiles = [];
    var individualModuleTargets = {};
    moduleNames.forEach(function (moduleName) {
        var individualModuleFiles = [
            '<%= config.dist %>/' + moduleName + '/' + moduleName + '.js',
            '<%= config.dist %>/' + moduleName + '/templates.js'
        ];
        var individualTestFiles = [
            '<%= config.tests %>/unit/' + moduleName + '/**/*.js'
        ];
        allModuleFiles = allModuleFiles.concat(individualModuleFiles);
        individualModuleTargets[moduleName] = {
            options: ciOptions,
            files: makeGruntKarmaFiles(individualModuleFiles, individualTestFiles)
        };
    });

    var allKarmaFiles = makeGruntKarmaFiles(allModuleFiles);

    grunt.config.merge({
        karma: {
            options: {
                basePath: '',
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
                logLevel: 'INFO'
            },
            dev: {
                options: {
                    browsers: ['Firefox'],
                    autoWatch: true
                },
                files: allKarmaFiles
            },
            ci: {
                options: ciOptions,
                files: allKarmaFiles
            }
        }
    });

    grunt.config.merge({
        karma: individualModuleTargets
    });

    grunt.registerTask('test-module-isolation', function () {
        var targets = _.keys(individualModuleTargets);
        var tasks = _.map(targets, function (target) {
            return 'karma:' + target;
        });
        grunt.task.run(tasks);
    });

};
