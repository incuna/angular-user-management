(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.factory('profileFactory', [
        '$http',
        'userManagementProfileConfig',
        function ($http, userManagementProfileConfig) {
            var apiRoot = userManagementProfileConfig.apiRoot();

            var profile = {
                url: apiRoot + userManagementProfileConfig.profileEndpoint(),
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


