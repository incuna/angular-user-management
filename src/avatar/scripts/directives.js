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
        'avatarFactory',
        function (userManagementAvatarConfig, $rootScope, avatarFactory) {
            return {
                restrict: 'A',
                link: function link(scope, element, attrs) {
                    var apiRoot = userManagementAvatarConfig.apiRoot();
                    scope.avatarUploadUrl = apiRoot + userManagementAvatarConfig.avatarEndpoint();
                    scope.token = $rootScope.usertoken;

                    function clearAvatarSuccess(response) {
                        scope.$broadcast('avatar:clear:success', response);
                    }

                    function clearAvatarError(error) {
                        scope.$broadcast('avatar:clear:error', error);
                    }

                    function clearAvatar($event) {
                        $event.stopPropagation();

                        avatarFactory.clear(scope.avatarUploadUrl)
                            .then(clearAvatarSuccess, clearAvatarError);
                    }

                    scope.clearAvatar = clearAvatar;
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
                    var apiRoot = userManagementAvatarConfig.apiRoot();
                    var defaults = apiRoot + userManagementAvatarConfig.defaultAvatarPaths();
                    var width = attrs.width;
                    var height = attrs.height;

                    if (angular.isDefined(attrs.imagewidth)) {
                        width = attrs.imagewidth;
                    }

                    if (angular.isDefined(attrs.imageheight)) {
                        height = attrs.imageheight;
                    }

                    function getAvatar(dataUrl) {
                        avatarFactory.getSized({
                            path: dataUrl,
                            width: width,
                            height: height
                        }).then(function (response) {
                            var data = response.data;

                            if (angular.isDefined(data.avatar)) {
                                element[0].src = data.avatar;
                            } else {
                                element[0].src = defaults['thumbnail'];
                            }
                        }, function (error) {
                            element[0].src = defaults['thumbnail'];
                        });
                    }

                    // wait for the URL to be populated
                    scope.$watch('userUrl', function (value) {
                        scope.userUrl = attrs.userUrl;

                        if (angular.isDefined(scope.userUrl) && (scope.userUrl !== null) && (scope.userUrl !== '')) {
                            getAvatar(scope.userUrl);
                        }
                    });

                    function refreshAvatar() {
                        getAvatar(scope.userUrl);
                    }

                    scope.$on('avatar:clear:success', refreshAvatar);

                    scope.$on('avatar:clear:error', refreshAvatar);
                }
            };
        }
    ]);

}(window.angular));

