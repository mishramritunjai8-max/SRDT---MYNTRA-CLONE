// Add products to the bag
let bagCount = 0;

const addButtons = document.querySelectorAll(".add-button");
const bagCountText = document.getElementById("bagCount");

addButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        bagCount = bagCount + 1;
        bagCountText.textContent = bagCount;

        button.textContent = "ADDED";
        setTimeout(function() {
            button.textContent = "ADD TO BAG";
        }, 900);
    });
});

// Search products by their name
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");
const emptyMessage = document.getElementById("emptyMessage");

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleProducts = 0;

    productCards.forEach(function(card) {
        const productName = card.querySelector("h3").textContent.toLowerCase();
        const brandName = card.querySelector(".brand-name").textContent.toLowerCase();

        if (productName.includes(searchText) || brandName.includes(searchText)) {
            card.style.display = "block";
            visibleProducts++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleProducts === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
});

// Show a message after newsletter form submission
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");

newsletterForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (emailInput.value.trim() === "") {
        alert("Please enter your email address.");
        return;
    }

    alert("Thanks for subscribing! See you in your inbox.");
    newsletterForm.reset();
});
