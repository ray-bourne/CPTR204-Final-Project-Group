// Registration Validation Form

document.getElementById("registerForm").addEventListener("submit", function (event) {
    // Stops the form from reloading the page
    event.preventDefault();

    // Gets what the user typed
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value.toLowerCase();
    const phone = document.getElementById("phone").value;
    const deviceType = document.getElementById("deviceType").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;
    const message = document.getElementById("registerMessage");

    // All accounts registered so far (from store.js)
    const users = getUsers();

    // Is this email already registered? (find gives back the account, or undefined)
    const alreadyRegistered = users.find(function (user) {
        return user.email === email;
    });


    // Register Checks

    // Empty Field Check (Validation 1)
    if (firstName === "" || lastName === "" || email === "" || phone === ""
        || deviceType === "" || password === "" || confirmPassword === ""){
            message.className = "alert alert-danger";
            message.textContent = "Please fill out every field before you register";
        }

    // Password Match Check (Validation 2)
    else if(password !== confirmPassword){
        message.className = "alert alert-danger";
        message.textContent = "Your passwords do not match. Please type them again";
    }

    // Terms Checkbox Check (Validation 3)
    else if(terms === false){
        message.className = "alert alert-danger";
        message.textContent = "Please tick the box to agree to the terms and conditions";
    }

    // Email Already Used Check (Validation 4)
    else if(alreadyRegistered !== undefined){
        message.className = "alert alert-danger";
        message.textContent = "An account with this email already exists. Please log in instead";
    }

    // Success Window (saves the account first)
    else{
        users.push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            deviceType: deviceType,
            password: password
        });
        saveUsers(users);

        alert("Registration Successful, " + firstName + ", Thank you for registering with Circuit-Care Island Tech. You can now log in with your email and password.");
        //Send the customer to login page
        window.location.href = "login.html";
    }
});
