export const createProductCard = (products, parentElement, findProductInCart, pageType) => {
    const cartData = JSON.parse(localStorage.getItem("cart")); // Parse once

    for (let product of products) {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card", "card-vertical", "d-flex", "direction-column", "relative", "shadow");

        // Image container
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("card-image-container");

        const image = document.createElement("img");
        image.classList.add("card-image");
        image.setAttribute("src", product.img);
        image.setAttribute("alt", product.alt);
        imageContainer.appendChild(image);

        // Card details container
        const cardDetailsContainer = document.createElement("div");
        cardDetailsContainer.classList.add("card-details");

        // Card title
        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = product.brand;
        cardDetailsContainer.appendChild(cardTitle);

        // Description container
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("card-description");

        const cardDescription = document.createElement("p");
        cardDescription.classList.add("card-des");
        cardDescription.innerText = product.name;
        descriptionContainer.appendChild(cardDescription);

        // Price container
        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card-price", "d-flex", "align-end", "gap-sm");
        cardPrice.innerHTML = `Rs. ${product.newPrice} <span class="price-strike-through"> Rs. ${product.oldPrice}</span> 
                               <span class="discount"> (${product.discount}% OFF)</span>`;

        descriptionContainer.appendChild(cardPrice);

        // Ratings
        const ratings = document.createElement("p");
        ratings.classList.add("d-flex", "align-center");
        ratings.innerHTML = `${product.rating} <span class="material-icons-outlined star">star</span>`;

        descriptionContainer.appendChild(ratings);
        cardDetailsContainer.appendChild(descriptionContainer);

        // Cart button
        const cartBtnContainer = document.createElement("div");
        cartBtnContainer.classList.add("cta-btn");

        const cartBtn = document.createElement("button");
        cartBtn.classList.add("button", "btn-primary", "btn-icon", "cart-btn", "d-flex", "align-center", "justify-center", "gap", "cursor", "btn-margin");
        cartBtn.setAttribute("data-id", product._id);

        const isProductInCart = findProductInCart(cartData, product._id);
        cartBtn.innerHTML = (pageType === "cart") 
            ? `<img src="https://uilight.netlify.app/assets/delete.png" alt="cart"> Remove`
            : (pageType === "products" && isProductInCart) 
                ? `Go To Cart <img src="https://uilight.netlify.app/assets/cart-white.png" alt="cart">`
                : `<img src="https://uilight.netlify.app/assets/cart-white.png" alt="cart"> Add To Cart`;

        cartBtnContainer.appendChild(cartBtn);
        cardDetailsContainer.appendChild(cartBtnContainer);
        cardContainer.appendChild(imageContainer);
        cardContainer.appendChild(cardDetailsContainer);

        parentElement.appendChild(cardContainer);
    }
};
