(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/register/', {
                templateUrl: 'templates/registration/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/profile/', {
                templateUrl: 'templates/registration/profile.html',
                controller: 'ProfileCtrl',
                anonymous: false
            });
    }]);
}());
