(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.directive('registerForm', [
        'registrationFactory',
        function (registrationFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/registration/register_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};

                    var optionsPromise = registrationFactory.register.options();
                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.POST;
                        });

                    scope.register = function () {
                        optionsPromise
                            .then(function () {
                                scope.loading = true;
                                scope.registered = false;

                                scope.successData = undefined;
                                scope.errorData = undefined;

                                // Clear all errors on the fields object.
                                angular.forEach(scope.fields, function(value, key){
                                    value.errors = '';
                                });

                                registrationFactory
                                    .register.post(scope.data)
                                    .then(function (response) {
                                        scope.data = {};
                                        scope.registered = true;
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
