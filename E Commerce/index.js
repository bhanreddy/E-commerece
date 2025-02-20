import { products } from "./db/products.js";
import {createProductCard} from "./createProductCard.js";
import {findProductInCart} from "./utils/findProductInCart.js";
const productContainer = document.getElementById("products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const filterContainer = document.querySelector(".filter-container");



productContainer.addEventListener("click",(event)=>{

    const cartButton = event.target.closest("button");
    const isProductInCart = findProductInCart(cart,cartButton.dataset.id);
    if (!cartButton) return;
    if(!isProductInCart){
        let productToAddToCart = products.filter(
            ({_id})=>_id === event.target.dataset.id
        );
        cart = [...cart,...productToAddToCart];
        localStorage.setItem("cart",JSON.stringify(cart));
        
        cartButton.innerHTML = `Go To Cart <img src="https://uilight.netlify.app/assets/cart-white.png" alt="cart">`;
    }else{
        location.href = "/cart.html";
    }
});

filterContainer.addEventListener("click",(event=>{
    const updatedProduct = products.filter(({rating})=> rating >=Number(event.target.dataset.rating));
    productContainer.innerHTML = "";
    createProductCard(updatedProduct,productContainer,findProductInCart,"products");
}))
createProductCard(products,productContainer,findProductInCart,"products");

