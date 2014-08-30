(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.factory('verificationFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    VERIFICATION_ENDPOINT: '/verify_email'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.VERIFICATION
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var verify =  {
                post: function (token) {
                    return $http({
                        method: 'POST',
                        url: API_ROOT + MODULE_SETTINGS.VERIFICATION_ENDPOINT + '/' + token,
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


