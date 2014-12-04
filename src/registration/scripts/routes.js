(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/register/', {
                    templateUrl: 'templates/user_management/registration/register.html',
                    controller: 'RegistrationCtrl',
                    anonymousOnly: true
                });
        }
    ]);

}(window.angular));
