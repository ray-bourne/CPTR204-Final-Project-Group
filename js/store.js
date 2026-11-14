// Shared Code (Linked on Every Page)
// Saves accounts, the logged in user, the cart and orders in the browser
// with localStorage, and changes the navbar when someone is logged in


// How localStorage Works
// localStorage can only save text, so lists and objects are turned into text
// with JSON.stringify() when saving, and back with JSON.parse() when reading

// Read Something Saved (or use a starting value if nothing is saved yet)
function loadData(key, startValue) {
    const saved = localStorage.getItem(key);

    if (saved === null) {
        return startValue;
    }
    return JSON.parse(saved);
}

// Save Something
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


// Accounts
// All registered customers, e.g. [ { firstName, lastName, email, ... }, ... ]
function getUsers() {
    return loadData("ccUsers", []);
}

function saveUsers(users) {
    saveData("ccUsers", users);
}


// Who Is Logged In
// Remember me ticked = localStorage (stays after closing the browser)
// Remember me not ticked = sessionStorage (cleared when the browser closes)
function getCurrentUser() {
    const saved = sessionStorage.getItem("ccCurrentUser") || localStorage.getItem("ccCurrentUser");

    if (saved === null) {
        return null;
    }
    return JSON.parse(saved);
}

function setCurrentUser(user, rememberMe) {
    const text = JSON.stringify(user);

    if (rememberMe) {
        localStorage.setItem("ccCurrentUser", text);
    }
    else {
        sessionStorage.setItem("ccCurrentUser", text);
    }
}

// Logout
function logout() {
    localStorage.removeItem("ccCurrentUser");
    sessionStorage.removeItem("ccCurrentUser");
    alert("You have been logged out.");
    window.location.href = "index.html";
}


// Cart
// The cart looks like { "Kingston 1TB NVMe SSD": { qty: 2, price: 11500 }, ... }
function getCart() {
    return loadData("ccCart", {});
}

function saveCart(cart) {
    saveData("ccCart", cart);
}

// Total Number of Items in the Cart
function countCart(cart) {
    let count = 0;

    for (const name in cart) {
        count = count + cart[name].qty;
    }
    return count;
}


// Orders
function getOrders() {
    return loadData("ccOrders", []);
}

function saveOrders(orders) {
    saveData("ccOrders", orders);
}


// Money (11500 becomes "$11,500")
function money(amount) {
    return "$" + amount.toLocaleString("en-US");
}


// Navbar (shows "Hi, name" and Logout when someone is logged in)
function updateNavbar() {
    const user = getCurrentUser();

    // Nobody logged in: keep the Login and Register buttons
    if (user === null) {
        return;
    }

    // The box that holds the Login and Register buttons
    const loginButton = document.querySelector('.navbar a[href="login.html"]');
    if (loginButton === null) {
        return;
    }
    const navButtons = loginButton.parentElement;

    // Admin: Admin Panel button and Logout
    if (user.role === "admin") {
        navButtons.innerHTML =
            '<span class="navbar-text text-white me-1">Hi, Admin</span>' +
            '<a class="btn btn-warning" href="admin.html">Admin Panel</a>' +
            '<button type="button" class="btn btn-outline-light" onclick="logout()">Logout</button>';
    }

    // Customer: their name and Logout
    else {
        navButtons.innerHTML =
            '<span class="navbar-text text-white me-1">Hi, ' + user.name + '</span>' +
            '<button type="button" class="btn btn-outline-light" onclick="logout()">Logout</button>';
    }
}

// Run when the page has finished loading
document.addEventListener("DOMContentLoaded", updateNavbar);
