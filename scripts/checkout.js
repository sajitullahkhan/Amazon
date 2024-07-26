import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "./data/products.js";
import { loadCart } from "./data/cart-class.js";

async function loadPage() {
  try {
    await loadProductsFetch();

    await loadCart(); /*This is a demo There is no actual card in the backend.
    The backend only sends "load cart" as a response*/
  } catch (error) {
    console.log(`Unexpected error. ${error}. Please try again later.`);
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
