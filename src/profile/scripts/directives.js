(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.directive('profileForm', [
        'profileFactory',
        function (profileFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/profile/profile_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};

                    profileFactory.profile.get()
                        .then(function (response) {
                            angular.extend(scope.data, response.data);
                        });

                    var optionsPromise = profileFactory.profile.options();
                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.PUT;
                        });

                    scope.editProfile = function () {
                        optionsPromise
                            .then(function () {
                                scope.loading = true;
                                scope.updated = false;

                                scope.successData = undefined;
                                scope.errorData = undefined;

                                // Clear all errors on the fields object.
                                angular.forEach(scope.fields, function(value, key){
                                    value.errors = '';
                                });

                                profileFactory
                                    .profile.patch(scope.data)
                                    .then(function (response) {
                                        scope.data = response.data;
                                        scope.updated = true;
                                        scope.successData = response.data;
                                    }, function (response) {
                                        scope.errorData = response.data;
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

}(window.angular));
