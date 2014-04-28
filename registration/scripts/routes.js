(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.config(['$routeProvider', 'gettext', function ($routeProvider, gettext) {
        $routeProvider
            .when('/register/', {
                templateUrl: 'templates/registration/register.html',
                controller: 'RegisterCtrl',
                title: gettext('Register')
            })
            .when('/register/verify/:token*\/', {
                templateUrl: 'templates/registration/verify.html',
                controller: 'RegisterVerifyCtrl'
            })
            .when('/password-reset/', {
                templateUrl: 'templates/registration/password_reset_request.html',
                controller: 'PasswordResetRequestCtrl',
                title: 'Reset your password'
            })
            .when('/password-change/:token*\/', {
                templateUrl: 'templates/registration/password_change.html',
                controller: 'PasswordChangeCtrl',
                title: gettext('Set a new password')
            })
            .when('/profile/', {
                templateUrl: 'templates/registration/profile.html',
                controller: 'ProfileCtrl',
                anonymous: false,
                title: gettext('My profile')
            });
    }]);
}());
