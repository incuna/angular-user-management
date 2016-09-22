(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.directive('passwordResetRequestForm', [
        'passwordFactory',
        function (passwordFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/password/reset_request_form.html',
                link: function (scope) {
                    scope.data = {};

                    var optionsPromise = passwordFactory.resetRequest.options();
                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.POST;
                        });

                    scope.resetRequest = function () {
                        if (!scope.loading) {
                            optionsPromise
                                .then(function () {
                                    scope.loading = true;
                                    scope.email = null;

                                    scope.successData = undefined;
                                    scope.errorData = undefined;

                                    // Clear all errors on the fields object.
                                    angular.forEach(scope.fields, function (value) {
                                        value.errors = '';
                                    });
                                    scope.errors = {};

                                    passwordFactory
                                        .resetRequest.post(scope.data)
                                        .then(function (response) {
                                            scope.email = scope.data.email;
                                            scope.data = {};
                                            scope.successData = response.data;
                                        }, function (response) {
                                            scope.errorData = response.data;

                                            angular.forEach(response.data, function (error, field) {
                                                error = angular.isArray(error) ? error[0] : error;
                                                if (angular.isDefined(scope.fields[field])) {
                                                    scope.fields[field].errors = error;
                                                }
                                                scope.errors[field] = error;
                                            });
                                        })
                                        ['finally'](function () {
                                            scope.loading = false;
                                        });
                                });
                        }
                    };
                }
            };
        }
    ]);

    module.directive('passwordChangeForm', [
        '$route',
        'passwordFactory',
        function ($route, passwordFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/password/change_form.html',
                link: function (scope) {
                    scope.data = {};

                    // If there is a URL fragment named `token` in the current route then
                    // we shall assume we are changing a forgotten password.
                    // If it does not exist, then we are updating a password.
                    var TOKEN = $route.current.pathParams.token;

                    var optionsPromise;
                    if (angular.isDefined(TOKEN)) {
                        optionsPromise = passwordFactory.change.options(TOKEN);
                    } else {
                        optionsPromise = passwordFactory.update.options();
                    }

                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.PUT;
                        }, function (response) {
                            // If the response returns a 404 and we have a token.
                            if (angular.isDefined(TOKEN)) {
                                // There was a problem with the token.
                                scope.tokenError = true;
                            }
                        });

                    scope.changePassword = function () {
                        if (!scope.loading) {
                            optionsPromise
                                .then(function () {
                                    scope.loading = true;
                                    scope.changed = false;
                                    scope.updated = false;

                                    scope.successData = undefined;
                                    scope.errorData = undefined;

                                    // Clear all errors on the fields object.
                                    angular.forEach(scope.fields, function (value) {
                                        value.errors = '';
                                    });
                                    scope.errors = {};

                                    var promise;
                                    if (angular.isDefined(TOKEN)) {
                                        promise = passwordFactory.change.put(scope.data, TOKEN)
                                            .then(function (response) {
                                                scope.data = {};
                                                scope.changed = true;
                                                scope.successData = response.data;
                                            });
                                    } else {
                                        promise = passwordFactory.update.put(scope.data)
                                            .then(function (response) {
                                                scope.data = {};
                                                scope.updated = true;
                                                scope.successData = response.data;
                                            });
                                    }

                                    promise
                                        ['catch'](function (response) {
                                            scope.errorData = response.data;

                                            angular.forEach(response.data, function (error, field) {
                                                error = angular.isArray(error) ? error[0] : error;
                                                if (angular.isDefined(scope.fields[field])) {
                                                    scope.fields[field].errors = error;
                                                }
                                                scope.errors[field] = error;
                                            });
                                        })
                                        ['finally'](function () {
                                            scope.loading = false;
                                        });

                                });
                        }
                    };
                }
            };
        }
    ]);

}(window.angular));
