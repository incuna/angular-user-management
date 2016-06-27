(function (angular) {
    'use strict';

    var module = angular.module('user_management.sms-password');

    module.directive('smsPasswordReset', [
        'smsPasswordFactory',
        function (smsPasswordFactory) {
            return {
                restrict: 'A',
                scope: {
                    data: '=?'
                },
                templateUrl: 'templates/user_management/sms-password/reset_form.html',
                link: function (scope, element, attrs) {
                    var beforeRequest = function () {
                        scope.loading = true;
                        scope.changed = false;
                        scope.requested = false;
                    };
                    var afterRequest = function () {
                        scope.loading = false;
                    }
                    var resetErrors = function () {
                        scope.successData = undefined;
                        scope.errorData = undefined;

                        // Clear all errors on the fields object.
                        angular.forEach(scope.fields, function (value, key) {
                            value.errors = '';
                        });
                        scope.errors = {};
                    };
                    var onError = function (response) {
                        scope.errorData = response.data;

                        angular.forEach(response.data, function (error, field) {
                            error = angular.isArray(error) ? error[0] : error;
                            if (angular.isDefined(scope.fields[field])) {
                                scope.fields[field].errors = error;
                            }
                            scope.errors[field] = error;
                        });
                    };

                    beforeRequest();
                    smsPasswordFactory.change.options()
                        .then(function (response) {
                            scope.fields = response.data.actions.POST;
                            scope.loading = false;
                        });

                    scope.resetRequest = function () {
                        if (!scope.loading) {
                            beforeRequest();
                            resetErrors();

                            smsPasswordFactory
                                .resetRequest.post(scope.data)
                                .then(function (response) {
                                    scope.requested = true;
                                    scope.successData = response.data;
                                })
                                ['catch'](onError)
                                ['finally'](afterRequest);
                        }
                    };

                    scope.changePassword = function () {
                        if (!scope.loading) {
                            beforeRequest();
                            resetErrors();

                            smsPasswordFactory.change.post(scope.data)
                                .then(function (response) {
                                    scope.data = {};
                                    scope.changed = true;
                                    scope.successData = response.data;
                                })
                                ['catch'](onError)
                                ['finally'](afterRequest);

                        }
                    };
                }
            };
        }
    ]);

}(window.angular));
