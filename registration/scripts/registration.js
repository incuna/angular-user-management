(function () {
    'use strict';

    var registration = angular.module('angular-registration', [
        'project_settings',
        'ngRoute',
        'angular-reverse-url',
        'gettext'
    ]);

    // Default settings. You can override these in your settings module.
    registration.constant('REGISTRATION', {
        REGISTER_ENDPOINT: '/register/',
        VERIFY_ENDPOINT: '/verify_email/',
        PROFILE_ENDPOINT: '/profile/',
    });
}());
