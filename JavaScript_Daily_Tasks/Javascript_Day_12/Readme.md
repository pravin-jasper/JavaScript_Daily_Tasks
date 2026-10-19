# Javascript_Day_12

## 📌 Overview

This day focuses on **Advanced Form Validation in JavaScript**.

The tasks demonstrate how JavaScript can be used to validate user input, check login credentials, count characters in real time, and evaluate password strength based on different conditions.

These concepts are useful for creating secure, user-friendly, and interactive web forms.

---

## 🎯 Learning Objectives

* Understand advanced form validation using JavaScript.
* Validate login form inputs.
* Check username and password conditions.
* Count characters dynamically.
* Validate password requirements.
* Create a password strength indicator.
* Use conditional statements for validation.
* Handle form and input events.
* Display validation messages dynamically using the DOM.
* Practice regular expressions and string methods.

---

## 🛠️ Technologies Used

* HTML5
* JavaScript
* DOM Manipulation
* Form Validation

---

## 📂 Folder Structure

```text
Javascript_Day_12
│
├── Task-27
│   ├── index.html
│   └── Output_Screenshots/
│
├── Task-28
│   ├── index.html
│   └── Output_Screenshots/
│
└── Task-29
    ├── index.html
    └── Output_Screenshots/
```

---

# 📚 Tasks

## 🔹 Task-27: Login Validation

### 📌 Description

Create a **Login Form Validation** using JavaScript.

The form validates user input before allowing the login process to continue. Different conditions are checked to ensure that the required fields contain valid information.

### 💡 Concepts Practiced

* Form Validation
* Input Validation
* DOM Selection
* `value`
* `trim()`
* Conditional Statements
* `if...else`
* Error Messages
* Form Events
* DOM Manipulation

### Example

```javascript
const username = usernameInput.value.trim();
const password = passwordInput.value.trim();

if (username === "") {
    message.textContent = "Username is required";
} else if (password === "") {
    message.textContent = "Password is required";
} else {
    message.textContent = "Login Successful";
}
```

The form checks the entered values and displays the appropriate validation message.

---


---

## 🔹 Task-28: Password Strength

### 📌 Description

Create a **Password Strength Checker** using JavaScript.

The entered password is evaluated based on different conditions such as password length, uppercase letters, lowercase letters, numbers, and special characters.

The result indicates whether the password is weak, medium, or strong.

### 💡 Concepts Practiced

* Password Validation
* String Methods
* Conditional Statements
* Regular Expressions
* `length`
* `test()`
* Input Events
* DOM Manipulation
* Password Strength Evaluation

### Example

```javascript
let strength = 0;

if (password.length >= 8) {
    strength++;
}

if (/[A-Z]/.test(password)) {
    strength++;
}

if (/[a-z]/.test(password)) {
    strength++;
}

if (/[0-9]/.test(password)) {
    strength++;
}

if (/[^A-Za-z0-9]/.test(password)) {
    strength++;
}
```

The password strength can then be determined based on the number of conditions satisfied.

---
# Task-29
# Registration Form Validation

A simple JavaScript form-validation example that checks user input before allowing registration.
Features

- Name: Required; must contain at least 3 characters after trimming whitespace.
- Email: Required; checked against a basic email pattern.
- Phone: Required; must contain exactly 10 digits.
- Age: Required; must be 18 or older.
- Password: Required; must contain at least 8 characters.
- Confirm password: Required; must match the password.
- Prevents the form's default submission while validation runs.
- Displays field-specific error messages.
- Shows a success alert and resets the form when all fields are valid.
Files and HTML requirements
This script expects an HTML form with the ID form and input elements with these IDs:
- name
- email
- phone
- age
- password
- confirmPassword

It also expects an error-message element for each field:
- nameError
- emailError
- phoneError
- ageError
- passwordError
- confirmPasswordError

For example, an error element can be a <small id="nameError"></small> placed next to the name input.
How to use
1. Add the expected form fields and error-message elements to your HTML.
2. Save the JavaScript in a file such as script.js.
3. Include it in your HTML, preferably with defer:
   <script src="script.js" defer></script>
4. Open the HTML page in a browser and submit the form to test the validations.

## Important note about the email pattern

Use this JavaScript regular expression for a basic email check:
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
In the supplied code, the email pattern appears to contain ** around the escaped dot. Those extra asterisks make the expression invalid JavaScript regular-expression syntax. Replace it with the corrected pattern above.
Limitations

- This is client-side validation only. It improves the user experience but does not provide security on its own. Validate all submitted data on the server too.

- The email expression is a basic format check, not proof that an email address exists.
- The phone rule accepts exactly 10 digits and does not support country codes or separators.
- Consider adding HTML attributes such as required, min="18", and suitable type values as an additional layer of browser validation.

# 🧠 Key Concepts Learned

## 1. Form Validation

JavaScript can validate form inputs before processing the submitted data.

```javascript
if (username === "") {
    message.textContent = "Username is required";
}
```

---

## 2. `trim()`

The `trim()` method removes unnecessary spaces from the beginning and end of a string.

```javascript
const username = input.value.trim();
```

This is useful when validating user input.

---

## 3. `length`

The `length` property returns the number of characters in a string.

```javascript
const count = text.length;
```

It can be used for character counting and password length validation.

---

## 4. `input` Event

The `input` event occurs whenever the value of an input element changes.

```javascript
input.addEventListener("input", () => {
    console.log(input.value);
});
```

This is useful for real-time validation and character counters.

---

## 5. Regular Expressions

Regular expressions can be used to check whether a string contains specific types of characters.

### Uppercase Letter

```javascript
/[A-Z]/
```

### Lowercase Letter

```javascript
/[a-z]/
```

### Number

```javascript
/[0-9]/
```

### Special Character

```javascript
/[^A-Za-z0-9]/
```

---

## 6. `test()`

The `test()` method checks whether a regular expression matches a string.

```javascript
/[A-Z]/.test(password);
```

It returns:

```text
true
```

or

```text
false
```

---

## 7. Conditional Validation

Conditions can be combined to create advanced validation logic.

```javascript
if (password.length >= 8) {
    console.log("Valid Length");
} else {
    console.log("Password is too short");
}
```

---

# 📸 Output Screenshots

Each task contains an **Output_Screenshots** folder containing the respective output screenshots.

* **Task-35:** Login Validation Output
* **Task-36:** Character Counter Output
* **Task-37:** Password Strength Output

---

# 📋 Task Summary

| Task    | Project           | Main Concept                     |
| ------- | ----------------- | -------------------------------- |
| Task-35 | Login Validation  | Form Validation                  |
| Task-36 | Character Counter | Input Event + `length`           |
| Task-37 | Password Strength | Validation + Regular Expressions |

---

# 📖 Concepts Covered

* Form Validation
* Input Validation
* DOM Selection
* DOM Manipulation
* Form Events
* Input Events
* `value`
* `trim()`
* `length`
* `input`
* `if...else`
* Conditional Statements
* Regular Expressions
* `test()`
* Password Validation
* Password Strength
* Real-Time Validation
* Dynamic Error Messages
* Dynamic Content Updates

---

