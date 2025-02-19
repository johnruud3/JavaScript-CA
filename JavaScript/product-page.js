import { initCart, updateCart } from './cart.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductData(productId);
    }
});

async function fetchProductData(productId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const productData = await response.json();
        const product = productData.data;

        document.querySelector('.product-page-heading-name').textContent = product.title;
        document.querySelector('.product-info p:nth-child(1)').textContent = `Color: ${product.baseColor}`;
        document.querySelector('.product-info p:nth-child(2)').textContent = `Gender: ${product.gender}`;
        document.querySelector('.product-info p:nth-child(4)').textContent = `Price: $${product.price} incl. Taxes`;
        document.querySelector('.description p').textContent = product.description;

        const productImage = document.querySelector('.moto-jacket-pic');
        if (product.image && product.image.url) {
            productImage.src = product.image.url;
            productImage.alt = product.image.alt || 'Product Image';
        }

        const addToCartButton = document.querySelector('.add-to-cart-button');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                addToCart(product);
            });
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image.url
    };

    cart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();  
}
