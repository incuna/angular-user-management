/* eslint no-unused-vars: off */
/* global jasmine, beforeEach, describe, it, expect, module, inject */

(function () {

    'use strict';

    var helpers = window._helpers;

    helpers.testModuleDependencies('profile');

    describe('Profile: getting fields from OPTIONS request', function () {

        beforeEach(function () {

            this.profileFactoryMock = {
                profile: jasmine.createSpyObj('profile', ['options', 'get'])
            };

            this.setResponse = function (response) {
                this.profileFactoryMock.profile.options.and.returnValue(this.$q.when(response));
                this.profileFactoryMock.profile.get.and.returnValue(this.$q.when(response));
            };

            this.responseWithoutActions = {
                data: {}
            };
            this.responseWithActions = {
                data: {
                    actions: {}
                }
            };

            module('user_management.profile');
            module({
                profileFactory: this.profileFactoryMock
            });

            inject(function ($q, $compile, $rootScope, profileFactory) {
                this.$q = $q;
                this.$compile = $compile;
                this.$rootScope = $rootScope;
                this.profileFactory = profileFactory;
            });

            this.linkDirectiveFn = function (template) {
                return function () {
                    this.$compile('<div ' + template + '></div>')(this.$rootScope);
                    this.$rootScope.$apply();
                }.bind(this);
            };

        });

        describe('in profileForm directive', function () {

            describe('without actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithoutActions);
                    expect(this.linkDirectiveFn('profile-form')).not.toThrow();
                });

            });

            describe('with actions', function () {

                it('should not error on link', function () {
                    this.setResponse(this.responseWithActions);
                    expect(this.linkDirectiveFn('profile-form')).not.toThrow();
                });

            });

        });

    });

}());
