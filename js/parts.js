// Add to Cart

// The cart is saved in the browser (store.js), so it is still there
// after a refresh and on the Checkout page
// e.g. { "Kingston 1TB NVMe SSD": { qty: 2, price: 11500 } }
let cart = getCart();

// Show the saved cart as soon as the page opens
updateCartCount();
updateCartList();


// Add to Cart Function (the price comes from the button)
function addToCart(productName, price){
    // Not in the cart yet? Start it at 0
    if (cart[productName] === undefined){
        cart[productName] = { qty: 0, price: price };
    }

    cart[productName].qty = cart[productName].qty + 1;
    showCart(productName + " was added to your cart.", "alert-success");
}


// Remove from Cart Function (removes 1 of this product)
function removeFromCart(productName){
    // Only remove if this product is actually in the cart
    if (cart[productName] !== undefined){
        cart[productName].qty = cart[productName].qty - 1;

        // None left? Take it out of the cart completely
        if (cart[productName].qty === 0){
            delete cart[productName];
        }
        showCart("1 " + productName + " was removed from your cart.", "alert-secondary");
    }

    else {
        showCart(productName + " is not in your cart.", "alert-warning");
    }
}


// Empty Cart Function (removes everything)
function emptyCart(){
    if (countCart(cart) > 0){
        cart = {};
        showCart("Your cart is now empty.", "alert-secondary");
    }

    else {
        showCart("Your cart is already empty.", "alert-warning");
    }
}


// Save the Cart, Show the Count, the Message and the Cart List
function showCart(text, colour){
    saveCart(cart);
    updateCartCount();

    const message = document.getElementById("cartMessage");
    message.className = "alert " + colour + " mt-3 mb-0";
    message.textContent = text;

    updateCartList();
}


// Show the Number of Items in the Badge
function updateCartCount(){
    document.getElementById("cartCount").textContent = countCart(cart);
}


// View Cart (rebuilds the list of items, the total and the Checkout button)
function updateCartList(){
    const list = document.getElementById("cartItems");
    let total = 0;

    // Start with an empty list
    list.innerHTML = "";

    // Go through every product in the cart
    for (const name in cart){
        const item = cart[name];
        const lineTotal = item.qty * item.price;
        total = total + lineTotal;

        list.innerHTML += '<li class="list-group-item d-flex justify-content-between align-items-center">' +
            '<span>' + name + '<br><small class="text-muted">' + money(item.price) + ' each</small></span>' +
            '<span>' +
            '<button type="button" class="btn btn-outline-danger btn-sm" onclick="removeFromCart(\'' + name + '\')">−</button>' +
            '<span class="badge text-bg-dark mx-2">x ' + item.qty + '</span>' +
            '<button type="button" class="btn btn-outline-success btn-sm" onclick="addToCart(\'' + name + '\', ' + item.price + ')">+</button>' +
            '<strong class="ms-3">' + money(lineTotal) + '</strong>' +
            '</span></li>';
    }

    // Nothing in the cart
    if (countCart(cart) === 0){
        list.innerHTML = '<li class="list-group-item text-muted">Your cart is empty.</li>';
    }

    // Something in the cart: show the Total and the Checkout button
    else {
        list.innerHTML += '<li class="list-group-item d-flex justify-content-between align-items-center bg-soft">' +
            '<strong>Total: ' + money(total) + '</strong>' +
            '<a href="checkout.html" class="btn btn-circuit btn-sm">Checkout</a></li>';
    }
}
