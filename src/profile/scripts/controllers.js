(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile-controllers', []);

    module.controller('ProfileCtrl', [
        'profileFactory',
        '$scope',
        function (profileFactory, $scope) {
            $scope.profileFields = {};

            profileFactory.profile.get()
                .then(function (response) {
                    angular.extend($scope.profileFields, response.data);
                });
            profileFactory.profile.options()
                .then(function (response) {
                    $scope.profileOptions = response.data.actions.PUT;
                });
        }
    ]);
    module.controller('ProfileDeletedCtrl', [function () {}]);

}(window.angular));
