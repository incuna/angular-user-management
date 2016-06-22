/* jshint es3: false, esnext: true */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    var helpers = window._helpers = window._helpers || {};

    helpers.testModuleDependencies = function (moduleName) {

        'use strict';

        describe(moduleName + ' dependencies', function () {

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

        });

    };

}());
