(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/register/sms-verify/', {
                    templateUrl: 'templates/user_management/sms-verification/verify.html',
                    controller: 'SmsVerificationCtrl',
                    anonymousOnly: true
                });
        }
    ]);

}(window.angular));

