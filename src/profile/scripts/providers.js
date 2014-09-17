(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.provider('userManagementProfileConfig', function () {
        var apiRoot = '';
        var profileEndpoint = '/profile';

        return {
            $get: function () {
                return {
                    apiRoot: function () {
                        return apiRoot;
                    },
                    profileEndpoint: function () {
                        return profileEndpoint;
                    }
                };
            },
            setApiRoot: function (value) {
                apiRoot = value;
            },
            setProfileEndpoint: function (value) {
                profileEndpoint = value;
            }
        };
    });

}(window.angular));
