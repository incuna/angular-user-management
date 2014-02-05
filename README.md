# angular-registration

# Installation
`bower install angular-registration`

Load the scripts in your HTML.
```html
<script src="bower_components/angular-registration/registration/scripts/registration.js"></script>
<script src="bower_components/angular-registration/registration/scripts/templates.js"></script>
<script src="bower_components/angular-registration/registration/scripts/routes.js"></script>
<script src="bower_components/angular-registration/registration/scripts/services.js"></script>
<script src="bower_components/angular-registration/registration/scripts/controllers.js"></script>
<script src="bower_components/angular-registration/registration/scripts/directives.js"></script>
```

Inject `angular-registration` as a dependency of your main app module.
```javascript
angular.module('app', ['angular-registration']);
```

Add `project_settings` module with a `PROJECT_SETTINGS` constant.
```javascript
angular.module('project_settings', [])
    .constant('PROJECT_SETTINGS', {});
```
