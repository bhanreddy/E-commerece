import { createProductCard } from "./createProductCard.js";
import { findProductInCart } from "./utils/findProductInCart.js"
import { creatHorizontalProductCard } from "./createHorizontalProductCard.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart = cart.map(item => ({
    ...item,
    quantity: item.quantity !== undefined ? item.quantity : 1 // Preserve existing quantity
}));

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const cartContainer = document.getElementById("cart");
const cartLength = document.querySelector(".products-count");
const productOldPrice = document.querySelector(".products-price");
const productDicount = document.querySelector(".products-discount");
const total = document.querySelector(".total-amount");
const save = document.querySelector(".save-discount");

function updateCartUI() {
    cartLength.innerText = cart.length;
    
    let oldPriceValue = 0, discountValue = 0, finalValue = 0;
    for (let cartItem of cart) {
        oldPriceValue += cartItem.quantity*cartItem.oldPrice;
        finalValue += cartItem.quantity*cartItem.newPrice;
    }
    discountValue = oldPriceValue - finalValue;

    productOldPrice.innerText = oldPriceValue;
    productDicount.innerText = discountValue;
    total.innerText = finalValue;
    save.innerText = discountValue;
}

cartContainer.addEventListener("click", (event) => {
    const itemId = event.target.dataset.id; // `itemId` is a string
    console.log("Clicked item ID:", itemId); // Debugging

    if (event.target.dataset.type === "remove") {
        cart = cart.filter(({ _id }) => _id !== itemId);
    } else if (event.target.dataset.type === "save") {
        const productToSave = cart.find(({ _id }) => _id === itemId);
        if (productToSave) wishlist.push(productToSave);
        cart = cart.filter(({ _id }) => _id !== itemId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else if (event.target.dataset.type === "minus") {
        cart = cart.map(item => {
            if (item._id == itemId) { // Loose comparison to match string/number
                return { ...item, quantity: item.quantity-1 };
            }
            return item;
        });
        cart = cart.filter(item => item.quantity > 0);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartContainer.innerHTML = "";
        creatHorizontalProductCard(cart, cartContainer, "cart");
    } else if (event.target.dataset.type === "plus") {
        cart = cart.map(item => {
            if (item._id == itemId) { // Loose comparison to match string/number
                return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartContainer.innerHTML = "";
    creatHorizontalProductCard(cart, cartContainer, "cart");
    updateCartUI();
});


// Initialize UI
creatHorizontalProductCard(cart, cartContainer, "cart");
updateCartUI();
