!function(a){"use strict";a.module("user_management.password",["ngRoute"])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.provider("userManagementPasswordConfig",function(){var a="",b="/auth/password_reset/confirm",c="/auth/password_reset",d="/profile/password";return{$get:function(){return{apiRoot:function(){return a},changeEndpoint:function(){return b},resetRequestEndpoint:function(){return c},updateEndpoint:function(){return d}}},setApiRoot:function(b){a=b},setChangeEndpoint:function(a){b=a},setResetRequestEndpoint:function(a){c=a},setUpdateEndpoint:function(a){d=a}}})}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.config(["$routeProvider",function(a){a.when("/password-reset/",{templateUrl:"templates/user_management/password/reset_request.html",controller:"PasswordResetRequestCtrl",anonymousOnly:!0}).when("/password-change/:token*/",{templateUrl:"templates/user_management/password/change.html",controller:"PasswordChangeCtrl",anonymousOnly:!0})}])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.factory("passwordFactory",["$http","userManagementPasswordConfig",function(a,b){var c=b.apiRoot(),d={url:c+b.resetRequestEndpoint(),options:function(){return a({method:"OPTIONS",url:d.url})},post:function(b){return a({method:"POST",url:d.url,data:b})}},e={url:c+b.changeEndpoint(),options:function(b){return a({method:"OPTIONS",url:e.url+"/"+b})},put:function(b,c){return a({method:"PUT",url:e.url+"/"+c,data:b})}},f={url:c+b.updateEndpoint(),options:function(){return a({method:"OPTIONS",url:f.url})},put:function(b){return a({method:"PUT",url:f.url,data:b})}};return{resetRequest:d,change:e,update:f}}])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.controller("PasswordResetRequestCtrl",[function(){}]),b.controller("PasswordChangeCtrl",[function(){}])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.service("catchErrors",[function(){this.all=function(b,c){return fieldErrors={},fieldErrors.fields=a.copy(b),errors={},a.forEach(c.data,function(c,d){c=a.isArray(c)?c[0]:c,a.isDefined(b[d])&&(fieldErrors.fields[d].errors=c),errors[d]=c}),{fieldErrors:fieldErrors,errors:errors}}}]),b.directive("passwordResetRequestForm",["passwordFactory","catchErrors",function(b,c){return{restrict:"A",scope:!0,templateUrl:"templates/user_management/password/reset_request_form.html",link:function(d,e,f){d.data={};var g=b.resetRequest.options();g.then(function(a){d.fields=a.data.actions.POST}),d.resetRequest=function(){d.loading||g.then(function(){d.loading=!0,d.email=null,d.successData=void 0,d.errorData=void 0,a.forEach(d.fields,function(a,b){a.errors=""}),d.errors={},b.resetRequest.post(d.data).then(function(a){d.email=d.data.email,d.data={},d.successData=a.data},function(b){d.errorData=b.data;var e=c.all(d.fields,b);a.merge(d.errors,e.errors),a.merge(d.fields,e.fieldErrors)})["finally"](function(){d.loading=!1})})}}}}]),b.directive("passwordChangeForm",["$route","passwordFactory","catchErrors",function(b,c,d){return{restrict:"A",scope:!0,templateUrl:"templates/user_management/password/change_form.html",link:function(e,f,g){e.data={},e.errors={};var h,i=b.current.pathParams.token;h=a.isDefined(i)?c.change.options(i):c.update.options(),h.then(function(a){e.fields=a.data.actions.PUT},function(b){if(a.isDefined(i)&&(e.tokenError=!0),"404"!==b.status&&a.isDefined(b.data)){var c=d.all({},b);a.merge(e.errors,c.errors)}}),e.changePassword=function(){e.loading||h.then(function(){e.loading=!0,e.changed=!1,e.updated=!1,e.successData=void 0,e.errorData=void 0,a.forEach(e.fields,function(a,b){a.errors=""}),e.errors={};var b;b=a.isDefined(i)?c.change.put(e.data,i).then(function(a){e.data={},e.changed=!0,e.successData=a.data}):c.update.put(e.data).then(function(a){e.data={},e.updated=!0,e.successData=a.data}),b["catch"](function(b){e.errorData=b.data;var c=d.all(e.fields,b);a.merge(e.errors,c.errors),a.merge(e.fields,c.fieldErrors)})["finally"](function(){e.loading=!1})})}}}}])}(window.angular);