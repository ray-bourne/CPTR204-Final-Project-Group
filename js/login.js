// Login Validation Form

document.getElementById("loginForm").addEventListener("submit", function(event) {
    // Stop the form from reloading page
    event.preventDefault();

    // Gets what user typed
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    // Empty field check (Validation 1)
    if (username === "" || password === ""){
        message.className = "alert alert-danger";
        message.textContent = "Please enter both your username and password";
    }

    // Correct Log in check (Validation 2)
    else if(username === "islandtech" && password === "Repair876"){
        alert("Log in successful! Welcome back to Circuit-Care Island Tech");
        window.location.href = "services.html";
    }

    // Wrong Username or Password
    else {
        message.className = "alert alert-danger";
        message.textContent = "Log in failed. Please check your username and password";
    }
});