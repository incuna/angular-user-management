(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.directive('profileForm', [
        'profileFactory',
        'catchErrors',
        function (profileFactory, catchErrors) {
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

                    scope.editProfile = function (scopeObject) {
                        // Use scopeObject (optional) to pass a reference to an object which is used in the page view, eg. to display the user name, so it can be updated without refreshing.
                        //
                        if (!scope.loading) {
                            optionsPromise
                                .then(function () {
                                    scope.loading = true;
                                    scope.updated = false;

                                    scope.successData = undefined;
                                    scope.errorData = undefined;

                                    // Clear all errors on the fields object.
                                    angular.forEach(scope.fields, function (value, key) {
                                        value.errors = '';
                                    });
                                    scope.errors = {};

                                    profileFactory
                                        .profile.patch(scope.data)
                                        .then(function (response) {
                                            scope.data = response.data;
                                            if (angular.isDefined(scopeObject)) {
                                                angular.forEach(response.data, function (value, key) {
                                                    scopeObject[key] = value;
                                                });
                                            }
                                            scope.updated = true;
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

    module.directive('profileDelete', [
        'profileFactory', '$modal', '$location', '$filter',
        function (profileFactory, $modal, $location, $filter) {
            return {
                restrict: 'A',
                scope: true,

                link: function (scope, element, attrs) {

                    scope.deleteProfile = function () {
                        $modal.open({
                            templateUrl: 'templates/user_management/profile/delete-profile.html',
                            windowClass: 'delete-profile',
                            controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                                $scope.failed = false;

                                $scope.close = function () {
                                    $modalInstance.dismiss('close');
                                };
                                $scope.deleteProfile = function () {
                                    profileFactory.profile.deleteData().then(function () {
                                        $modalInstance.dismiss('close');
                                        $location.path($filter('reverseUrl')('ProfileDeletedCtrl').substring(1));
                                    },
                                    function () {
                                        $scope.failed = true;
                                    });
                                };
                            }]
                        });
                    };
                }
            };
        }
    ]);

}(window.angular));
