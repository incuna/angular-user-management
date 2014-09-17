(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.factory('passwordFactory', [
        '$http',
        'userManagementPasswordConfig',
        function ($http, userManagementPasswordConfig) {
            var apiRoot = userManagementPasswordConfig.apiRoot();

            var resetRequest = {
                url: apiRoot + userManagementPasswordConfig.resetRequestEndpoint(),
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
                url: apiRoot + userManagementPasswordConfig.changeEndpoint(),
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
                url: apiRoot + userManagementPasswordConfig.updateEndpoint(),
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

