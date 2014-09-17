(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.provider('userManagementPasswordConfig', function () {
        var apiRoot = '';
        var changeEndpoint = '/auth/password_reset/confirm';
        var resetRequestEndpoint = '/auth/password_reset';
        var updateEndpoint = '/profile/password';

        return {
            $get: function () {
                return {
                    apiRoot: function () {
                        return apiRoot;
                    },
                    changeEndpoint: function () {
                        return changeEndpoint;
                    },
                    resetRequestEndpoint: function () {
                        return resetRequestEndpoint;
                    },
                    updateEndpoint: function () {
                        return updateEndpoint;
                    }
                };
            },
            setApiRoot: function (value) {
                apiRoot = value;
            },
            setChangeEndpoint: function (value) {
                changeEndpoint = value;
            },
            setResetRequestEndpoint: function (value) {
                resetRequestEndpoint = value;
            },
            setUpdateEndpoint: function (value) {
                updateEndpoint = value;
            },
        };
    });

}(window.angular));
