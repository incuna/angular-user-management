(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.directive('registerForm', [
        '$parse',
        'registrationFactory',
        'catchErrors',
        function ($parse, registrationFactory, catchErrors) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/registration/register_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};

                    // Bind on-success attribute to success callback
                    // scope: { onRegister: '&' }
                    if (angular.isDefined(attrs.onRegister)) {
                        var parentGet = $parse(attrs.onRegister);
                        if (parentGet !== angular.noop) {
                            scope.onRegister = function(locals) {
                                return parentGet(scope.$parent, locals);
                            };
                        }
                    }

                    var optionsPromise = registrationFactory.register.options();
                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.POST;
                        });

                    scope.register = function () {
                        if (!scope.loading) {
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
                                    scope.errors = {};

                                    registrationFactory
                                        .register.post(scope.data)
                                        .then(function (response) {
                                            scope.registered = true;
                                            if (angular.isDefined(scope.onRegister)) {
                                                scope.onRegister({user: angular.copy(scope.data)});
                                            }
                                            scope.data = {};
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

}(window.angular));
