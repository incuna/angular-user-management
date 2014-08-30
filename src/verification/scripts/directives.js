(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.directive('verify', [
        '$route',
        'verificationFactory',
        function ($route, verificationFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/verification/verify.html',
                link: function (scope, element, attrs) {
                    var TOKEN = $route.current.pathParams.token;

                    verificationFactory
                        .verify.post(TOKEN)
                        .then(function (response) {
                            scope.status = response.status;
                        });
                }
            };
        }
    ]);

}(window.angular));


