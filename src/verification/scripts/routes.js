(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/register/verify/:token*\/', {
                    templateUrl: 'templates/user_management/verification/verification.html',
                    controller: 'VerificationCtrl',
                    anonymousOnly: true
                });
        }
    ]);

}(window.angular));

