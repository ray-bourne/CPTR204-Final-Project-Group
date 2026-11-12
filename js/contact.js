// Contact Validation Form

document.getElementById("contactForm").addEventListener("submit", function(event){
    // Stops the form from reloading page
    event.preventDefault();

    //Gets what the user typed
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const text = document.getElementById("contactText").value;
    const message = document.getElementById("contactMessage");

    // Contact Checks

    // Empty Field Check
    if (name === "" || email === "" || subject === "" || text === ""){
        message.className = "alert alert-danger";
        message.textContent = "Please fill out all four fields before sending your message";
    }

    // Message Sent
    else{
        message.className = "alert alert-success";
        message.textContent = "Thank you, " + name + "! Your message has been sent. We will reply within 24 hours.";

        // Clear the form
        document.getElementById("contactForm").reset();
    }

});