/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('registration');

    describe('Registration: getting fields from OPTIONS request', function () {

        beforeEach(function () {

            this.registrationFactoryMock = {
                register: jasmine.createSpyObj('register', ['options', 'post'])
            };

            this.setResponse = function (response) {
                this.registrationFactoryMock.register.options.and.returnValue(this.$q.when(response));
                this.registrationFactoryMock.register.post.and.returnValue(this.$q.when(response));
            };

            this.responseWithoutActions = {
                data: {}
            };
            this.responseWithActions = {
                data: {
                    actions: {}
                }
            };

            module('user_management.registration');
            module({
                registrationFactory: this.registrationFactoryMock
            });

            inject(function ($q, $compile, $rootScope, registrationFactory) {
                this.$q = $q;
                this.$compile = $compile;
                this.$rootScope = $rootScope;
                this.registrationFactory = registrationFactory;
            });

            this.linkDirectiveFn = function (template) {
                return function () {
                    this.$compile('<div ' + template + '></div>')(this.$rootScope);
                    this.$rootScope.$apply();
                }.bind(this);
            };

        });

        describe('in registerForm directive', function () {

            describe('without actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithoutActions);
                    expect(this.linkDirectiveFn('register-form')).not.toThrow();
                });

            });

            describe('with actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithActions);
                    expect(this.linkDirectiveFn('register-form')).not.toThrow();
                });

            });

        });

    });

}());
