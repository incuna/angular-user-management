(function (angular, moment) {
    'use strict';

    var profile = angular.module('user_management.avatar');

    profile.directive('modifyAction', [
        function () {
            return {
                restrict: 'A',
                link: function link(scope, element, attrs) {
                    function setAttribute(value) {
                        if (angular.isDefined(value) && (value !== '')) {
                            element[0].action = value;
                        }
                    }

                    scope.$watch('modifyAction', function (value) {
                        setAttribute(attrs.modifyAction);
                    });
                }
            };
        }
    ]);

    profile.directive('autoSubmit', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    formId: '@'
                },
                link: function link(scope, element, attrs) {

                    function onChange() {
                        try {
                            document.getElementById(scope.formId).submit();
                        } catch (e) {
                            // the user chose no file. Ignore the error.
                        }
                    }

                    element[0].onchange = onChange;
                }
            };
        }
    ]);

    profile.directive('avatarprofileInit', [
        'userManagementAvatarConfig',
        '$rootScope',
        function (userManagementAvatarConfig, $rootScope) {
            return {
                restrict: 'A',
                link: function link(scope, element, attrs) {
                    var apiRoot = userManagementAvatarConfig.apiRoot();
                    debugger;
                    scope.avatarUploadUrl = apiRoot + userManagementAvatarConfig.avatarEndpoint();
                    scope.token = $rootScope.usertoken;
                }
            };
        }
    ]);

}(window.angular, window.moment));

