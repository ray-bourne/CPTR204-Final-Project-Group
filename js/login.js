// Login Validation Form

document.getElementById("loginForm").addEventListener("submit", function(event) {
    // Stop the form from reloading page
    event.preventDefault();

    // Gets what user typed
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const message = document.getElementById("loginMessage");

    // Looks for a registered customer with this email and password (from store.js)
    const customer = getUsers().find(function (user) {
        return user.email === username && user.password === password;
    });

    // Empty Field Check (Validation 1)
    if (username === "" || password === ""){
        message.className = "alert alert-danger";
        message.textContent = "Please enter both your email and password";
    }

    // Admin Log in Check (Validation 2) - goes to the Admin Panel
    else if(username === "islandtech" && password === "Repair876"){
        setCurrentUser({ name: "Admin", email: "islandtech", role: "admin" }, rememberMe);
        alert("Log in successful! Welcome, Admin");
        window.location.href = "admin.html";
    }

    // Customer Log in Check (Validation 3) - an account made on the Register page
    else if(customer !== undefined){
        setCurrentUser({ name: customer.firstName, email: customer.email, role: "customer" }, rememberMe);
        alert("Log in successful! Welcome back, " + customer.firstName);

        // Came from Checkout? Go back there, otherwise go to Services
        const goBackTo = localStorage.getItem("ccAfterLogin");
        localStorage.removeItem("ccAfterLogin");
        if (goBackTo !== null) {
            window.location.href = goBackTo;
        }
        else {
            window.location.href = "services.html";
        }
    }

    // Wrong Email or Password
    else {
        message.className = "alert alert-danger";
        message.textContent = "Log in failed. Please check your email and password";
    }
});
