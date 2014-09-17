(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.provider('userManagementVerificationConfig', function () {
        var apiRoot = '';
        var verificationEndpoint = '/verify_email';

        return {
            $get: function () {
                return {
                    apiRoot: function () {
                        return apiRoot;
                    },
                    verificationEndpoint: function () {
                        return verificationEndpoint;
                    }
                };
            },
            setApiRoot: function (value) {
                apiRoot = value;
            },
            setVerificationEndpoint: function (value) {
                verificationEndpoint = value;
            }
        };
    });

}(window.angular));

