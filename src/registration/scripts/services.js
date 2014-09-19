(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.factory('registrationFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    REGISTRATION_ENDPOINT: '/register'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.REGISTRATION
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var register = {
                url: API_ROOT + MODULE_SETTINGS.REGISTRATION_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: register.url
                    });
                },
                post: function (data) {
                    return $http({
                        method: 'POST',
                        url: register.url,
                        data: data
                    });
                }
            };

            return {
                register: register
            };
        }
    ]);

}(window.angular));


