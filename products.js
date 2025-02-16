async function loadProducts(category, containerId) {
    try {
        const response = await fetch(`${category}.json`);
        const products = await response.json();
        const container = document.getElementById(containerId);
        let html = '';

        products.forEach(product => {
            html += `
                <div class="product-box">
                    <div class="image-box">
                        <img src="${product.image}">
                    </div>
                    <h2 class="product-title">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <div class="price-and-cart">
                        <span class="price">€${product.price}</span>
                        <i class="ri-shopping-bag-fill add-cart"></i>
                    </div>     
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (error) {
        console.error(`Errore caricamento prodotti ${category}:`, error);
        document.getElementById(containerId).innerHTML = "<p>Errore nel caricamento dei prodotti.</p>";
    }
}

async function initApp() {
    await Promise.all([
        loadProducts('bracelets', 'bracelets-container'),
        loadProducts('necklaces', 'necklaces-container'),
        loadProducts('brooches', 'brooches-container'),
        loadProducts('earrings', 'earrings-container')
    ]);
}

initApp();
