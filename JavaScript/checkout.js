import { updateCart, displayCart } from './cart.js';  

document.addEventListener("DOMContentLoaded", () => {
  const payNowButton = document.getElementById("pay-now-button");

  if (payNowButton) {
      payNowButton.addEventListener("click", (event) => {
          event.preventDefault(); 
          
          localStorage.removeItem("cart"); 
          updateCart(); 
          displayCart(); 

          window.location.href = "https://johnruud3.github.io/JavaScript-CA/confirmation-site.html";

      });
  }
});

