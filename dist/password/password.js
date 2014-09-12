!function(a){"use strict";a.module("user_management.password",["ngRoute","project_settings"])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.config(["$routeProvider",function(a){a.when("/password-reset/",{templateUrl:"templates/user_management/password/reset_request.html",controller:"PasswordResetRequestCtrl"}).when("/password-change/:token*/",{templateUrl:"templates/user_management/password/change.html",controller:"PasswordChangeCtrl"})}])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.factory("passwordFactory",["$http","PROJECT_SETTINGS",function(b,c){var d=a.extend({},{RESET_REQUEST_ENDPOINT:"/auth/password_reset",CHANGE_ENDPOINT:"/auth/password_reset/confirm",UPDATE_ENDPOINT:"/profile/password"},c.USER_MANAGEMENT.PASSWORD),e=c.API_ROOT,f={url:e+d.RESET_REQUEST_ENDPOINT,options:function(){return b({method:"OPTIONS",url:f.url})},post:function(a){return b({method:"POST",url:f.url,data:a})}},g={url:e+d.CHANGE_ENDPOINT,options:function(a){return b({method:"OPTIONS",url:g.url+"/"+a})},put:function(a,c){return b({method:"PUT",url:g.url+"/"+c,data:a})}},h={url:e+d.UPDATE_ENDPOINT,options:function(){return b({method:"OPTIONS",url:h.url})},put:function(a){return b({method:"PUT",url:h.url,data:a})}};return{resetRequest:f,change:g,update:h}}])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.controller("PasswordResetCtrl"[function(){}]),b.controller("PasswordChangeCtrl"[function(){}])}(window.angular),function(a){"use strict";var b=a.module("user_management.password");b.directive("passwordResetRequestForm",["passwordFactory",function(b){return{restrict:"A",scope:!0,templateUrl:"templates/user_management/password/reset_request_form.html",link:function(c){c.data={};var d=b.resetRequest.options();d.then(function(a){c.fields=a.data.actions.POST}),c.resetReqest=function(){d.then(function(){c.loading=!0,a.forEach(c.fields,function(a){a.errors=""}),b.resetRequest.post(c.data).then(function(){c.email=c.data.email,c.data={}},function(b){a.forEach(b.data,function(a,b){c.fields[b].errors=a[0]})})["finally"](function(){c.loading=!1})})}}}}]),b.directive("passwordChangeForm",["$route","passwordFactory",function(b,c){return{restrict:"A",scope:!0,templateUrl:"templates/user_management/password/change_form.html",link:function(d){var e,f=b.current.pathParams.token;e=a.isDefined(f)?c.change.options(f):c.update.options(),e.then(function(a){d.fields=a.data.actions.PUT},function(b){500===b.status&&a.isDefined(f)&&(d.tokenError=!0)}),d.changePassword=function(){e.then(function(){d.loading=!0,a.forEach(d.fields,function(a){a.errors=""});var b;b=a.isDefined(f)?c.change.put(d.data,f).then(function(){d.updated=!0}):c.update.put(d.data).then(function(){d.changed=!0}),b["catch"](function(b){a.forEach(b.data,function(a,b){d.fields[b].errors=a[0]})})["finally"](function(){d.loading=!0})})}}}}])}(window.angular);