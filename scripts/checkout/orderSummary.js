import { cart, updateCartQuantity } from "../data/cart-class.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  document.querySelector(
    ".js-checkout-items"
  ).innerHTML = `${updateCartQuantity()} items`;
  let cartSummaryHTML = "";

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;

    const machingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd - D MMMM, YYYY");

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        machingProduct.id
      }">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${machingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${machingProduct.name}
          </div>
          <div class="product-price">
          ${machingProduct.getPrice()}
          </div>
          <div class="product-quantity
          js-product-quantity-${machingProduct.id}">
            <span>
              Quantity: <span class="quantity-label updating-quantity">${
                cartItem.quantity
              }
              <span class="update-quantity-link link-primary js-update-link" 
                data-product-id = "${machingProduct.id}">
                  Update
              </span>
              </span>
            </span>
          <div class="editing-quantity link-primary display">
            <input class="quantity-input" value="${cartItem.quantity}">
            <span class="save-quantity link-primary">Save</span>
          </div>
              <span class="delete-quantity-link link-primary js-delete-link 
                js-delete-link-${machingProduct.id}"
                data-product-id = "${machingProduct.id}">
                Delete
              </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(machingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(machingProduct, cartItem) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${machingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${machingProduct.id}">
            <div>
              <div class="delivery-option-date">
              ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
          </div>
        `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const parent = link.closest(".cart-item-container");
      parent.querySelector(".updating-quantity").classList.add("display");
      parent.querySelector(".editing-quantity").classList.remove("display");
      // this part is for Focusing in the input automatically(
      parent.querySelector(".quantity-input").focus();
      const value = parent.querySelector(".quantity-input").value;
      parent.querySelector(".quantity-input").value = "";
      parent.querySelector(".quantity-input").value = value;
      //)
      parent.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const editedValue = Number(
            parent.querySelector(".quantity-input").value
          );
          cart.removeFromCart(productId);
          cart.addToCart(productId, editedValue);
          renderOrderSummary();
          renderPaymentSummary();
        }
      });
      parent.querySelector(".save-quantity").addEventListener("click", () => {
        const editedValue = Number(
          parent.querySelector(".quantity-input").value
        );
        cart.removeFromCart(productId);
        cart.addToCart(productId, editedValue);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  });

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);
      let container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      renderPaymentSummary();
      document.querySelector(
        ".js-checkout-items"
      ).innerHTML = `${updateCartQuantity()} items`;
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
