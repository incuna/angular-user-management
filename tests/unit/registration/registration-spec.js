/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('registration');

    helpers.testErrorsOnDirectiveLinking('registration', {
        factory: {
            name: 'registrationFactory',
            methods: [
                {
                    name: 'register',
                    requiredSubMethodsNames: ['options', 'post']
                }
            ]
        },
        directives: [
            {
                name: 'registerForm',
                attribute: 'register-form'
            }
        ]
    });

}());
