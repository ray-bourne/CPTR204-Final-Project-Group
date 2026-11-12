// Add to Cart 

//Cart Counter (Starts at 0)
let cartCount = 0;

//How many of EACH product is in the cart, e.g. { "Kingston 1TB NVMe SSD": 2 }
let cart = {};

//Add to Cart Function
function addToCart(productName){
    // Add 1 of this product (start at 0 if it's not in the cart yet)
    cart[productName] = (cart[productName] || 0) + 1;
    cartCount = cartCount + 1;
    showCart(productName + " was added to your cart.", "alert-success");
}

//Remove from Cart Function (removes 1 of this product)
function removeFromCart(productName){
    // Only remove if this product is actually in the cart
    if (cart[productName] > 0){
        cart[productName] = cart[productName] - 1;
        cartCount = cartCount - 1;
        showCart("1 " + productName + " was removed from your cart.", "alert-secondary");
    }
    else {
        showCart(productName + " is not in your cart.", "alert-warning");
    }
}

//Empty Cart Function (removes everything)
function emptyCart(){
    if (cartCount > 0){
        cart = {};
        cartCount = 0;
        showCart("Your cart is now empty.", "alert-secondary");
    }
    else {
        showCart("Your cart is already empty.", "alert-warning");
    }
}

//Show the count, the message and the cart list
function showCart(text, colour){
    document.getElementById("cartCount").textContent = cartCount;
    const message = document.getElementById("cartMessage");
    message.className = "alert " + colour + " mt-3 mb-0";
    message.textContent = text;
    updateCartList();
}

//View Cart: rebuild the list of items
function updateCartList(){
    const list = document.getElementById("cartItems");

    // Start with an empty list
    list.innerHTML = "";

    // Go through every product in the cart
    for (const name in cart){
        if (cart[name] > 0){
            list.innerHTML += '<li class="list-group-item d-flex justify-content-between">' +
                name + '<span class="badge text-bg-dark">x ' + cart[name] + '</span></li>';
        }
    }

    // Nothing in the cart
    if (cartCount === 0){
        list.innerHTML = '<li class="list-group-item text-muted">Your cart is empty.</li>';
    }
}