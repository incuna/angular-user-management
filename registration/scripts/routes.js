(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.config(['$routeProvider', 'gettextCatalog', function ($routeProvider, gettextCatalog) {
        $routeProvider
            .when('/register/', {
                templateUrl: 'templates/registration/register.html',
                controller: 'RegisterCtrl',
                title: gettextCatalog.getString('Register')
            })
            .when('/register/verify/:token*\/', {
                templateUrl: 'templates/registration/verify.html',
                controller: 'RegisterVerifyCtrl'
            })
            .when('/password-reset/', {
                templateUrl: 'templates/registration/password_reset_request.html',
                controller: 'PasswordResetRequestCtrl',
                title: gettextCatalog.getString('Reset your password')
            })
            .when('/password-change/:token*\/', {
                templateUrl: 'templates/registration/password_change.html',
                controller: 'PasswordChangeCtrl',
                title: gettextCatalog.getString('Set a new password')
            })
            .when('/profile/', {
                templateUrl: 'templates/registration/profile.html',
                controller: 'ProfileCtrl',
                anonymous: false,
                title: gettextCatalog.getString('My profile')
            });
    }]);
}());
