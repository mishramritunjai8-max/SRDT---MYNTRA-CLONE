
// Shopping bag counter
let bagCount = 0;

const bagCountElement = document.getElementById("bagCount");
const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        bagCount++;

        bagCountElement.textContent = bagCount;
        button.textContent = "ADDED TO BAG";

        showMessage("Product added to your bag!");

        setTimeout(function() {
            button.textContent = "ADD TO BAG";
        }, 1000);
    });
});


// Small message notification
const toast = document.getElementById("toast");

function showMessage(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2200);
}


// Wishlist buttons
const wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.classList.toggle("selected");

        if (button.classList.contains("selected")) {
            button.textContent = "♥";
            showMessage("Added to your wishlist!");
        } else {
            button.textContent = "♡";
            showMessage("Removed from your wishlist.");
        }
    });
});


// Product search and category filters
const searchInput = document.getElementById("searchInput");
const productCards = Array.from(document.querySelectorAll(".product-card"));
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");

let selectedCategory = "All";

function updateProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    productCards.forEach(function(card) {
        const productName = card.querySelector("h3").textContent.toLowerCase();
        const brandName = card.querySelector(".brand").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            productName.includes(searchText) ||
            brandName.includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", updateProducts);

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedCategory = button.dataset.filter;

        filterButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        updateProducts();
    });
});


// Category cards also apply the matching product filter
const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(function(card) {
    card.addEventListener("click", function() {
        selectedCategory = card.dataset.category;

        filterButtons.forEach(function(button) {
            button.classList.toggle(
                "active",
                button.dataset.filter === selectedCategory
            );
        });

        updateProducts();
    });
});


// Sort products by price
const sortSelect = document.getElementById("sortProducts");
const productGrid = document.getElementById("productGrid");

sortSelect.addEventListener("change", function() {
    const sortValue = sortSelect.value;

    let sortedProducts = [...productCards];

    if (sortValue === "low") {
        sortedProducts.sort(function(a, b) {
            return Number(a.dataset.price) - Number(b.dataset.price);
        });
    } else if (sortValue === "high") {
        sortedProducts.sort(function(a, b) {
            return Number(b.dataset.price) - Number(a.dataset.price);
        });
    }

    sortedProducts.forEach(function(card) {
        productGrid.appendChild(card);
    });

    updateProducts();
});


// Newsletter form
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");

newsletterForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (emailInput.value.trim() === "") {
        showMessage("Please enter your email address.");
        return;
    }

    showMessage("Thanks for subscribing!");
    newsletterForm.reset();
});
