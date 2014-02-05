(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/register/', {
                templateUrl: 'templates/registration/register.html',
                controller: 'RegisterCtrl',
                anonymous: true,
                title: 'Register'
            })
            .when('/register/verify/:token*\/', {
                templateUrl: 'templates/registration/verify.html',
                controller: 'VerifyCtrl',
                anonymous: true
            })
            .when('/password-reset/', {
                templateUrl: 'templates/registration/password_reset_request.html',
                controller: 'PasswordResetRequestCtrl',
                anonymous: true,
                title: 'Reset your password'
            })
            .when('/password-change/:token*\/', {
                templateUrl: 'templates/registration/password_change.html',
                controller: 'PasswordChangeCtrl',
                anonymous: true,
                title: 'Set a new password'
            })
            .when('/profile/', {
                templateUrl: 'templates/registration/profile.html',
                controller: 'ProfileCtrl',
                title: 'My profile'
            });
    }]);
}());
