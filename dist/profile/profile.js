(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile', [
        'ngRoute',
        'project_settings'
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/profile/', {
                    templateUrl: 'templates/user_management/profile/profile.html',
                    controller: 'ProfileCtrl',
                    anonymous: false
                });
        }
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.factory('profileFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    PROFILE_ENDPOINT: '/profile'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.PROFILE
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var profile = {
                url: API_ROOT + MODULE_SETTINGS.PROFILE_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: profile.url
                    });
                },
                get: function () {
                    return $http({
                        method: 'GET',
                        url: profile.url
                    });
                },
                patch: function (data) {
                    return $http({
                        method: 'PATCH',
                        url: profile.url,
                        data: data
                    });
                }
            };

            return {
                profile: profile
            };
        }
    ]);

}(window.angular));



(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.controller('ProfileCtrl' [function () {}]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.directive('profileForm', [
        'profileFactory',
        function (profileFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/profile/profile_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};

                    profileFactory.profile.get()
                        .then(function (response) {
                            angular.extend(scope.data, user);
                        });

                    var optionsPromise = profileFactory.profile.options();
                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.PUT;
                        });

                    scope.editProfile = function () {
                        optionsPromise
                            .then(function () {
                                scope.loading = true;

                                // Clear all errors on the fields object.
                                angular.forEach(scope.fields, function(value, key){
                                    value.errors = '';
                                });

                                profileFactory
                                    .profile.patch(scope.data)
                                    .then(function (response) {
                                        scope.data = response;
                                        scope.updated = true;
                                    }, function (response) {
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
