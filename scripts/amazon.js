import { cart, updateCartQuantity } from "../data/cart-class.js";
import { products, loadProductsFetch } from "../data/products.js";

async function renderProductsGrid() {
  await loadProductsFetch();

  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${product.getPrice()}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-option">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
              return `<option ${
                i === 1 ? "selected" : ""
              } value="${i}">${i}</option>`;
            })}
        </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>
    `;
  });
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  document.querySelectorAll(".product-container").forEach((container) => {
    let num = 0;
    container.addEventListener("click", (event) => {
      if (event.target.classList.value === "js-quantity-option") {
        num = Number(event.target.value);
      } else if (event.target.classList[2] === "js-add-to-cart") {
        const productId = event.target.dataset.productId;

        cart.addToCart(productId, num);
        document.querySelector(".js-cart-quantity").innerHTML =
          updateCartQuantity();
      }
    });
  });
  document.querySelector(".js-cart-quantity").innerHTML = updateCartQuantity();
}
renderProductsGrid();
