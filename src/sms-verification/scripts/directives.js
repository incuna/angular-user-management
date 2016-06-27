(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-verification');

    module.directive('smsVerify', [
        '$parse',
        '$routeParams',
        'smsVerificationFactory',
        function ($parse, $routeParams, smsVerificationFactory) {
            return {
                restrict: 'A',
                scope: {
                    data: '=?smsVerify',
                    onVerify: '&',
                    onResend: '&'
                },
                templateUrl: 'templates/user_management/sms-verification/verify_form.html',
                link: function (scope, element, attrs) {
                    scope.verify = function () {
                        scope.verified = false;
                        scope.resent = false;
                        smsVerificationFactory
                            .verify.post(scope.data)
                            .then(function (response) {
                                scope.status = response.status;
                                scope.verified = true;
                                if (angular.isDefined(scope.onVerify)) {
                                    scope.onVerify({
                                        verifyData: angular.copy(scope.data)
                                    });
                                }
                            })
                            .catch(function (response) {
                                scope.status = response.status;
                                scope.errors = response.data;
                            });
                    };

                    scope.resend = function () {
                        scope.verified = false;
                        scope.resent = false;
                        smsVerificationFactory
                            .verify.resend(scope.data)
                            .then(function (response) {
                                scope.resent = true;
                                scope.status = response.status;
                                if (angular.isDefined(scope.onResend)) {
                                    scope.onResend({
                                        resendData: angular.copy(scope.data)
                                    });
                                }
                            })
                            .catch(function (response) {
                                scope.status = response.status;
                                scope.errors = response.data;
                            });
                    }
                }
            };
        }
    ]);

})(window.angular)
