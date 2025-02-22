const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

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
        updateCartCount(-1);
        updateTotalPrice();
        saveCartToLocalStorage();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector(".decrement");
        let quantity = numberElement.textContent;

        if (event.target.classList.contains("decrement") && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.classList.contains("increment")) {
            alert("This item is unique, you cannot add more!");
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;
        updateTotalPrice();
        saveCartToLocalStorage();
    });

    updateCartCount(1);
    updateTotalPrice();
    saveCartToLocalStorage();
};

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

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const countCartBoxes = cartContent.querySelectorAll(".cart-box");
    if (countCartBoxes.length === 0) {
        alert("Your cart is empty! Please add items to your cart before buying.");
        return;
    }

    countCartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);
    updateTotalPrice();
    localStorage.removeItem('cartItems');
    window.location.href = "checkout.html";
});

const saveCartToLocalStorage = () => {
    const cartItems = [];
    const cartBoxes = document.querySelectorAll(".cart-box");
    cartBoxes.forEach(cartBox => {
        const image = cartBox.querySelector(".cart-img").src;
        const name = cartBox.querySelector(".cart-product-title").textContent;
        const price = cartBox.querySelector(".cart-price").textContent.replace("€", "");
        const quantity = cartBox.querySelector(".number").textContent;
        cartItems.push({ image, name, price, quantity });
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = () => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartContent.innerHTML = "";
    storedCartItems.forEach(item => {
        const product = {
            image: item.image,
            name: item.name,
            price: item.price,
        };
        addToCart(product);
        const cartBoxes = document.querySelectorAll(".cart-box");
        cartBoxes.forEach(cartBox => {
            if (cartBox.querySelector(".cart-product-title").textContent === item.name) {
                cartBox.querySelector(".number").textContent = item.quantity;
            }
        });
    });
    updateTotalPrice();
    // Aggiorna il contatore correttamente
    cartItemCount = storedCartItems.length;
    updateCartCount(0);
};

document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
});

const linkToIndex = document.querySelector("#link-to-index");
if (linkToIndex) {
    linkToIndex.addEventListener("click", () => {
        loadCartFromLocalStorage();
    });
}