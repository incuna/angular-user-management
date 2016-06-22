'use strict';

module.exports = function (grunt) {

    grunt.config.merge({
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

};
