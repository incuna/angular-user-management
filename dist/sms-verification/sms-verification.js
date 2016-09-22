!function(a){"use strict";a.module("user_management.sms-verification",["ngRoute"])}(window.angular),function(a){"use strict";var b=a.module("user_management.sms-verification");b.provider("userManagementSmsVerificationConfig",function(){var a="",b="/activation-code",c="/resend-confirmation-sms";return{$get:function(){return{apiRoot:function(){return a},verificationEndpoint:function(){return b},verificationResendEndpoint:function(){return c}}},setApiRoot:function(b){a=b},setVerificationEndpoint:function(a){b=a},setVerificationResendEndpoint:function(a){c=a}}})}(window.angular),function(a){"use strict";var b=a.module("user_management.sms-verification");b.config(["$routeProvider",function(a){a.when("/register/sms-verify/",{templateUrl:"templates/user_management/sms-verification/verify.html",controller:"SmsVerificationCtrl",anonymousOnly:!0})}])}(window.angular),function(a){"use strict";var b=a.module("user_management.sms-verification");b.factory("smsVerificationFactory",["$http","userManagementSmsVerificationConfig",function(a,b){var c=b.apiRoot(),d={post:function(d){return a({method:"POST",url:c+b.verificationEndpoint(),data:d})},resend:function(d){return a({method:"POST",url:c+b.verificationResendEndpoint(),data:d})}};return{verify:d}}])}(window.angular),function(a){"use strict";var b=a.module("user_management.sms-verification");b.controller("SmsVerificationCtrl",[function(){}])}(window.angular),function(a){"use strict";var b=a.module("user_management.sms-verification");b.directive("smsVerify",["$parse","$routeParams","smsVerificationFactory",function(b,c,d){return{restrict:"A",scope:{data:"=?smsVerify",onVerify:"&",onResend:"&"},templateUrl:"templates/user_management/sms-verification/verify_form.html",link:function(b){b.verify=function(){b.verified=!1,b.resent=!1,d.verify.post(b.data).then(function(c){b.status=c.status,b.verified=!0,a.isDefined(b.onVerify)&&b.onVerify({verifyData:a.copy(b.data)})})["catch"](function(a){b.status=a.status,b.errors=a.data})},b.resend=function(){b.verified=!1,b.resent=!1,d.verify.resend(b.data).then(function(c){b.resent=!0,b.status=c.status,a.isDefined(b.onResend)&&b.onResend({resendData:a.copy(b.data)})})["catch"](function(a){b.status=a.status,b.errors=a.data})}}}}])}(window.angular);