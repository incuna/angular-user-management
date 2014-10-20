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

                getSized: function (path, opts, completed) {
                    var promise = $http({
                        method: 'GET',
                        url: path,
                        params: {
                            width: opts.width,
                            height: opts.height
                        }
                    });

                    promise.then(function (item) {
                        completed(item.avatar);
                    }, function (response, error) {
                        completed();
                    });
                }
            };

            return module;
        }
    ]);

}(window.angular));
