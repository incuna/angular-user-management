(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-verification');

    module.factory('smsVerificationFactory', [
        '$http',
        'userManagementSmsVerificationConfig',
        function ($http, userManagementSmsVerificationConfig) {
            var apiRoot = userManagementSmsVerificationConfig.apiRoot();

            var verify =  {
                post: function (data) {
                    return $http({
                        method: 'POST',
                        url: apiRoot + userManagementSmsVerificationConfig.verificationEndpoint(),
                        data: data
                    });
                },
                resend: function (data) {
                    return $http({
                        method: 'POST',
                        url: apiRoot + userManagementSmsVerificationConfig.verificationResendEndpoint(),
                        data: data
                    });
                }
            };

            return {
                verify: verify
            };
        }
    ]);

}(window.angular));
