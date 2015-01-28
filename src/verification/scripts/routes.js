(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                // This route needs to be defined first otherwise it will match as a token.
                .when('/register/verify/resend/', {
                    templateUrl: 'templates/user_management/verification/verification_resend.html',
                    controller: 'VerificationResendCtrl',
                    anonymousOnly: true
                })
                .when('/register/verify/:token*\/', {
                    templateUrl: 'templates/user_management/verification/verification.html',
                    controller: 'VerificationCtrl',
                    anonymousOnly: true
                });
        }
    ]);

}(window.angular));

