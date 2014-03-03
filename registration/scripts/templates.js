angular.module('angular-registration').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/registration/base/password_change.html',
    "<div data-extend-template=templates/unauthenticated_base.html><div data-block=page-inner><h1 data-block=page-body-title>{{ app.page.title }}</h1><form password-change-form=\"\" ng-submit=changePassword()></form></div></div>"
  );


  $templateCache.put('templates/registration/base/password_change_form.html',
    "<div form-field=fields.old_password ng-if=fields.old_password><input type=password ng-model=data.old_password placeholder=\"{{ fields.old_password.label }}\"></div><div form-field=fields.new_password><input type=password ng-model=data.new_password placeholder=\"{{ fields.new_password.label }}\"></div><div form-field=fields.new_password2><input type=password ng-model=data.new_password2 placeholder=\"{{ fields.new_password2.label }}\"></div><div class=form-actions><button type=submit>Update password</button></div>"
  );


  $templateCache.put('templates/registration/base/password_reset_request.html',
    "<div data-extend-template=templates/unauthenticated_base.html><div data-block=page-inner><h1 data-block=page-body-title>{{ app.page.title }}</h1><form password-reset-request-form=\"\" ng-submit=resetPassword()></form></div></div>"
  );


  $templateCache.put('templates/registration/base/password_reset_request_form.html',
    "<div form-field=fields.email><input ng-model=data.email type=text placeholder=\"{{ fields.email.label }}\" autofocus></div><div class=form-actions><button type=submit>Reset password</button></div>"
  );


  $templateCache.put('templates/registration/base/profile.html',
    "<div data-extend-template=templates/base.html><div data-block=page-breadcrumbs></div><div data-block=page-head-inner>{{ app.page.title }}</div><div data-block=page-body-head></div><div data-block=page-body-content-inner><form profile-form=\"\" ng-submit=editProfile()></form><form password-change-form=\"\" change-method=update ng-submit=changePassword()></form></div></div>"
  );


  $templateCache.put('templates/registration/base/profile_form.html',
    "<div form-field=fields.name><input type=text ng-model=editUser.name maxlength=\"{{ fields.name.max_length }}\" placeholder=\"{{ fields.name.label }}\"></div><div class=form-actions><button type=submit>Update</button></div>"
  );


  $templateCache.put('templates/registration/base/register_form.html',
    "<div form-field=fields.email><input type=email ng-model=user.email maxlength=\"{{ fields.email.max_length }}\" placeholder=\"{{ fields.email.label }}\"></div><div form-field=fields.password><input type=password ng-model=user.password placeholder=\"{{ fields.password.label }}\"></div><div form-field=fields.password2><input type=password ng-model=user.password2 placeholder=\"{{ fields.password2.label }}\"></div><div form-field=fields.name><input type=text ng-model=user.name maxlength=\"{{ fields.name.max_length }}\" placeholder=\"{{ fields.name.label }}\"></div><div class=form-actions><button type=submit>Register</button></div>"
  );


  $templateCache.put('templates/registration/base/verify.html',
    "<div data-extend-template=templates/unauthenticated_base.html><div data-block=page-inner><h1>Verify email</h1><div><div ng-show=\"status === 200\"><p>Thank you for verifying your account. You may now <a href=\"{{ 'LoginCtrl'|reverseUrl }}\">log in</a>.</p></div><div ng-hide=\"status === 200\"><p>There was a problem verifying your account, you may have already verified it. Please try <a href=\"{{ 'LoginCtrl'|reverseurl }}\">logging in</a>.</p></div></div></div></div>"
  );


  $templateCache.put('templates/registration/password_change.html',
    "<div data-extend-template=templates/registration/base/password_change.html></div>"
  );


  $templateCache.put('templates/registration/password_change_form.html',
    "<div data-extend-template=templates/registration/base/password_change_form.html></div>"
  );


  $templateCache.put('templates/registration/password_reset_request.html',
    "<div data-extend-template=templates/registration/base/password_reset_request.html></div>"
  );


  $templateCache.put('templates/registration/password_reset_request_form.html',
    "<div data-extend-template=templates/registration/base/password_reset_request_form.html></div>"
  );


  $templateCache.put('templates/registration/profile.html',
    "<div data-extend-template=templates/registration/base/profile.html></div>"
  );


  $templateCache.put('templates/registration/profile_form.html',
    "<div data-extend-template=templates/registration/base/profile_form.html></div>"
  );


  $templateCache.put('templates/registration/register_form.html',
    "<div data-extend-template=templates/registration/base/register_form.html></div>"
  );


  $templateCache.put('templates/registration/verify.html',
    "<div data-extend-template=templates/registration/base/verify.html></div>"
  );

}]);
