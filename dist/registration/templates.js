angular.module('user_management.registration').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/user_management/registration/register.html',
    "<form register-form ng-submit=register()></form>"
  );


  $templateCache.put('templates/user_management/registration/register_form.html',
    "<div class=\"alert alert-success\" ng-if=\"registered === true\"><p translate>Your account has been created.</p></div><div class=form-group ng-class=\"{'has-error': errors.email}\"><label for=email ng-if=fields.email.label>{{ fields.email.label }}</label><input type=email ng-model=data.email class=form-control id=email maxlength=\"{{ fields.email.max_length }}\"><div class=help-block ng-if=errors.email ng-bind=errors.email></div></div><div class=form-group ng-class=\"{'has-error': errors.password}\"><label for=password ng-if=fields.password.label>{{ fields.password.label }}</label><input type=password ng-model=data.password class=form-control id=password><div class=help-block ng-if=errors.password ng-bind=errors.password></div></div><div class=form-group ng-class=\"{'has-error': errors.password2}\"><label for=password2 ng-if=fields.password2.label>{{ fields.password2.label }}</label><input type=password ng-model=data.password2 class=form-control id=password2><div class=help-block ng-if=errors.password2 ng-bind=errors.password2></div></div><div class=form-group ng-class=\"{'has-error': errors.name}\"><label for=name ng-if=fields.name.label>{{ fields.name.label }}</label><input type=text ng-model=data.name class=form-control id=name maxlength=\"{{ fields.name.max_length }}\"><div class=help-block ng-if=errors.name ng-bind=errors.name></div></div><div class=help-block ng-if=errors.detail ng-bind=errors.detail></div><div class=help-block ng-if=errors.non_field_errors ng-bind=errors.non_field_errors></div><button type=submit class=\"btn btn-default\" translate>Register</button>"
  );

}]);
