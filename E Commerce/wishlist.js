import {creatHorizontalProductCard} from "./createHorizontalProductCard.js";

let wishlistContainer = document.getElementById("wishlist");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =JSON.parse(localStorage.getItem("wishlist")) || [];

wishlistContainer.addEventListener("click",(event)=>{
    if(event.target.dataset.type === "remove"){
        
        wishlist = wishlist.filter(({_id})=>_id !== event.target.dataset.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        wishlistContainer.innerText = "";
        creatHorizontalProductCard(wishlist , wishlistContainer,"wishlist");


    }else if(event.target.dataset.type === "save"){
        const productToSave = wishlist.filter(({ _id }) => _id === event.target.dataset.id);
        cart = [...cart,...productToSave];
        localStorage.setItem("cart",JSON.stringify(cart));

        wishlist = wishlist.filter(({_id})=>_id !== event.target.dataset.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        wishlistContainer.innerText = "";
        creatHorizontalProductCard(wishlist , wishlistContainer,"wishlist");


    }
    
})



creatHorizontalProductCard(wishlist , wishlistContainer,"wishlist");

