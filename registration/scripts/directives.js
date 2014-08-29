(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.directive('profileForm', ['$rootScope', '$http', 'user', 'gettextCatalog', function ($rootScope, $http, user, gettextCatalog) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'templates/registration/profile_form.html',
            link: function (scope, element, attrs) {
                var form = scope['profile'];

                scope.editUser = {};

                user.options()
                    .then(function (response) {
                        scope.fields = response.data.actions.PUT;
                    });

                $rootScope.$watch('user', function () {
                    scope.editUser = angular.extend(scope.editUser, $rootScope.user);
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
                                    msg: gettextCatalog.getString('You have successfully updated your profile.'),
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
