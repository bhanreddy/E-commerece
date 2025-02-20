import { products } from "./db/products.js";
import {createProductCard} from "./createProductCard.js";
import {findProductInCart} from "./utils/findProductInCart.js";
const productContainer = document.getElementById("products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];


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

createProductCard(products,productContainer,findProductInCart,"products");