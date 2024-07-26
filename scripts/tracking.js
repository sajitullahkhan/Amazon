import { updateCartQuantity } from "../data/cart-class.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function renderTrackingPage() {
  document.querySelector(".cart-quantity").innerHTML = updateCartQuantity();
  await loadProductsFetch();
  let html = "";

  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productId");
  const arrivingDate = url.searchParams.get("arrivingDate");
  const quantity = url.searchParams.get("quantity");
  const startingDate = url.searchParams.get("orderDate");

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
  startTracking(arrivingDate, startingDate);
}
renderTrackingPage();

function startTracking(arrivingDate, startingDate) {
  const progressBar = document.querySelector(".progress-bar");
  const oneDay = 24 * 60 * 60 * 1000;
  const startDate = new Date(startingDate);
  let endDate = new Date(arrivingDate);

  const initialProgress = calculateProgress(startDate, endDate);
  console.log(initialProgress);
  updateProgressBar(progressBar, initialProgress);

  setInterval(() => {
    const currentProgress = calculateProgress(today, arrivalDate);
    updateProgressBar(progressBar, currentProgress);
  }, 1000 * 60);
}
function calculateProgress(startDate, endDate) {
  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const totalDuration = end.diff(start, "second");
  const elapsedDuration = now.diff(start, "second");
  const progress = (elapsedDuration / totalDuration) * 100;
  return Math.min(progress, 100); // Ensure progress does not exceed 100%
}

function updateProgressBar(progressBar, progress) {
  progressBar.style.width = progress + "%";
}
