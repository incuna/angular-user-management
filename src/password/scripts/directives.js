(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.directive('passwordResetRequestForm', [
        'passwordFactory',
        'catchErrors',
        function (passwordFactory, catchErrors) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/password/reset_request_form.html',
                link: function (scope, element, attrs) {
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
                                    angular.forEach(scope.fields, function(value, key){
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

                                            var errors = catchErrors.all(response, scope.fields);
                                            angular.merge(scope.errors, errors.nonFieldErrors);
                                            angular.merge(scope.fields, errors.fieldErrors);
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
        'catchErrors',
        function ($route, passwordFactory, catchErrors) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/password/change_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};
                    scope.errors = {};

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
                            if (angular.isDefined(TOKEN)) {
                                scope.tokenError = true;
                            }
                            if (response.status !== 404 && angular.isDefined(response.data)) {
                                var errors = catchErrors.all(response);
                                angular.merge(scope.errors, errors.nonFieldErrors);
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
                                    angular.forEach(scope.fields, function(value, key){
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


                                            var errors = catchErrors.all(response, scope.fields);
                                            angular.merge(scope.errors, errors.nonFieldErrors);
                                            angular.merge(scope.fields, errors.fieldErrors);

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

