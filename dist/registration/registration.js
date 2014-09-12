(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration', [
        'ngRoute',
        'project_settings'
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/register/', {
                    templateUrl: 'templates/user_management/registration/register.html',
                    controller: 'RegistrationCtrl'
                });
        }
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.factory('registrationFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    REGISTRATION_ENDPOINT: '/register'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.REGISTRATION
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var register = {
                url: API_ROOT + MODULE_SETTINGS.REGISTRATION_ENDPOINT,
                options: function () {
                    return $http({
                        method: 'OPTIONS',
                        url: register.url
                    });
                },
                post: function (data) {
                    return $http({
                        method: 'POST',
                        url: register.url,
                        data: data
                    });
                }
            };

            return {
                register: register
            };
        }
    ]);

}(window.angular));



(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.controller('RegistrationCtrl' [function () {}]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.registration');

    module.directive('registerForm', [
        'registrationFactory',
        function (registrationFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/registration/register_form.html',
                link: function (scope, element, attrs) {
                    scope.data = {};

                    var optionsPromise = registrationFactory.register.options();
                    optionsPromise
                        .then(function (response) {
                            scope.fields = response.data.actions.POST;
                        });

                    scope.register = function () {
                        optionsPromise
                            .then(function () {
                                scope.loading = true;

                                // Clear all errors on the fields object.
                                angular.forEach(scope.fields, function(value, key){
                                    value.errors = '';
                                });

                                registrationFactory
                                    .resetRequest.post(scope.data)
                                    .then(function (response) {
                                        scope.data = {};
                                        scope.registered = true;
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
