(function (angular) {
    'use strict';

    var module = angular.module('user_management.profile');

    module.factory('profileFactory', [
        '$http',
        'userManagementProfileConfig',
        function ($http, userManagementProfileConfig) {
            var apiRoot = userManagementProfileConfig.apiRoot();

            var profile = {
                url: apiRoot + userManagementProfileConfig.profileEndpoint(),
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
                deleteData: function(){
                    return $http({
                        method: 'DELETE',
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

    module.factory('AccountFactory', [
        'profileFactory', 
        '$uibModal', 
        '$location', 
        '$filter',
        function (profileFactory, $uibModal, $location, $filter) {

            var accountOperations = {
                deleteAccount: function() {
                    $uibModal.open({
                        templateUrl: 'templates/user_management/profile/delete-profile.html',
                        windowClass: 'delete-profile',
                        controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                            $scope.failed = false;

                            $scope.close = function () {
                                $uibModalInstance.dismiss('close');
                            };
                            $scope.deleteProfile = function () {
                                profileFactory.profile.deleteData().then(function () {
                                    $uibModalInstance.dismiss('close');
                                    $location.path($filter('reverseUrl')('ProfileDeletedCtrl').substring(1));
                                },
                                function () {
                                    $scope.failed = true;
                                });
                            };
                        }]
                    });
                }
            }

            return {
                accountOperations: accountOperations
            };
        }
    ]);

}(window.angular));


