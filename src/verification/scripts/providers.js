(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.provider('userManagementVerificationConfig', function () {
        var apiRoot = '';
        var verificationEndpoint = '/verify_email';
        var verificationResendEndpoint = '/resend-confirmation-email';

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

