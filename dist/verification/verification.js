(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification', [
        'ngRoute',
        'project_settings'
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.config([
        '$routeProvider',
        function () {
            $routeProvider
                .when('/register/verify/:token*\/', {
                    templateUrl: 'templates/user_management/verification/verification.html',
                    controller: 'VerificationCtrl'
                });
        }
    ]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.factory('verificationFactory', [
        '$http',
        'PROJECT_SETTINGS',
        function ($http, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend(
                {},
                {
                    VERIFICATION_ENDPOINT: '/verify_email'
                },
                PROJECT_SETTINGS.USER_MANAGEMENT.VERIFICATION
            );

            var API_ROOT = PROJECT_SETTINGS.API_ROOT;

            var verify =  {
                post: function (token) {
                    return $http({
                        method: 'POST',
                        url: API_ROOT + MODULE_SETTINGS.VERIFICATION_ENDPOINT + '/' + token,
                        data: {token: token}
                    });
                }
            };

            return {
                verify: verify
            };
        }
    ]);

}(window.angular));



(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.controller('VerificationCtrl', [function () {}]);

}(window.angular));


(function (angular) {
    'use strict';

    var module = angular.module('user_management.verification');

    module.directive('verify', [
        '$route',
        'verificationFactory',
        function ($route, verificationFactory) {
            return {
                restrict: 'A',
                scope: true,
                templateUrl: 'templates/user_management/verification/verify.html',
                link: function (scope, element, attrs) {
                    var TOKEN = $route.current.pathParams.token;

                    verificationFactory
                        .verify.post(TOKEN)
                        .then(function (response) {
                            scope.status = response.status;
                        });
                }
            };
        }
    ]);

}(window.angular));


