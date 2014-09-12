(function (angular) {
    'use strict';

    var module = angular.module('user_management.password', [
        'ngRoute',
        'project_settings'
    ]);

}(window.angular));

(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/password-reset/', {
                    templateUrl: 'templates/user_management/password/reset_request.html',
                    controller: 'PasswordResetRequestCtrl'
                })
                .when('/password-change/:token*\/', {
                    templateUrl: 'templates/user_management/password/change.html',
                    controller: 'PasswordChangeCtrl'
                });
        }
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.factory('passwordFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    RESET_REQUEST_ENDPOINT: '/auth/password_reset',
                    CHANGE_ENDPOINT: '/auth/password_reset/confirm',
                    UPDATE_ENDPOINT: '/profile/password'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.PASSWORD
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var resetRequest = {
                url: API_ROOT + MODULE_SETTINGS.RESET_REQUEST_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: resetRequest.url
                    });
                },
                post: function (data) {
                    return $http({
                        method: 'POST',
                        url: resetRequest.url,
                        data: data
                    });
                }
            };

            var change = {
                url: API_ROOT + MODULE_SETTINGS.CHANGE_ENDPOINT,
                options: function (token) {
                    return $http({
                        method: 'OPTIONS',
                        url: change.url + '/' + token
                    });
                },
                put: function (data, token) {
                    return $http({
                        method: 'PUT',
                        url: change.url + '/' + token,
                        data: data
                    });
                }
            };

            var update = {
                url: API_ROOT + MODULE_SETTINGS.UPDATE_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: update.url
                    });
                },
                put: function (data) {
                    return $http({
                        method: 'PUT',
                        url: update.url,
                        data: data
                    });
                }
            };

            return {
                resetRequest: resetRequest,
                change: change,
                update: update
            };
        }
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.password');

    module.controller('PasswordResetCtrl' [function () {}]);

    module.controller('PasswordChangeCtrl' [function () {}]);

}(window.angular));



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
                link: function (scope, element, attrs) {
                    scope.data = {};

                    var optionsPromise = passwordFactory.resetRequest.options();
                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.POST;
                        });

                    scope.resetReqest = function () {
                        optionsPromise
                            .then(function () {
                                scope.loading = true;

                                // Clear all errors on the fields object.
                                angular.forEach(scope.fields, function(value, key){
                                    value.errors = '';
                                });

                                passwordFactory
                                    .resetRequest.post(scope.data)
                                    .then(function (response) {
                                        scope.email = scope.data.email;
                                        scope.data = {};
                                    }, function (response) {
                                        angular.forEach(response.data, function (error, field) {
                                            scope.fields[field].errors = error[0];
                                        });
                                    })
                                    ['finally'](function () {
                                        scope.loading = false;
                                    });
                            });
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
                link: function (scope, element, attrs) {
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
                            // If the response returns a 500 and we have a token.
                            if (response.status === 500 && angular.isDefined(TOKEN)) {
                                // There was a problem with the token.
                                scope.tokenError = true;
                            }
                        });

                    scope.changePassword = function () {
                        optionsPromise
                            .then(function () {
                                scope.loading = true;

                                // Clear all errors on the fields object.
                                angular.forEach(scope.fields, function(value, key){
                                    value.errors = '';
                                });

                                var promise;
                                if (angular.isDefined(TOKEN)) {
                                    promise = passwordFactory.change.put(scope.data, TOKEN)
                                        .then(function () {
                                            scope.updated = true;
                                        });
                                } else {
                                    promise = passwordFactory.update.put(scope.data)
                                        .then(function () {
                                            scope.changed = true;
                                        });
                                }

                                promise
                                    ['catch'](function (response) {
                                        angular.forEach(response.data, function (error, field) {
                                            scope.fields[field].errors = error[0];
                                        });
                                    })
                                    ['finally'](function () {
                                        scope.loading = true;
                                    });

                            });
                    };
                }
            };
        }
    ]);

}(window.angular));

