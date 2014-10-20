(function (angular) {
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
                    scope.avatarUploadUrl = apiRoot + userManagementAvatarConfig.avatarEndpoint();
                    scope.token = $rootScope.usertoken;
                }
            };
        }
    ]);

    profile.directive('avatar', [
        '$rootScope',
        '$timeout',
        '$http',
        'profileFactory',
        'avatarFactory',
        'userManagementAvatarConfig',
        function ($rootScope, $http, $timeout, profileFactory, avatarFactory, userManagementAvatarConfig) {
            return {
                restrict: 'A',
                scope: {
                    userUrl: '@',
                    size: '@'
                },
                link: function link(scope, element, attrs) {
                    var defaults = userManagementAvatarConfig.defaultAvatarPaths();

                    // wait for the URL to be populated
                    scope.$watch('userUrl', function (value) {
                        scope.userUrl = attrs.userUrl;

                        if (angular.isDefined(scope.userUrl) && (scope.userUrl !== null) && (scope.userUrl !== '')) {
                            getAvatar(scope.userUrl);
                        }
                    });


                    function getAvatar(dataUrl) {
                        avatarFactory.getSized(dataUrl, {
                            width: 150,
                            height: 150
                        }, function (data) {
                            if (angular.isDefined(data)) {
                                element[0].src = data;
                            } else {
                                element[0].src = defaults['thumbnail'];
                            }
                        });
                    }
                }
            };
        }
    ]);

}(window.angular));

