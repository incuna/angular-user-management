(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.config([
        '$routeProvider',
        function () {
            $routeProvider
                .when('/register/verify/:token*\/', {
                    templateUrl: 'templates/user_management/verification/verification.html',
                    controller: 'VerificationCtrl'
                });
        }
    ]);

}(window.angular));

