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

                load: function (path) {
                    return $http({
                        method: 'GET',
                        url: path
                    });
                },

                getSized: function (opts) {
                    return $http({
                        method: 'GET',
                        url: opts.path,
                        params: {
                            width: opts.width,
                            height: opts.height
                        }
                    });
                }
            };

            return module;
        }
    ]);

}(window.angular));
