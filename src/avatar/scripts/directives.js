(function (angular, moment) {
    'use strict';

    var profile = angular.module('avatarprofile');

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
        'PROJECT_SETTINGS',
        '$rootScope',
        function (PROJECT_SETTINGS, $rootScope) {
            return {
                restrict: 'A',
                link: function link(scope, element, attrs) {
                    scope.avatarUploadUrl = PROJECT_SETTINGS.API_ROOT + '/profile/avatar/';
                    scope.token = $rootScope.usertoken;
                }
            };
        }
    ]);

}(window.angular, window.moment));

