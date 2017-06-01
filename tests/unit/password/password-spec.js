/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('password');

    describe('Password: getting fields from OPTIONS request', function () {

        beforeEach(function () {

            this.passwordFactoryMock = {
                resetRequest: jasmine.createSpyObj('resetRequest', ['options']),
                change: jasmine.createSpyObj('change', ['options']),
                update: jasmine.createSpyObj('update', ['options'])
            };

            this.setResponse = function (response) {
                this.passwordFactoryMock.resetRequest.options.and.returnValue(this.$q.when(response));
                this.passwordFactoryMock.change.options.and.returnValue(this.$q.when(response));
                this.passwordFactoryMock.update.options.and.returnValue(this.$q.when(response));
            };

            this.responseWithoutActions = {
                data: {}
            };
            this.responseWithActions = {
                data: {
                    actions: {}
                }
            };

            module('user_management.password');
            module({
                passwordFactory: this.passwordFactoryMock
            });

            inject(function ($q, $compile, $rootScope, passwordFactory) {
                this.$q = $q;
                this.$compile = $compile;
                this.$rootScope = $rootScope;
                this.passwordFactory = passwordFactory;
            });

            this.linkDirectiveFn = function (template) {
                return function () {
                    this.$compile('<div ' + template + '></div>')(this.$rootScope);
                    this.$rootScope.$apply();
                }.bind(this);
            };

        });

        describe('in passwordResetRequestForm directive', function () {

            describe('without actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithoutActions);
                    expect(this.linkDirectiveFn('password-reset-request-form')).not.toThrow();
                });

            });

            describe('with actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithActions);
                    expect(this.linkDirectiveFn('password-reset-request-form')).not.toThrow();
                });

            });

        });

        describe('in passwordChangeForm directive', function () {

            describe('without actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithoutActions);
                    expect(this.linkDirectiveFn('password-change-form')).not.toThrow();
                });

            });

            describe('with actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithActions);
                    expect(this.linkDirectiveFn('password-change-form')).not.toThrow();
                });

            });

        });

    });

}());
