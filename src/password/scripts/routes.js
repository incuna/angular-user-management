(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/password-reset/', {
                    templateUrl: 'templates/user_management/password/reset_request.html',
                    controller: 'PasswordResetRequestCtrl'
                })
                .when('/password-change/:token*\/', {
                    templateUrl: 'templates/user_management/password/change.html',
                    controller: 'PasswordChangeCtrl'
                });
        }
    ]);

}(window.angular));

