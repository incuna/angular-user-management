/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('sms-password');

    helpers.testErrorsOnDirectiveLinking('sms-password', {
        factory: {
            name: 'smsPasswordFactory',
            methods: [
                {
                    name: 'resetRequest',
                    requiredSubMethodsNames: ['options', 'post']
                },
                {
                    name: 'change',
                    requiredSubMethodsNames: ['options', 'post']
                }
            ]
        },
        directives: [
            {
                name: 'smsPasswordReset',
                attribute: 'sms-password-reset'
            }
        ]
    });

}());
