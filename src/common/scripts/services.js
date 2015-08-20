(function (angular) {
    'use strict';

    var module = angular.module('user_management.common');

    module.service('catchErrors', [
        function () {
            this.all = function (response, fields) {
                var fieldErrors = {};
                if (angular.isDefined(fields)) {
                    fieldErrors = angular.copy(fields);
                }
                var nonFieldErrors = {};

                angular.forEach(response.data, function (error, field) {
                    error = angular.isArray(error) ? error[0] : error;
                    if (angular.isDefined(fields) && angular.isDefined(fields[field])) {
                        fieldErrors[field].errors = error;
                    }
                    nonFieldErrors[field] = error;
                });

                return {
                    fieldErrors: fieldErrors,
                    nonFieldErrors: nonFieldErrors
                };
            };
        }
    ]);

}(window.angular));
