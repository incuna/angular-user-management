### 2.1.4

* Show `tokenError` for any options errors (not just a 404).

### 2.1.3

* Add file linting using eslint version 18.1.0. https://github.com/sindresorhus/grunt-eslint.
* Add grunt jscs version 1.2.0.

### 2.1.2

* Fix sms-verification assigning components to modules other than itself

### 2.1.1

* Display login link on sms verification/password reset success.

## 2.1.0

* Upgrade Angular compatibility to include 1.5.

# 2.0.0

* BREAKING CHANGE
    * Adding bootstap 1.1.0 as a dependency.
    * Also Updating Angular and Angular route to version 1.4.

## 1.8.0

* Moved the profile deletion function to a service.

## 1.7.0

* Add sms-verification functionality to verify users using a phone number and an activation code (that is sent to the phone number by the api).
* Add SMS password reset functionality to allow user to reset their password using a phone number and an activation code (that is sent to the phone number by the api).

### 1.6.3

* Add an argument to `editProfile()` to reference an object which is used to
update the view in the app

### 1.5.3

* Prevent forms being submitted whilst an existing request is in progress.

### 1.5.2

* Fix password change_form template.

### 1.5.1

* Updated the distribution files to fix the delete method.

## 1.5.0

* Added deletion function.

## 1.4.0

* Added form to resend verification email.

### 1.3.1

* Fixed typo in password reset request template.

## 1.3.0

* Marked password, registration and verification routes as anonymous only.

## 1.2.0

* Mark all strings as translatable using angular-gettext syntax.

## 1.1.0

* Added success and error data to scopes.
* Moved errors to a separate object, however they have been left on the fields
  for backwards compatibility.

### 1.0.1

* Ensure `$routeProvider` is defined.

# 1.0.0

* Rebranded as `angular-user-management` with closer ties to
[django-user-management](https://github.com/incuna/django-user-management)
* Complete refactor from https://github.com/incuna/angular-registration
* Split all functionality out in to independent modules, allowing for greater flexibility.
