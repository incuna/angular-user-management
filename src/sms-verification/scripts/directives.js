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
                scope: true,
                templateUrl: 'templates/user_management/sms-verification/verify_form.html',
                link: function (scope, element, attrs) {

                    // 2-way bind data attribute to scope.
                    // scope: { data: '=' }
                    if (angular.isDefined(attrs.data)) {
                        // Set scope.data form attrs.data.
                        scope.$watch(attrs.data, function(data) {
                            scope.data = data;
                        });
                        // Set attrs.data from scope.data.
                        var parentAssign = $parse(attrs.data).assign;
                        scope.$watch('data', function(data) {
                            parentAssign(scope.$parent, data)
                        });
                    }

                    scope.verify = function () {
                        scope.verified = false;
                        smsVerificationFactory
                            .verify.post(scope.data.activation_code, scope.data.phone_number)
                            .then(function (response) {
                                scope.status = response.status;
                                scope.verified = true;
                            }, function (response) {
                                scope.status = response.status;
                                scope.errors = response.data;

                                if (response.status === 400 && response.data.detail === 'Invalid or expired code.') {
                                   scope.invalid = true;
                                }
                            });
                    };

                    scope.resend = function () {
                        scope.resent = false;
                        smsVerificationFactory
                            .verify.resend(scope.data.phone_number)
                            .then(function (response) {
                                scope.resent = true;
                                scope.status = response.status;
                            }, function (response) {
                                scope.errors = response.data;
                            });
                    }
                }
            };
        }
    ]);

})(window.angular)
