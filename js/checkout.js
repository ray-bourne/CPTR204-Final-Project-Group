// Checkout Page

const DELIVERY_FEE = 1000;
const cart = getCart();          // from store.js
const user = getCurrentUser();   // from store.js
const message = document.getElementById("checkoutMessage");


// Checks When the Page Opens

// Empty Cart (nothing to check out)
if (countCart(cart) === 0) {
    message.className = "alert alert-warning";
    message.innerHTML = 'Your cart is empty. <a href="parts.html" class="alert-link">Visit the Parts Shop</a> to add items.';
    document.getElementById("checkoutRow").classList.add("d-none");
}

// Not Logged In (customers must log in to place an order)
else if (user === null || user.role !== "customer") {
    message.className = "alert alert-warning";
    message.innerHTML = 'Please <a href="login.html" class="alert-link">log in</a> with your customer account to place your order. ' +
        'No account? <a href="register.html" class="alert-link">Register here</a>.';

    // Come back here after logging in (login.js reads this)
    localStorage.setItem("ccAfterLogin", "checkout.html");
    document.getElementById("checkoutForm").classList.add("d-none");
}

// Logged In (fill in their details from their account)
else {
    const account = getUsers().find(function (u) {
        return u.email === user.email;
    });

    if (account !== undefined) {
        document.getElementById("fullName").value = account.firstName + " " + account.lastName;
        document.getElementById("checkoutPhone").value = account.phone;
    }
}


// Order Summary
function showSummary() {
    const list = document.getElementById("summaryList");
    let subtotal = 0;
    list.innerHTML = "";

    for (const name in cart) {
        const lineTotal = cart[name].qty * cart[name].price;
        subtotal = subtotal + lineTotal;

        list.innerHTML += '<li class="list-group-item d-flex justify-content-between px-0">' +
            '<span>' + name + ' <span class="text-muted">x ' + cart[name].qty + '</span></span>' +
            '<span>' + money(lineTotal) + '</span></li>';
    }

    // Delivery costs extra, pickup is free
    let fee = 0;
    if (document.getElementById("deliveryMethod").value === "Delivery") {
        fee = DELIVERY_FEE;
    }

    document.getElementById("deliveryFee").textContent = fee === 0 ? "Free" : money(fee);
    document.getElementById("orderTotal").textContent = money(subtotal + fee);

    return { subtotal: subtotal, fee: fee, total: subtotal + fee };
}
showSummary();


// Show or Hide the Address Box
document.getElementById("deliveryMethod").addEventListener("change", function () {
    if (this.value === "Delivery") {
        document.getElementById("addressBox").classList.remove("d-none");
    }
    else {
        document.getElementById("addressBox").classList.add("d-none");
    }
    showSummary();
});


// Show or Hide the Card Box
document.getElementById("payCard").addEventListener("change", function () {
    document.getElementById("cardBox").classList.remove("d-none");
});

document.getElementById("payLater").addEventListener("change", function () {
    document.getElementById("cardBox").classList.add("d-none");
});


// Place Order (Validation)
document.getElementById("checkoutForm").addEventListener("submit", function (event) {
    // Stops the form from reloading the page
    event.preventDefault();

    // Gets what the user typed
    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("checkoutPhone").value;
    const method = document.getElementById("deliveryMethod").value;
    const address = document.getElementById("address").value;
    const payByCard = document.getElementById("payCard").checked;
    const cardName = document.getElementById("cardName").value;
    const cardNumber = document.getElementById("cardNumber").value.split(" ").join("");   // removes spaces
    const cardExpiry = document.getElementById("cardExpiry").value;
    const cardCvv = document.getElementById("cardCvv").value;


    // Checkout Checks

    // Empty Field Check (Validation 1)
    if (fullName === "" || phone === "") {
        message.className = "alert alert-danger";
        message.textContent = "Please enter your full name and phone number.";
    }

    // Address Check (Validation 2) - only for delivery
    else if (method === "Delivery" && address === "") {
        message.className = "alert alert-danger";
        message.textContent = "Please enter your delivery address.";
    }

    // Card Checks (Validation 3) - only when paying online
    else if (payByCard && cardName === "") {
        message.className = "alert alert-danger";
        message.textContent = "Please enter the name on the card.";
    }

    else if (payByCard && (cardNumber.length !== 16 || isNaN(cardNumber))) {
        message.className = "alert alert-danger";
        message.textContent = "The card number must be exactly 16 digits.";
    }

    else if (payByCard && (cardExpiry.length !== 5 || cardExpiry[2] !== "/")) {
        message.className = "alert alert-danger";
        message.textContent = "Please enter the expiry date as MM/YY, for example 08/28.";
    }

    else if (payByCard && (cardCvv.length !== 3 || isNaN(cardCvv))) {
        message.className = "alert alert-danger";
        message.textContent = "The CVV must be exactly 3 digits.";
    }

    // Order Placed (saves the order, never the card details - only the last 4 digits)
    else {
        const totals = showSummary();
        const orders = getOrders();
        const orderNumber = "CC" + (1001 + orders.length);

        let payment = "Pay on " + method.toLowerCase();
        if (payByCard) {
            payment = "Card ending " + cardNumber.slice(-4);
        }

        orders.push({
            number: orderNumber,
            customer: fullName,
            email: user.email,
            phone: phone,
            items: cart,
            method: method,
            address: method === "Delivery" ? address : "Store pickup",
            payment: payment,
            total: totals.total,
            date: new Date().toLocaleString()
        });
        saveOrders(orders);

        // Empty the cart
        saveCart({});

        // Success Window and Message on the Page
        alert("Order placed! Your order number is " + orderNumber + ". Thank you for shopping with Circuit-Care Island Tech.");
        document.getElementById("checkoutRow").classList.add("d-none");

        message.className = "alert alert-success";
        message.innerHTML = "<strong>Thank you, " + fullName + "!</strong> Your order <strong>" + orderNumber +
            "</strong> (" + money(totals.total) + ") has been placed. " +
            (method === "Delivery" ? "We will call you to arrange delivery." : "We will call you when it is ready for pickup.") +
            ' <a href="index.html" class="alert-link">Back to Home</a>';
    }

    // Scrolls up so the person can see the message
    message.scrollIntoView({ behavior: "smooth", block: "center" });
});
