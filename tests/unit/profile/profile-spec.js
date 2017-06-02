/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('profile');

    helpers.testErrorsOnDirectiveLinking('profile', {
        factory: {
            name: 'profileFactory',
            methods: [
                {
                    name: 'profile',
                    requiredSubMethodsNames: ['options', 'get']
                }
            ]
        },
        directives: [
            {
                name: 'profileForm',
                attribute: 'profile-form'
            }
        ]
    });

}());
