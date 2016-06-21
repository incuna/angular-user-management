/* jshint es3: false, esnext: true */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var moduleNames = [
        'password',
        'profile',
        'registration',
        'sms-password',
        'sms-verification',
        'verification'
    ];

    moduleNames.forEach(function (moduleName) {
        describe(moduleName, function () {

            beforeEach(function () {

                module('user_management.' + moduleName);

                this.runModule = function () {
                    inject(function ($rootScope, $route) {
                        this.$rootScope = $rootScope;
                        this.$route = $route;
                    });
                };

            });

            it('should load the module without error', function () {
                expect(function () {
                    this.runModule();
                }.bind(this)).not.toThrow();
            });

            it('should have routes', function () {
                this.runModule();
                expect(Object.keys(this.$route.routes)).not.toEqual([]);
            });

        });
    });

}());
