// Toggling password visibility
// For password
const pass = document.getElementById('password');
const toggleBtn = document.getElementById('togglepswd');
toggleBtn.addEventListener('click', function () {
    if (pass.type === 'password') {
        pass.type = 'text';
        toggleBtn.setAttribute('class', 'fas fa-eye');
    } else {
        pass.type = 'password';
        toggleBtn.setAttribute('class', 'fas fa-eye-slash');
    }
});

// For confirm password
const confirmpass = document.getElementById('confirm-password');
const toggleBtn1 = document.getElementById('togglepswd1');
toggleBtn1.addEventListener('click', function () {
    if (confirmpass.type === 'password') {
        confirmpass.type = 'text';
        toggleBtn1.setAttribute('class', 'fas fa-eye');
    } else {
        confirmpass.type = 'password';
        toggleBtn1.setAttribute('class', 'fas fa-eye-slash');
    }
});

// Validating email and passwords on form submission
const form = document.querySelector("form");
const email = document.getElementById("email");
const pass1 = document.getElementById("password");
const confirmpass1 = document.getElementById("confirm-password");

form.addEventListener("submit", function (e) {
    // Reset custom validity messages
    email.setCustomValidity('');
    pass1.setCustomValidity('');
    confirmpass1.setCustomValidity('');

    // Validate email
    if (!email.value.includes("@gmail.com")) {
        e.preventDefault(); // Prevent form submission
        email.setCustomValidity("Invalid Email Address. Please use a Gmail address.");
        email.reportValidity(); // Show the error message
    }

    // Validate password length
    if (pass1.value.length < 8) {
        e.preventDefault(); // Prevent form submission
        pass1.setCustomValidity("Password must be at least 8 characters long.");
        pass1.reportValidity(); // Show the error message
    }

    // Validate confirm password matches the original password
    if (pass1.value !== confirmpass1.value) {
        e.preventDefault(); // Prevent form submission
        confirmpass1.setCustomValidity("Passwords do not match.");
        confirmpass1.reportValidity(); // Show the error message
    }
});

// Reset validity messages on input change otherwuse need to refresh the page everytime ..bcz the validity msg doesnt go
email.addEventListener('input', function () {
    email.setCustomValidity(''); 
});

pass1.addEventListener('input', function () {
    pass1.setCustomValidity(''); 
});

confirmpass1.addEventListener('input', function () {
    confirmpass1.setCustomValidity(''); // 
});


  