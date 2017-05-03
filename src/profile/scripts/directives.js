(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile-directives', []);

    module.directive('profileForm', [
        'profileFactory',
        function (profileFactory) {
            return {
                restrict: 'A',
                scope: {
                    profileOptions: '=',
                    profileFields: '='
                },
                templateUrl: 'templates/user_management/profile/profile_form.html',
                link: function (scope) {
                    scope.editProfile = function (scopeObject) {
                        // Use scopeObject (optional) to pass a reference to an object which is used in the page view, eg. to display the user name, so it can be updated without refreshing.
                        //
                        if (!scope.loading) {
                            profileFactory.profile.options()
                                .then(function () {
                                    scope.loading = true;
                                    scope.updated = false;

                                    scope.successData = undefined;
                                    scope.errorData = undefined;

                                    // Clear all errors on the fields object.
                                    angular.forEach(scope.profileOptions, function (value) {
                                        value.errors = '';
                                    });
                                    scope.errors = {};

                                    profileFactory
                                        .profile.patch(scope.profileFields)
                                        .then(function (response) {
                                            scope.profileFields = response.data;
                                            if (angular.isDefined(scopeObject)) {
                                                angular.forEach(response.data, function (value, key) {
                                                    scopeObject[key] = value;
                                                });
                                            }
                                            scope.updated = true;
                                            scope.successData = response.data;
                                        }, function (response) {
                                            scope.errorData = response.data;

                                            angular.forEach(response.data, function (error, field) {
                                                error = angular.isArray(error) ? error[0] : error;
                                                if (angular.isDefined(scope.profileOptions[field])) {
                                                    scope.profileOptions[field].errors = error;
                                                    console.log(scope.profileOptions[field].errors)
                                                }
                                                scope.errors[field] = error;
                                                console.log(scope.errors[field])
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

    module.directive('profileDelete', [
        'AccountFactory',
        function (AccountFactory) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope) {
                    scope.deleteProfile = function () {
                        AccountFactory.accountOperations.deleteAccount()
                    }
                }
            };
        }
    ]);

}(window.angular));
