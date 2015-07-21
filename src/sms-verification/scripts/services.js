(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-verification');

    module.factory('smsVerificationFactory', [
        '$http',
        'userManagementSmsVerificationConfig',
        function ($http, userManagementSmsVerificationConfig) {
            var apiRoot = userManagementSmsVerificationConfig.apiRoot();

            var verify =  {
                post: function (activationCode, phoneNumber) {
                    return $http({
                        method: 'POST',
                        url: apiRoot + userManagementSmsVerificationConfig.verificationEndpoint(),
                        data: {
                            phone_number: phoneNumber,
                            activation_code: activationCode
                        }
                    });
                },
                resend: function (phoneNumber) {
                    return $http({
                        method: 'POST',
                        url: apiRoot + userManagementSmsVerificationConfig.verificationResendEndpoint(),
                        data: {
                            phone_number: phoneNumber
                        }
                    });
                }
            };

            return {
                verify: verify
            };
        }
    ]);

}(window.angular));
