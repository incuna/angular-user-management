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
                        data: {token: token}
                    });
                }
            };

            return {
                verify: verify
            };
        }
    ]);

}(window.angular));


