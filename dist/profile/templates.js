angular.module('user_management.profile').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/user_management/profile/delete-profile-confirmation.html',
    "<div data-extend-template=templates/base.html class=profile-page><div data-block=page-body-content-inner><span translate>Your account has been deleted.</span> <a class=\"btn btn-default\" href=\"#/\" translate>Home</a></div></div>"
  );


  $templateCache.put('templates/user_management/profile/delete-profile.html',
    "<div class=notification-header><span ng-show=!failed translate>You are about to permanently delete your profile and all associated data. This cannot be undone. Please confirm you would like to proceed.</span> <span ng-show=failed translate>Delete failed, please try again later.</span></div><div class=actions><button ng-click=deleteProfile() class=\"action button right-arrow seperated tick\" translate>Delete</button> <button ng-click=close() class=\"action button right-arrow seperated cancel\" translate>Cancel</button></div>"
  );


  $templateCache.put('templates/user_management/profile/profile.html',
    "<form profile-form ng-submit=editProfile()></form><form password-change-form ng-submit=changePassword()></form>"
  );


  $templateCache.put('templates/user_management/profile/profile_form.html',
    "<div class=\"alert alert-success\" ng-if=\"updated === true\"><p translate>You have updated your profile.</p></div><div class=form-group ng-class=\"{'has-error': errors.name}\"><label for=name ng-if=fields.name.label>{{ fields.name.label }}</label><input type=text ng-model=data.name class=form-control id=name maxlength=\"{{ fields.name.max_length }}\"><div class=help-block ng-if=errors.name ng-bind=errors.name></div><div class=help-block ng-if=errors.detail ng-bind=errors.detail></div><div class=help-block ng-if=errors.non_field_errors ng-bind=errors.non_field_errors></div></div><button type=submit class=\"btn btn-default\" translate>Update profile</button>"
  );

}]);
