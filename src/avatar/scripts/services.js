(function (angular) {
    'use strict';

    var module = angular.module('user_management.avatar');

    module.factory('avatarFactory', [
        '$http',
        'userManagementAvatarConfig',
        function avatarFactory($http, userManagementAvatarConfig) {
            var apiRoot = userManagementAvatarConfig.apiRoot();

            var module = {
                url: apiRoot + userManagementAvatarConfig.avatarEndpoint(),

                load: function (options) {
                    options = angular.extend({}, {method: 'GET'}, options);
                    return $http(options);
                },

                clear: function (url) {
                    return $http.delete(url);
                }
            };

            return module;
        }
    ]);

}(window.angular));
