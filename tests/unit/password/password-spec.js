/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('password');

    helpers.testErrorsOnDirectiveLinking('password', {
        factory: {
            name: 'passwordFactory',
            methods: [
                {
                    name: 'resetRequest',
                    requiredSubMethodsNames: ['options']
                },
                {
                    name: 'change',
                    requiredSubMethodsNames: ['options']
                },
                {
                    name: 'update',
                    requiredSubMethodsNames: ['options']
                }
            ]
        },
        directives: [
            {
                name: 'passwordResetRequestForm',
                attribute: 'password-reset-request-form'
            },
            {
                name: 'passwordChangeForm',
                attribute: 'password-change-form'
            }
        ]
    });

}());
