(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.service('user', ['$http', '$q', 'REGISTRATION', 'PROJECT_SETTINGS', function ($http, $q, REGISTRATION, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, REGISTRATION, PROJECT_SETTINGS.REGISTRATION);
        var PROFILE_URL = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PROFILE_ENDPOINT;

        var user = {
            options: function () {
                var deferred = $q.defer();
                $http({
                    method: 'OPTIONS',
                    url: PROFILE_URL
                }).then(function (response) {
                    deferred.resolve(response);
                });

                return deferred.promise;
            },
            // As this service is not instantiated before the user is
            // authenticated, the default headers may not have been updated
            // to include the auth token.
            get: function (token) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: PROFILE_URL,
                    headers: {
                        Authorization: 'Token ' + token
                    }
                }).then(function (response) {
                    deferred.resolve(response);
                });

                return deferred.promise;
            },
            set: function (data) {
                var deferred = $q.defer();

                $http({
                    method: 'PATCH',
                    url: PROFILE_URL,
                    data: data
                }).then(function (response) {
                    deferred.resolve(response);
                });

                return deferred.promise;
            }
        };

        return user;
    }]);
}());
