(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-password');

    module.directive('smsPasswordResetRequestForm', [
        'smsPasswordFactory',
        function (smsPasswordFactory) {
            return {
                restrict: 'A',
                scope: {
                    data: '=?'
                },
                templateUrl: 'templates/user_management/sms-password/reset_request_form.html',
                link: function (scope, element, attrs) {
                    scope.loading = true;
                    scope.requested = false;
                    smsPasswordFactory.resetRequest.options()
                        .then(function (response) {
                            scope.loading = false;
                            scope.fields = response.data.actions.POST;
                        });

                    scope.resetRequest = function () {
                        if (!scope.loading) {
                            scope.loading = true;
                            scope.requested = false;

                            scope.successData = undefined;
                            scope.errorData = undefined;

                            // Clear all errors on the fields object.
                            angular.forEach(scope.fields, function(value, key){
                                value.errors = '';
                            });
                            scope.errors = {};

                            smsPasswordFactory
                                .resetRequest.post(scope.data)
                                .then(function (response) {
                                    scope.requested = true;
                                    scope.successData = response.data;
                                })
                                ['catch'](function (response) {
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
                        }
                    };
                }
            };
        }
    ]);

    module.directive('smsPasswordResetForm', [
        '$route',
        'smsPasswordFactory',
        function ($route, smsPasswordFactory) {
            return {
                restrict: 'A',
                scope: {
                    data: '=?'
                },
                templateUrl: 'templates/user_management/sms-password/reset_form.html',
                link: function (scope, element, attrs) {
                    scope.loading = true;
                    scope.changed = false;

                    smsPasswordFactory.change.options()
                        .then(function (response) {
                            scope.fields = response.data.actions.POST;
                            scope.loading = false;
                        });

                    scope.changePassword = function () {
                        if (!scope.loading) {
                            scope.loading = true;
                            scope.changed = false;

                            scope.successData = undefined;
                            scope.errorData = undefined;

                            // Clear all errors on the fields object.
                            angular.forEach(scope.fields, function(value, key){
                                value.errors = '';
                            });
                            scope.errors = {};

                            smsPasswordFactory.change.put(scope.data)
                                .then(function (response) {
                                    scope.data = {};
                                    scope.changed = true;
                                    scope.successData = response.data;
                                })
                                ['catch'](function (response) {
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

                        }
                    };
                }
            };
        }
    ]);

}(window.angular));


