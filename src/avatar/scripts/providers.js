(function (angular) {
    'use strict';

    var module = angular.module('user_management.avatar');

    module.provider('userManagementAvatarConfig', function () {
        var apiRoot = '';
        var avatarEndpoint = '/profile/avatar';

        return {
            $get: function () {
                return {
                    apiRoot: function () {
                        return apiRoot;
                    },
                    avatarEndpoint: function () {
                        return avatarEndpoint;
                    }
                };
            },
            setApiRoot: function (value) {
                apiRoot = value;
            },
            setAvatarEndpoint: function (value) {
                avatarEndpoint = value;
            }
        };
    });

}(window.angular));
