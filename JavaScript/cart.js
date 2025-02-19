let cartItemCount = 0;
const cartCount = document.getElementById('cart-count'); 


function updateCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
}


function initCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.dataset.id,
                title: button.dataset.title,
                price: button.dataset.price,
                image: button.dataset.image,
                gender: button.dataset.gender,
                description: button.dataset.description 
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCart();
        });
    });
}


function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector('.cart-grid');
  
    if (!cartContainer) return; 
  
    cartContainer.innerHTML = ""; 
  
    let totalPrice = 0;
  
    cart.forEach(product => {
        totalPrice += parseFloat(product.price); 
  
        const productHTML = `
      <div class="cart-product-info">
          <img class="cart-moto-jacket-pic" src="${product.image}" alt="${product.title}">
          <p class="title">${product.title}</p>
          <h1 class="gender">Gender: ${product.gender || 'Unknown'}</h1>
          <h3 class="description">${product.description || 'No description available'}</h3> <!-- Display the description -->
          <h1 class="quantity">Quantity: 1</h1>
          <h1 class="price">Total: $${product.price}</h1>
          <button class="remove-button" data-id="${product.id}">Remove item</button>
      </div>
  `;

cartContainer.innerHTML += productHTML;
  });

  
  cartContainer.innerHTML += `
    <div class="total-price-container"><h2 class="total-price">Taxes: $3.50 <br> Price: $${(totalPrice).toFixed(2)} <br><br> = $${(totalPrice) + 3.50} </h2></div>
  `;

    
    if (totalPrice === 0) {
        cartContainer.innerHTML += `
            <div class="total-price-container"><h2 class="total-price">Total: $0.00</h2></div>
        `;
    } else {
        cartContainer.innerHTML += `
            <div class="total-price-container"><h2 class="total-price">Taxes: $3.50 <br> 
            Price: $${totalPrice.toFixed(2)} <br><br> 
            = $${(totalPrice + 3.50).toFixed(2)} </h2></div>
        `;
    }


  
  document.querySelectorAll('.remove-button').forEach(button => {
      button.addEventListener('click', (event) => {
          const productId = event.target.dataset.id;
          removeItemFromCart(productId);
      });
  });
}


function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    
    const productIndex = cart.findIndex(product => product.id === productId);
  
    if (productIndex > -1) {
      
      cart.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
  
      
      updateCart();
  
      
      displayCart();
    }
  }
  
  


document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  displayCart();
});


export { initCart, updateCart, displayCart };
