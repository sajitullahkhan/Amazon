import { updateCartQuantity } from "../data/cart-class.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
async function renderTrackingPage() {
  document.querySelector(".cart-quantity").innerHTML = updateCartQuantity();
  await loadProductsFetch();
  let html = "";

  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productId");
  const arrivingDate = url.searchParams.get("arrivingDate");
  const quantity = url.searchParams.get("quantity");

  const product = getProduct(productId);
  html += `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">Arriving on ${arrivingDate}</div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">Quantity: ${quantity}</div>

      <img
        class="product-image"
        src="${product.image}"
      />

      <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;
  document.querySelector(".main").innerHTML = html;
}
renderTrackingPage();
