(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-password');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/sms-password-reset/', {
                    templateUrl: 'templates/user_management/sms-password/reset.html',
                    controller: 'SmsPasswordResetCtrl',
                    anonymousOnly: true
                });
        }
    ]);

}(window.angular));
