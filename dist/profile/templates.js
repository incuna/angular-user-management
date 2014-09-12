angular.module('user_management.profile').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/user_management/profile/profile.html',
    "<form profile-form ng-submit=editProfile()></form><form password-change-form ng-submit=changePassword()></form>"
  );


  $templateCache.put('templates/user_management/profile/profile_form.html',
    "<div class=form-group><label for=name ng-if=fields.name.label>{{ fields.name.label }}</label><input type=text ng-model=data.name class=form-control id=name maxlength=\"{{ fields.name.max_length }}\"></div><button type=submit class=\"btn btn-default\">Update profile</button>"
  );

}]);
