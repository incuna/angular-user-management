(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.directive('passwordResetRequestForm', ['$rootScope', '$http', '$location', 'REGISTRATION', 'PROJECT_SETTINGS', function ($rootScope, $http, $location, REGISTRATION, PROJECT_SETTINGS) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'templates/registration/password_reset_request_form.html',
            link: function (scope, element, attrs) {
                var form = scope['password-reset-request'];

                var MODULE_SETTINGS = angular.extend({}, REGISTRATION, PROJECT_SETTINGS.REGISTRATION);

                scope.fields = {
                    email: {}
                };
                scope.data = {};

                scope.resetPassword = function (deferred) {
                    if (!form.$pristine) {
                        angular.forEach(scope.fields, function(value, key){
                            value.errors = '';
                        });

                        $http({
                            method: 'POST',
                            url: PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PASSWORD_RESET_REQUEST_ENDPOINT,
                            data: scope.data
                        }).then(function () {
                            var email = scope.data.email;
                            scope.data = {};
                            // TODO: this should come from the API.
                            $rootScope.app.page.messages = [{
                                msg: 'We\'ve sent an email to ' + email + ' that contains a link to reset your password.',
                                type: 'success'
                            }];

                            form.$setPristine();

                            if (angular.isDefined(deferred)) {
                                deferred.notify('resolve', response);
                            }
                        }, function (response) {
                            angular.forEach(response.data, function (error, field) {
                                scope.fields[field].errors = error[0];
                            });

                            if (angular.isDefined(deferred)) {
                                deferred.notify('reject', response);
                            }
                        });
                    }
                };
            }
        };
    }]);

    registration.directive('passwordChangeForm', ['$rootScope', '$http', '$route', '$location', '$filter', 'REGISTRATION', 'PROJECT_SETTINGS', function ($rootScope, $http, $route, $location, $filter, REGISTRATION, PROJECT_SETTINGS) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'templates/registration/password_change_form.html',
            link: function (scope, element, attrs) {
                var form = scope['password-change'];

                var MODULE_SETTINGS = angular.extend({}, REGISTRATION, PROJECT_SETTINGS.REGISTRATION);
                var TOKEN = $route.current.pathParams.token;
                var URL = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PASSWORD_CHANGE_ENDPOINT + TOKEN + '/';
                if (attrs.changeMethod === 'update') {
                    URL = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PASSWORD_UPDATE_ENDPOINT;
                }

                scope.data = {};

                $http({
                    method: 'OPTIONS',
                    url: URL
                }).then(function (response) {
                    scope.fields = response.data.actions.PUT;
                }, function (response) {
                    if (response.status === 500) {
                        if (attrs.changeMethod !== 'update') {
                            var resetPath = $filter('reverseUrl')('PasswordResetRequestCtrl');
                            if (resetPath.substring(0, 1) === '#') {
                                resetPath = resetPath.substring(1);
                            }

                            $rootScope.nextRouteMessages = [{
                                msg: 'There was a problem with your verification token. Please try again.'
                            }];

                            $location.path(resetPath);
                        }
                    }
                });

                scope.changePassword = function (deferred) {
                    if (!form.$pristine) {
                        angular.forEach(scope.fields, function(value, key){
                            value.errors = '';
                        });

                        $http({
                            method: 'PUT',
                            url: URL,
                            data: scope.data
                        }).then(function (response) {
                            scope.data = {};

                            if (attrs.changeMethod === 'update') {
                                $rootScope.app.page.messages = [{
                                    msg: 'You have successfully changed your password.',
                                    type: 'success'
                                }];
                            } else {
                                // When setting $location.path() the string cannot
                                // start with a '#'
                                var loginPath = $filter('reverseUrl')('LoginCtrl');
                                if (loginPath.substring(0, 1) === '#') {
                                    loginPath = loginPath.substring(1);
                                }

                                $rootScope.nextRouteMessages = [{
                                    msg: 'You have successfully reset your password. You may now log in below.',
                                    type: 'success'
                                }];

                                $location.path(loginPath);
                            }

                            form.$setPristine();

                            if (angular.isDefined(deferred)) {
                                deferred.notify('resolve', response);
                            }
                        }, function (response) {
                            angular.forEach(response.data, function (error, field) {
                                scope.fields[field].errors = error[0];
                            });

                            if (angular.isDefined(deferred)) {
                                deferred.notify('reject', response);
                            }
                        });
                    }
                };
            }
        };
    }]);

    registration.directive('profileForm', ['$rootScope', '$http', 'user', function ($rootScope, $http, user) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'templates/registration/profile_form.html',
            link: function (scope, element, attrs) {
                var form = scope['profile'];

                user.options()
                    .then(function (response) {
                        scope.fields = response.data.actions.PUT;
                    });

                $rootScope.$watch('user', function () {
                    scope.editUser = angular.copy($rootScope.user);
                });

                scope.editProfile = function (deferred) {
                    if (!form.$pristine) {
                        angular.forEach(scope.fields, function(value, key){
                            value.errors = '';
                        });

                        user.set(scope.editUser)
                            .then(function (response) {
                                $rootScope.user = response.data;

                                $rootScope.app.page.messages = [{
                                    msg: 'You have successfully updated your profile.',
                                    type: 'success'
                                }];

                                form.$setPristine();

                                if (angular.isDefined(deferred)) {
                                    deferred.notify('resolve', response);
                                }
                            }, function (response) {
                                angular.forEach(response.data, function (error, field) {
                                    scope.fields[field].errors = error[0];
                                });

                                if (angular.isDefined(deferred)) {
                                    deferred.notify('reject', response);
                                }
                            });
                    }
                };
            }
        };
    }]);

    registration.directive('registerForm', ['$rootScope', '$http', '$location', '$filter', 'REGISTRATION', 'PROJECT_SETTINGS', function ($rootScope, $http, $location, $filter, REGISTRATION, PROJECT_SETTINGS) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'templates/registration/register_form.html',
            link: function (scope, element, attrs) {
                var form = scope.register;

                var MODULE_SETTINGS = angular.extend({}, REGISTRATION, PROJECT_SETTINGS.REGISTRATION);

                scope.user = {};

                $http({
                    method: 'OPTIONS',
                    url: PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.REGISTER_ENDPOINT
                }).then(function (response) {
                    scope.fields = response.data.actions.POST;
                });

                scope.register = function (deferred) {
                    if (!form.$pristine) {
                        angular.forEach(scope.fields, function(value, key){
                            value.errors = '';
                        });

                        $http({
                            method: 'POST',
                            url: PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.REGISTER_ENDPOINT,
                            data: scope.user
                        }).then(function (response) {
                            if(response.status === 201) {
                                // When setting $location.path() the string cannot
                                // start with a '#'
                                var loginPath = $filter('reverseUrl')('LoginCtrl');
                                if(loginPath.substring(0, 1) === '#') {
                                    loginPath = loginPath.substring(1);
                                }

                                $rootScope.nextRouteMessages = [{
                                    msg: response.data.data,
                                    type: 'success'
                                }];

                                $location.path(loginPath);
                            }

                            if (angular.isDefined(deferred)) {
                                deferred.notify('resolve', response);
                            }
                        }, function (response) {
                            angular.forEach(response.data, function (error, field) {
                                scope.fields[field].errors = error[0];
                            });

                            if (angular.isDefined(deferred)) {
                                deferred.notify('reject', response);
                            }
                        });
                    }
                };
            }
        };
    }]);
}());
