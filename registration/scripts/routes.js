(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/register/', {
                templateUrl: 'templates/registration/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/register/verify/:token*\/', {
                templateUrl: 'templates/registration/verify.html',
                controller: 'RegisterVerifyCtrl'
            })
            .when('/password-reset/', {
                templateUrl: 'templates/registration/password_reset_request.html',
                controller: 'PasswordResetRequestCtrl'
            })
            .when('/password-change/:token*\/', {
                templateUrl: 'templates/registration/password_change.html',
                controller: 'PasswordChangeCtrl'
            })
            .when('/profile/', {
                templateUrl: 'templates/registration/profile.html',
                controller: 'ProfileCtrl',
                anonymous: false
            });
    }]);
}());
