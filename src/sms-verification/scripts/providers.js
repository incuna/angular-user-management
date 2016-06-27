(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-verification');

    module.provider('userManagementSmsVerificationConfig', function () {
        var apiRoot = '';
        var verificationEndpoint = '/activation-code';
        var verificationResendEndpoint = '/resend-confirmation-sms';

        return {
            $get: function () {
                return {
                    apiRoot: function () {
                        return apiRoot;
                    },
                    verificationEndpoint: function () {
                        return verificationEndpoint;
                    },
                    verificationResendEndpoint: function () {
                        return verificationResendEndpoint;
                    }
                };
            },
            setApiRoot: function (value) {
                apiRoot = value;
            },
            setVerificationEndpoint: function (value) {
                verificationEndpoint = value;
            },
            setVerificationResendEndpoint: function (value) {
                verificationResendEndpoint = value;
            }
        };
    });

}(window.angular));
