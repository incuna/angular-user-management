(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.factory('registrationFactory', [
        '$http',
        'userManagementRegistrationConfig',
        function ($http, userManagementRegistrationConfig) {
            var apiRoot = userManagementRegistrationConfig.apiRoot();

            var register = {
                url: apiRoot + userManagementRegistrationConfig.registrationEndpoint(),
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
