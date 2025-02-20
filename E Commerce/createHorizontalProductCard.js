


export const creatHorizontalProductCard = (products,parentElement, pageType) =>{
    for(let product of products){
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-horizontal", "d-flex", "shadow");

        //image container
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("card-hori-image-container","relative");

        const image = document.createElement("img");
        image.classList.add("card-image");
        image.setAttribute("src",product.img);
        image.setAttribute("alt",product.alt);

        imageContainer.appendChild(image);
        cardContainer.appendChild(imageContainer);
        
        ///card details container
        const cardDetailsContainer = document.createElement("div");
        cardDetailsContainer.classList.add("card-details","d-flex","direction-column");

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
        cardPrice.classList.add("card-price");
        cardPrice.innerHTML = `Rs. ${product.newPrice} <span class="price-strike-through"> Rs. ${product.oldPrice}</span> 
                               <span class="discount padding-all-8"> (${product.discount}% OFF)</span>`;

        descriptionContainer.appendChild(cardPrice);
        cardDetailsContainer.appendChild(descriptionContainer);

        // Quantity container
        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container", "d-flex", "gap")

        const qTitle = document.createElement("p");
        qTitle.classList.add("q-title");
        qTitle.innerText = "Quantity";
        quantityContainer.appendChild(qTitle);

        const countContainer = document.createElement("div");
        countContainer.classList.add("count-container","d-flex","align-center","gap");

        const minusBtn = document.createElement("button");
        minusBtn.classList.add("count");
        minusBtn.setAttribute("data-type" ,"minus")
        minusBtn.setAttribute("data-id", product._id);
        minusBtn.innerText = "-";
        countContainer.appendChild(minusBtn);

        const countValue = document.createElement("span");

        countValue.classList.add("count-value");
        countValue.setAttribute("data-type",product._id);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item._id === product._id);
        countValue.innerText = existingItem ? existingItem.quantity || 1 : 1;
        
        countContainer.appendChild(countValue);

        const plusBtn = document.createElement("button");
        plusBtn.classList.add("count");
        plusBtn.setAttribute("data-type" ,"plus")
        plusBtn.setAttribute("data-id", product._id);

        plusBtn.innerText = "+";
        countContainer.appendChild(plusBtn);

        quantityContainer.appendChild(countContainer);

        if(pageType==="cart"){
            cardDetailsContainer.appendChild(quantityContainer);
        }


        //CTA Button Container
        const ctaBtn = document.createElement("div");
        ctaBtn.classList.add("cta-btn","d-flex","gap")
        const ctaButton = document.createElement("div");
        ctaButton.classList.add("cta-btn");

        

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("button",
             "btn-primary", 
             "hori-btn",
             "btn-icon", 
         
              "d-flex", 
              "align-center", 
              "justify-center", 
              "gap", 
              "cursor", 
              "btn-margin");
        removeBtn.setAttribute("data-id", product._id);
        removeBtn.setAttribute("data-type", "remove");
        removeBtn.innerText = "Remove";
        ctaButton.appendChild(removeBtn);
        ctaBtn.appendChild(ctaButton);

        const ctaButton1 = document.createElement("div");
        ctaButton1.classList.add("cta-btn");
        const saveBtn = document.createElement("button");
        saveBtn.classList.add("button",
             "btn-primary", 
             "hori-btn",
             "btn-icon", 
         
              "d-flex", 
              "align-center", 
              "justify-center", 
              "gap", 
              "cursor", 
              "btn-margin");
        saveBtn.setAttribute("data-id", product._id);
        saveBtn.setAttribute("data-type", "save");

        saveBtn.innerText = (pageType==="cart") ? "Save To Wishlist ❤️": "Move to Cart";
        ctaButton1.appendChild(saveBtn);
        ctaBtn.appendChild(ctaButton1);

        cardDetailsContainer.appendChild(ctaBtn);
        cardContainer.appendChild(cardDetailsContainer);
        parentElement.appendChild(cardContainer);




       







    }   
}
