(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.factory('profileFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    PROFILE_ENDPOINT: '/profile'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.PROFILE
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var profile = {
                url: API_ROOT + MODULE_SETTINGS.PROFILE_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: profile.url
                    });
                },
                get: function () {
                    return $http({
                        method: 'GET',
                        url: profile.url
                    });
                },
                patch: function (data) {
                    return $http({
                        method: 'PATCH',
                        url: profile.url,
                        data: data
                    });
                }
            };

            return {
                profile: profile
            };
        }
    ]);

}(window.angular));


