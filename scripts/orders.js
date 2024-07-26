import { orders } from "../data/place-orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { updateCartQuantity } from "../data/cart-class.js";

export async function renderOrders() {
  document.querySelector(".cart-quantity").innerHTML = updateCartQuantity();
  await loadProductsFetch();
  let html = "";
  console.log(orders);

  orders.forEach((data) => {
    const date = dayjs(data.orderTime);
    const formattedOrderDate = date.format("dddd MMMM D, YYYY");

    html += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formattedOrderDate}</div>
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
        ${orderedItem(data, formattedOrderDate)}
        </div>
      </div>
    `;
    document.querySelector(".orders-grid").innerHTML = html;
  });
}
renderOrders();

function orderedItem(data, formattedOrderDate) {
  let orderedItemHTML = "";

  data.products.forEach((productData) => {
    const date = dayjs(productData.estimatedDeliveryTime);
    const formattedDate = date.format("DD MMM, YYYY");

    const product = getProduct(productData.productId);

    orderedItemHTML += `
    <div class="product-image-container">
      <img src="${product.image}" />
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">Arriving on: ${formattedDate}</div>
      <div class="product-quantity">Quantity: ${productData.quantity}</div>
      
    </div>

    <div class="product-actions">
      <a href="tracking.html?productId=${product.id}&arrivingDate=${formattedDate}&quantity=${productData.quantity}&orderDate=${formattedOrderDate}">
        <button class="track-package-button button-primary">
          Track package
        </button>
      </a>
    </div>
    `;
  });
  return orderedItemHTML;
}
