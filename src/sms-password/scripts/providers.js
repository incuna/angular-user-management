(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-password');

    module.provider('userManagementSmsPasswordConfig', function () {
        var apiRoot = '';
        var changeEndpoint = '/password-reset-sms/confirm';
        var resetRequestEndpoint = '/password-reset-sms';

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
            }
        };
    });

}(window.angular));

