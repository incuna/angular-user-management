(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile-routes', ['ngRoute']);

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/profile/', {
                    templateUrl: 'templates/user_management/profile/profile.html',
                    controller: 'ProfileCtrl',
                    anonymous: false
                })
                .when('/delete-profile-confirmation/', {
                    templateUrl: 'templates/user_management/profile/delete-profile-confirmation.html',
                    controller: 'ProfileDeletedCtrl'
                });
        }
    ]);

}(window.angular));
