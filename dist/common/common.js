!function(a){"use strict";a.module("user_management.common",[])}(window.angular),function(a){"use strict";var b=a.module("user_management.common");b.service("catchErrors",[function(){this.all=function(b,c){var d={};a.isDefined(c)&&(d=a.copy(c));var e={};return a.forEach(b.data,function(b,f){b=a.isArray(b)?b[0]:b,a.isDefined(c)&&a.isDefined(c[f])&&(d[f].errors=b),e[f]=b}),{fieldErrors:d,nonFieldErrors:e}}}])}(window.angular);