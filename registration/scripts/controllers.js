(function () {
    'use strict';

    var registration = angular.module('angular-registration');

    registration.controller('RegisterCtrl', ['$scope', 'gettextCatalog', function ($scope, gettextCatalog) {
        $scope.app.page.title = gettextCatalog.getString('Register');
    }]);

    registration.controller('PasswordResetRequestCtrl', ['$scope', 'gettextCatalog', function ($scope, gettextCatalog) {
        $scope.app.page.title = gettextCatalog.getString('Reset your password');
    }]);

    registration.controller('PasswordChangeCtrl', ['$scope', 'gettextCatalog', function ($scope, gettextCatalog) {
        $scope.app.page.title = gettextCatalog.getString('Set a new password');
    }]);

    registration.controller('ProfileCtrl', ['$scope', 'gettextCatalog', function ($scope, gettextCatalog) {
        $scope.app.page.title = gettextCatalog.getString('My profile');
    }]);

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
