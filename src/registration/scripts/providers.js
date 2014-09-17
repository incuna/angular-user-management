(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.provider('userManagementRegistrationConfig', function () {
        var apiRoot = '';
        var registrationEndpoint = '/register';

        return {
            $get: function () {
                return {
                    apiRoot: function () {
                        return apiRoot;
                    },
                    registrationEndpoint: function () {
                        return registrationEndpoint;
                    }
                };
            },
            setApiRoot: function (value) {
                apiRoot = value;
            },
            setRegistrationEndpoint: function (value) {
                registrationEndpoint = value;
            }
        };
    });

}(window.angular));
