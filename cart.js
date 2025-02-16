const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click",() => cart.classList.add("active"));
cartClose.addEventListener("click",() => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", Event => { 
        const productBox = Event.target.closest(".product-box");
        addToCart(productBox);
    });
});







const cartContent = document.querySelector(".cart-content");

const addToCart = (product) => {
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    let productAlreadyInCart = false;

    for (let item of cartItems) {
        if (item.textContent.trim() === product.name.trim()) {
            alert("This item is already in the cart.");
            productAlreadyInCart = true;
            break;
        }
    }

    if (productAlreadyInCart) return;

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${product.image}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${product.name}</h2>
            <span class="cart-price">€${product.price}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-fill cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);
    



    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove(); 

        updateCartCount(-1); // aggiorna il totale degli oggetti dopo che un oggetto è stato rimosso

        updateTotalPrice(); // aggiorna il totale della spesa dopo che un oggetto è stato rimosso
    });


    

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector(".decrement");
        let quantity = numberElement.textContent;

        if (event.target.classList.contains("decrement") && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999"; // Correct way to set style
            }
        } else if (event.target.classList.contains("increment")) {
            alert("This item is unique, you cannot add more!");
            decrementButton.style.color = "#333"; // Correct way to set style
        }

        numberElement.textContent = quantity;

        updateTotalPrice(); // aggiorna il totale della spesa dopo che è stata aumentata o diminuita la quantità di un oggetto
    });

    updateCartCount(1); // aggiorna il totale degli oggetti dopo che un oggetto è stato aggiunto al carrello
    updateTotalPrice(); // aggiorna il totale della spesa dopo che un oggetto è stato aggiunto al carrello
    
};


// Modifica principale: delega di eventi
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-cart')) {
        const productBox = event.target.closest('.product-box');
        if (productBox) {
            const product = {
                image: productBox.querySelector('.image-box img').src,
                name: productBox.querySelector('.product-title').textContent,
                price: parseInt(productBox.querySelector('.price').textContent.replace('€', '')),
            };
            addToCart(product);
        } else {
            console.error("Product box not found!");
        }
    }
});




// Funzione per aggiornare il totale della spesa nel carrello
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("€", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `€ ${total}`;
};    


let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "";
        cartItemCountBadge.textContent = cartItemCount;
    }
}


// pulsante Buy Now
const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener ("click", () => {
    const countCartBoxes = cartContent.querySelectorAll(".cart-box");
    if (countCartBoxes.length === 0) {
        alert("Your cart is empty! Please add items to your cart before buying.");
        return;
    }

    countCartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0; // quando si preme Buy Now si azzera il totale. MANCA IL VERO CHECKOUT!!!
    updateCartCount(0);
    updateTotalPrice();

    alert("Thank you for your purchase!");
});



document.addEventListener("DOMContentLoaded", () => {
    cartContent.innerHTML = ""; // Svuota il contenuto del carrello all'avvio
});

