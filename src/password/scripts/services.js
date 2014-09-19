(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.factory('passwordFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    RESET_REQUEST_ENDPOINT: '/auth/password_reset',
                    CHANGE_ENDPOINT: '/auth/password_reset/confirm',
                    UPDATE_ENDPOINT: '/profile/password'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.PASSWORD
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var resetRequest = {
                url: API_ROOT + MODULE_SETTINGS.RESET_REQUEST_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: resetRequest.url
                    });
                },
                post: function (data) {
                    return $http({
                        method: 'POST',
                        url: resetRequest.url,
                        data: data
                    });
                }
            };

            var change = {
                url: API_ROOT + MODULE_SETTINGS.CHANGE_ENDPOINT,
                options: function (token) {
                    return $http({
                        method: 'OPTIONS',
                        url: change.url + '/' + token
                    });
                },
                put: function (data, token) {
                    return $http({
                        method: 'PUT',
                        url: change.url + '/' + token,
                        data: data
                    });
                }
            };

            var update = {
                url: API_ROOT + MODULE_SETTINGS.UPDATE_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: update.url
                    });
                },
                put: function (data) {
                    return $http({
                        method: 'PUT',
                        url: update.url,
                        data: data
                    });
                }
            };

            return {
                resetRequest: resetRequest,
                change: change,
                update: update
            };
        }
    ]);

}(window.angular));

