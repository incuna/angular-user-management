(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.directive('registerForm', [
        '$parse',
        'registrationFactory',
        function ($parse, registrationFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/registration/register_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};

                    // Bind on-success attribute to success callback
                    // scope: { success: '&on-success' }
                    if (angular.isDefined(attrs.onSuccess)) {
                        var parentGet = $parse(attrs.onSuccess);
                        if (parentGet !== angular.noop) {
                            scope.success = function(locals) {
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
                                            scope.data = {};
                                            scope.registered = true;
                                            if (angular.isDefined(attrs.onSuccess)) {
                                                scope.success({user: response});
                                            }
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

}(window.angular));
