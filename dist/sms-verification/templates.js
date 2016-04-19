angular.module('user_management.sms-verification').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/user_management/sms-verification/verify.html',
    "<div sms-verify></div>"
  );


  $templateCache.put('templates/user_management/sms-verification/verify_form.html',
    "<div class=\"alert alert-success\" ng-show=verified><p translate>Verification successful.</p><p translate>Please <a class=\"btn btn-default\" href=\"#/\" translate>log in</a> here</p></div><div class=\"alert alert-success\" ng-show=resent><p translate>Activation code resent.</p></div><div class=form-group ng-class=\"{'has-error': errors.phone_number}\"><label for=phone_number translate>Phone number</label><input type=text ng-model=data.phone_number class=form-control id=phone_number><div class=help-block ng-if=errors.phone_number ng-bind=errors.phone_number></div></div><div class=form-group ng-class=\"{'has-error': errors.activation_code}\"><label for=activation_code translate>Activation code</label><input type=text ng-model=data.activation_code class=form-control id=activation_code><div class=help-block ng-if=errors.activation_code ng-bind=errors.activation_code></div></div><div ng-show=errors.non_field_errors ng-class=\"{'has-error': errors.non_field_errors}\"><div ng-repeat=\"error in errors.non_field_errors\" class=help-block ng-bind=error></div></div><div ng-show=errors.detail ng-class=\"{'has-error': errors.detail}\"><div ng-repeat=\"error in errors.detail\" class=help-block ng-bind=error></div></div><button type=submit class=\"btn btn-default\" ng-click=verify() translate>Verify</button> <button type=submit class=\"btn btn-default\" ng-click=resend() translate>Resend</button>"
  );

}]);
