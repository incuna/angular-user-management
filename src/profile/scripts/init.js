(function (angular) {
    'use strict';

    angular.module('user_management.profile', [
        'user_management.profile-controllers',
        'user_management.profile-directives',
        'user_management.profile-providers',
        'user_management.profile-routes',
        'user_management.profile-services',
    ]);

}(window.angular));
