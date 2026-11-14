// Admin Panel

const user = getCurrentUser();   // from store.js


// Admin Only (anyone else is sent to the login page)
if (user === null || user.role !== "admin") {
    document.getElementById("adminArea").classList.add("d-none");
    alert("Admins only. Please log in with the admin account.");
    window.location.href = "login.html";
}
else {
    showAdminData();
}


// Fill In the Cards and Tables
function showAdminData() {
    const users = getUsers();
    const orders = getOrders();

    // Summary Cards
    let sales = 0;
    for (const order of orders) {
        sales = sales + order.total;
    }

    document.getElementById("customerCount").textContent = users.length;
    document.getElementById("orderCount").textContent = orders.length;
    document.getElementById("salesTotal").textContent = money(sales);


    // Customers Table
    const customerRows = document.getElementById("customerRows");
    customerRows.innerHTML = "";

    for (const u of users) {
        customerRows.innerHTML += "<tr><td>" + u.firstName + " " + u.lastName + "</td><td>" + u.email +
            "</td><td>" + u.phone + "</td><td>" + u.deviceType + "</td></tr>";
    }

    if (users.length === 0) {
        customerRows.innerHTML = '<tr><td colspan="4" class="text-muted">No customers have registered yet.</td></tr>';
    }


    // Orders Table (newest first)
    const orderRows = document.getElementById("orderRows");
    orderRows.innerHTML = "";

    for (let i = orders.length - 1; i >= 0; i--) {
        const order = orders[i];

        // Turns the items into text like "Kingston 1TB NVMe SSD x2"
        let items = "";
        for (const name in order.items) {
            items = items + name + " x" + order.items[name].qty + "<br>";
        }

        orderRows.innerHTML += "<tr><td>" + order.number + "</td><td>" + order.customer + "<br><small class='text-muted'>" +
            order.phone + "</small></td><td>" + items + "</td><td>" + order.method + "<br><small class='text-muted'>" +
            order.address + "</small></td><td>" + order.payment + "</td><td>" + money(order.total) + "</td><td>" + order.date + "</td></tr>";
    }

    if (orders.length === 0) {
        orderRows.innerHTML = '<tr><td colspan="7" class="text-muted">No orders yet.</td></tr>';
    }
}


// Clear Test Data (before the presentation)
function clearDemoData() {
    if (confirm("Delete ALL registered customers and orders? This cannot be undone.")) {
        saveUsers([]);
        saveOrders([]);
        showAdminData();
    }
}
