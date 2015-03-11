angular.module('user_management.verification').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/user_management/verification/verification.html',
    "<div verify></div>"
  );


  $templateCache.put('templates/user_management/verification/verification_resend.html',
    "<form verification-resend ng-submit=resend()></form>"
  );


  $templateCache.put('templates/user_management/verification/verification_resend_form.html',
    "<div class=\"alert alert-success\" ng-if=\"status === 204\"><p translate>We've sent a verification code to {{ data.email }}, please check your email to continue.</p></div><div class=form-group ng-class=\"{'has-error': errors.email}\"><label for=email translate>Email address</label><input type=email ng-model=data.email class=form-control id=email><div class=help-block ng-if=errors.email ng-bind=errors.email></div></div><button type=submit class=\"btn btn-default\" translate>Resend verification email</button>"
  );


  $templateCache.put('templates/user_management/verification/verify.html',
    "<div><div ng-show=\"status === 201\"><p translate>Thank you for verifying your account. You may now log in.</p></div><div ng-show=\"status === 403\"><p translate>You have already verified your account. Please log in.</p></div><div ng-show=\"status === 404 || invalid\"><p translate>There was a problem with your verification code. Please request a new one using the form below.</p><form verification-resend ng-submit=resend()></form></div></div>"
  );

}]);
