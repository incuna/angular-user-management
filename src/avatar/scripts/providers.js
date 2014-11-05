(function (angular) {
    'use strict';

    var module = angular.module('user_management.avatar');

    module.provider('userManagementAvatarConfig', function () {
        var apiRoot = '';
        var avatarEndpoint = '/profile/avatar';
        var defaultAvatarPaths = {
            'default': '/avatars/avatar-default.png'
        };

        return {
            $get: function () {
                return {
                    apiRoot: function () {
                        return apiRoot;
                    },
                    avatarEndpoint: function () {
                        return avatarEndpoint;
                    },
                    defaultAvatarPaths: function () {
                        return defaultAvatarPaths;
                    }
                };
            },
            setApiRoot: function (value) {
                apiRoot = value;
            },
            setAvatarEndpoint: function (value) {
                avatarEndpoint = value;
            },
            setDefaultAvatarPaths: function (value) {
                defaultAvatarPaths = value;
            }
        };
    });

}(window.angular));
