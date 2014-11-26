# angular-user-management

# Installation
`bower install angular-user-management --save`

* Load the dependencies in to your app.

* Load the modules you want to use in your HTML.
```html
<script src="bower_components/angular-user-management/dist/registration/registration.js"></script>
<script src="bower_components/angular-user-management/dist/registration/templates.js"></script>
```

* Inject the modules as a dependency of your main app module.
```javascript
angular.module('app', [
    'user-management.password',
    'user-management.profile',
    'user-management.registration',
    'user-management.verification'
]);
```

These settings are extended with defaults defined in the services so you can provide values to override with here.

It's planned to deprecate this method of configuring settings, moving towards a factory of settings.

# i18n

All strings are marked as translatable using [angular-gettext](https://github.com/rubenv/angular-gettext) syntax.
