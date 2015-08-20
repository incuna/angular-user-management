angular.module('user_management.password').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/user_management/password/change.html',
    "<form password-change-form ng-submit=changePassword()></form>"
  );


  $templateCache.put('templates/user_management/password/change_form.html',
    "<div class=\"alert alert-success\" ng-if=updated><p translate>You've successfully updated your password.</p></div><div class=\"alert alert-success\" ng-if=changed><p translate>You've successfully changed your password.</p></div><div class=\"alert alert-danger\" ng-if=\"tokenError && !errorMessage\"><p translate>There was a problem with your token. Please try submitting a new password reset request.</p></div><div class=form-group ng-if=fields.old_password ng-class=\"{'has-error': errors.old_password}\"><label for=old_password ng-if=fields.old_password.label>{{ fields.old_password.label }}</label><input type=password ng-model=data.old_password class=form-control id=old_password><div class=help-block ng-if=errors.old_password ng-bind=errors.old_password></div></div><div class=form-group ng-class=\"{'has-error': errors.new_password}\"><label for=new_password ng-if=fields.new_password.label>{{ fields.new_password.label }}</label><input type=password ng-model=data.new_password class=form-control id=new_password><div class=help-block ng-if=errors.new_password ng-bind=errors.new_password></div></div><div class=form-group ng-class=\"{'has-error': errors.new_password2}\"><label for=new_password2 ng-if=fields.new_password2.label>{{ fields.new_password2.label }}</label><input type=password ng-model=data.new_password2 class=form-control id=new_password2><div class=help-block ng-if=errors.new_password2 ng-bind=errors.new_password2></div></div><div class=help-block ng-if=errors.detail ng-bind=errors.detail></div><div class=help-block ng-if=errors.non_field_errors ng-bind=errors.non_field_errors></div><button type=submit class=\"btn btn-default\" translate>Update password</button>"
  );


  $templateCache.put('templates/user_management/password/reset_request.html',
    "<form password-reset-request-form ng-submit=resetRequest()></form>"
  );


  $templateCache.put('templates/user_management/password/reset_request_form.html',
    "<div class=\"alert alert-success\" ng-if=email><p translate>We've sent an email to {{ email }} containing a link to change your password.</p></div><div class=form-group ng-class=\"{'has-error': errors.email}\"><label for=email ng-if=fields.email.label>{{ fields.email.label }}</label><input type=email ng-model=data.email class=form-control id=email autofocus><div class=help-block ng-if=errors.email ng-bind=errors.email></div><div class=help-block ng-if=errors.detail ng-bind=errors.detail></div><div class=help-block ng-if=errors.non_field_errors ng-bind=errors.non_field_errors></div></div><button type=submit class=\"btn btn-default\" translate>Reset password</button>"
  );

}]);
