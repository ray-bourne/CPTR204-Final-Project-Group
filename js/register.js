// Registration Validation Form

document.getElementById("registerForm").addEventListener("submit", function (event) {
    // Stops the form from reloading the page
    event.preventDefault();

    // Gets what the user typed
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const deviceType = document.getElementById("deviceType").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;
    const message = document.getElementById("registerMessage");


    // Regsiter Checks

    // Empty Field Check 
    if (firstName === "" || lastName === "" || email === "" || phone === ""
        || deviceType === "" || password === "" || confirmPassword === ""){
            message.className = "alert alert-danger";
            message.textContent = "Please fil out every field before you register";
        }

    // Password Match Check
    else if(password !== confirmPassword){
        message.className = "alert alert-danger";
        message.textContent = "Your passwords do not match. Please type them again";
    }

    // Terms Checkbox Check
    else if(terms === false){
        message.className = "alert alert-danger";
        message.textContent = "Please tick the box to agree to the terms and conditions";
    }

    // Success Window
    else{
        alert("Registration Successful, " + firstName + ", Thank you for registering with Circuit-Care Island Tech");
        //Send the customer to login page
        window.location.href = "login.html";
    }
});
