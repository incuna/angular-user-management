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

                    scope.loading = true;
                    verificationFactory
                        .verify.post(TOKEN)
                        .then(function (response) {
                            scope.status = response.status;
                        }, function (response) {
                            scope.status = response.status;

                            if (response.status === 400 && response.data.detail === 'Invalid or expired token.') {
                                scope.invalid = true;
                            }
                        })
                        ['finally'](function () {
                            scope.loading = false;
                        });
                }
            };
        }
    ]);

    module.directive('verificationResend', [
        'verificationFactory',
        function (verificationFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/verification/verification_resend_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};

                    scope.resend = function () {
                        verificationFactory
                            .verify.resend(scope.data.email)
                            .then(function (response) {
                                scope.status = response.status;
                            }, function (response) {
                                scope.errors = response.data;
                            });
                    }
                }
            };
        }
    ]);

}(window.angular));
