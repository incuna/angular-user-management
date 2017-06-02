/* jshint es3: false, esnext: true */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    var helpers = window._helpers = window._helpers || {};

    helpers.testErrorsOnDirectiveLinking = function (moduleName, options) {

        'use strict';

        if (!options) {
            throw new Error('options required');
        }

        if (!options.directives) {
            throw new Error('directives option required');
        }
        if (!options.factory) {
            throw new Error('factory options required');
        }

        var factoryName = options.factory.name;
        var factoryMethods = options.factory.methods;


        describe(moduleName + ': getting fields from OPTIONS request', function () {

            beforeEach(function () {

                module('user_management.' + moduleName);

                var thisFactoryMock = this.factoryMock = {};
                factoryMethods.forEach(function (method) {
                    thisFactoryMock[method.name] = jasmine.createSpyObj(method.name, method.requiredSubMethodsNames);
                });

                var mocks = {};
                mocks[factoryName] = this.factoryMock;
                module(mocks);

                inject(function ($q, $compile, $rootScope) {
                    this.$q = $q;
                    this.$compile = $compile;
                    this.$rootScope = $rootScope;
                });

                this.setResponse = function (response) {
                    var $q = this.$q;
                    var thisFactoryMock = this.factoryMock;
                    factoryMethods.forEach(function (method) {
                        method.requiredSubMethodsNames.forEach(function (subMethodName) {
                            thisFactoryMock[method.name][subMethodName].and.returnValue($q.when(response));
                        });
                    });
                };

                this.withActions = function () {
                    this.setResponse({
                        data: {
                            actions: {}
                        }
                    });
                };
                this.withoutActions = function () {
                    this.setResponse({
                        data: {}
                    });
                };

                this.linkDirectiveFn = function (attribute) {
                    var $compile = this.$compile;
                    var $rootScope = this.$rootScope;
                    return function () {
                        $compile('<div ' + attribute + '></div>')($rootScope);
                        $rootScope.$apply();
                    };
                };

            });

            options.directives.forEach(function (directive) {

                if (!directive) {
                    throw new Error('directive must be defined');
                }
                if (!directive.name) {
                    throw new Error('directive requires name: ' + JSON.stringify(directive));
                }
                if (!directive.attribute) {
                    throw new Error('directive requires attribute: ' + JSON.stringify(directive));
                }

                describe('in ' + directive.name + ' directive', function () {

                    describe('without actions', function () {

                        it('should not error on link', function () {
                            this.withoutActions();
                            expect(this.linkDirectiveFn(directive.attribute)).not.toThrow();
                        });

                    });

                    describe('with actions', function () {

                        it('should not error on link', function () {
                            this.withActions();
                            expect(this.linkDirectiveFn(directive.attribute)).not.toThrow();
                        });

                    });

                });

            });

        });

    };

}());
