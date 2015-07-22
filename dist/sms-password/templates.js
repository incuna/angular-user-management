angular.module('user_management.sms-password').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/user_management/sms-password/reset.html',
    "<form sms-password-reset-request-form data=data></form><form sms-password-reset-form data=data></form>"
  );


  $templateCache.put('templates/user_management/sms-password/reset_form.html',
    "<div class=\"alert alert-success\" ng-show=changed><p translate>You've successfully changed your password.</p></div><div class=form-group ng-class=\"{'has-error': errors.phone_number}\"><label for=phone_number ng-show=fields.phone_number.label ng-bind=fields.phone_number.label></label><input type=text ng-model=data.phone_number class=form-control id=phone_number autofocus><div class=help-block ng-show=errors.phone_number ng-bind=errors.phone_number></div></div><div class=form-group ng-class=\"{'has-error': errors.activation_code}\"><label for=activation_code ng-show=fields.activation_code.label ng-bind=fields.activation_code.label></label><input type=text ng-model=data.activation_code class=form-control id=activation_code autofocus><div class=help-block ng-show=errors.activation_code ng-bind=errors.activation_code></div></div><div class=form-group ng-class=\"{'has-error': errors.new_password}\"><label for=new_password ng-show=fields.new_password.label ng-bind=fields.new_password.label></label><input type=password ng-model=data.new_password class=form-control id=new_password><div class=help-block ng-show=errors.new_password ng-bind=errors.new_password></div></div><div class=form-group ng-class=\"{'has-error': errors.new_password2}\"><label for=new_password2 ng-show=fields.new_password2.label ng-bind=fields.new_password2.label></label><input type=password ng-model=data.new_password2 class=form-control id=new_password2><div class=help-block ng-show=errors.new_password2 ng-bind=errors.new_password2></div></div><button type=submit class=\"btn btn-default\" ng-click=changePassword() translate>Update password</button>"
  );


  $templateCache.put('templates/user_management/sms-password/reset_request_form.html',
    "<div class=\"alert alert-success\" ng-show=\"requested && data.phone_number\"><p translate>We've sent a message to {{ data.phone_number }} containing a code to change your password.</p></div><div class=form-group ng-class=\"{'has-error': errors.phone_number}\"><label for=phone_number ng-show=fields.phone_number.label ng-bind=fields.phone_number.label></label><input type=text ng-model=data.phone_number class=form-control id=phone_number autofocus><div class=help-block ng-show=errors.phone_number ng-bind=errors.phone_number></div></div><button type=submit class=\"btn btn-default\" ng-click=resetRequest() translate>Request code</button>"
  );

}]);
