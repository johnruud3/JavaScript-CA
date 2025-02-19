import { initCart } from './cart.js';

const productGrid = document.querySelector('.js-product-grid');

async function fetchProducts() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const apiData = await response.json();
        const products = apiData.data;

        productGrid.innerHTML = ""; 
        products.forEach(product => {
           let productImage = '';
if (product.image.url) {
    productImage = `
        <a href="product-page.html?id=${product.id}&image=${encodeURIComponent(product.image.url)}">
            <img class="moto-jacket-1" src="${product.image.url}" alt="${product.image.alt}">
        </a>`;
} else {
    productImage = `<img class="moto-jacket-1" src="${product.image.url}" alt="${product.image.alt}">`;
}


            const productHTML = `
                <div class="product-information">
                    <div class="moto-jacket-wrap">
                        ${productImage} 
                    </div>
                    <div class="jacket-info">
                        <p class="title">${product.title}</p>
                        <h1 class="gender">${product.gender}</h1>
                        <h3 class="description">${product.description}</h3>
                        <h1 class="price">$${product.price}</h1>
                    </div>
                    <div class="add-to-cart">
                          <button class="add-to-cart-button" 
                data-id="${product.id}" 
                data-title="${product.title}" 
                data-price="${product.price}" 
                data-image="${product.image.url}" 
                data-gender="${product.gender}"
                data-description="${product.description}">
                Add to cart
            </button>
                    </div>
                </div>
            `;
            productGrid.innerHTML += productHTML;
        });

        initCart();
    } catch (error) {
        console.error("Error fetching products:", error);
        productGrid.innerHTML = `<p class="error-message">Something went wrong while loading products. Please try again later.</p>`;
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});
