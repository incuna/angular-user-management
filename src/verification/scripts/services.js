(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.factory('verificationFactory', [
        '$http',
        'userManagementVerificationConfig',
        function ($http, userManagementVerificationConfig) {
            var apiRoot = userManagementVerificationConfig.apiRoot();

            var verify =  {
                post: function (token) {
                    return $http({
                        method: 'POST',
                        url: apiRoot + userManagementVerificationConfig.verificationEndpoint() + '/' + token,
                        data: {
                            token: token
                        }
                    });
                },
                resend: function (email) {
                    return $http({
                        method: 'POST',
                        url: apiRoot + userManagementVerificationConfig.verificationResendEndpoint(),
                        data: {
                            email: email
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
