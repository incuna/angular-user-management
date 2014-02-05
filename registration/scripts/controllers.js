(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.controller('RegisterCtrl', [function () {}]);

    registration.controller('PasswordResetRequestCtrl', [function () {}]);

    registration.controller('PasswordChangeCtrl', [function () {}]);

    registration.controller('ProfileCtrl', [function () {}]);

    registration.controller('RegisterVerifyCtrl', ['$scope', '$http', '$route', 'REGISTRATION', 'PROJECT_SETTINGS', function ($scope, $http, $route, REGISTRATION, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, REGISTRATION, PROJECT_SETTINGS.REGISTRATION);
        var TOKEN = $route.current.pathParams.token;

        $http({
            method: 'POST',
            url: PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.VERIFY_ENDPOINT + TOKEN + '/',
            data: { token: TOKEN }
        }).then(function (response, status) {
            $scope.status = response.status;
        });
    }]);
}());
