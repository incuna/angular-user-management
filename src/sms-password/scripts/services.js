(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-password');

    module.factory('smsPasswordFactory', [
        '$http',
        'userManagementSmsPasswordConfig',
        function ($http, userManagementSmsPasswordConfig) {
            var apiRoot = userManagementSmsPasswordConfig.apiRoot();

            var resetRequest = {
                url: apiRoot + userManagementSmsPasswordConfig.resetRequestEndpoint(),
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
                url: apiRoot + userManagementSmsPasswordConfig.changeEndpoint(),
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: change.url
                    });
                },
                put: function (data) {
                    return $http({
                        method: 'POST',
                        url: change.url,
                        data: data
                    });
                }
            };

            return {
                resetRequest: resetRequest,
                change: change
            };
        }
    ]);

}(window.angular));
