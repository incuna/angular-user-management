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

}());
