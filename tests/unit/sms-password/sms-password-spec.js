/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('sms-password');

    describe('SMS-Password: getting fields from OPTIONS request', function () {

        beforeEach(function () {

            this.smsPasswordFactoryMock = {
                resetRequest: jasmine.createSpyObj('smsPassword', ['options', 'post']),
                change: jasmine.createSpyObj('smsPassword', ['options', 'post'])
            };

            this.setResponse = function (response) {
                this.smsPasswordFactoryMock.resetRequest.options.and.returnValue(this.$q.when(response));
                this.smsPasswordFactoryMock.resetRequest.post.and.returnValue(this.$q.when(response));
                this.smsPasswordFactoryMock.change.options.and.returnValue(this.$q.when(response));
                this.smsPasswordFactoryMock.change.post.and.returnValue(this.$q.when(response));
            };

            this.responseWithoutActions = {
                data: {}
            };
            this.responseWithActions = {
                data: {
                    actions: {}
                }
            };

            module('user_management.sms-password');
            module({
                smsPasswordFactory: this.smsPasswordFactoryMock
            });

            inject(function ($q, $compile, $rootScope, smsPasswordFactory) {
                this.$q = $q;
                this.$compile = $compile;
                this.$rootScope = $rootScope;
                this.smsPasswordFactory = smsPasswordFactory;
            });

            this.linkDirectiveFn = function (template) {
                return function () {
                    this.$compile('<div ' + template + '></div>')(this.$rootScope);
                    this.$rootScope.$apply();
                }.bind(this);
            };

        });

        describe('in smsPasswordReset directive', function () {

            describe('without actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithoutActions);
                    expect(this.linkDirectiveFn('sms-password-reset')).not.toThrow();
                });

            });

            describe('with actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithActions);
                    expect(this.linkDirectiveFn('sms-password-reset')).not.toThrow();
                });

            });

        });

    });

}());
