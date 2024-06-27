import { orders } from "../data/place-orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";

export async function renderOrders() {
  await loadProductsFetch();
  let html = "";
  orders.forEach((data) => {
    const date = dayjs(data.orderTime);
    const formattedDate = date.format("dddd MMMM D");
    html += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(data.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${data.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
          
          
          
          </div>
          </div>
          `;
    document.querySelector(".orders-grid").innerHTML = html;
    orderedItem(data);
  });
}
renderOrders();

function orderedItem(data) {
  let html = "";
  console.log(data);

  data.products.forEach((productData) => {
    const product = getProduct(productData.productId);
    html += `
    <div class="product-image-container">
      <img src="${product.image}" />
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">Arriving on: August 15</div>
      <div class="product-quantity">Quantity: ${productData.quantity}</div>
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png" />
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
    `;
    document.querySelector(".order-details-grid").innerHTML = html;
  });
}
