class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  }

  saveToStoeage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let machingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        machingItem = cartItem;
      }
    });

    if (machingItem) {
      machingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    this.saveToStoeage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStoeage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let machingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        machingItem = cartItem;
      }
    });
    machingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStoeage();
  }
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export const cart = new Cart("cart");

/*This is a demo There is no actual card in the backend.
The backend only sends "load cart" as a response*/
export async function loadCart() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  let cartData = await response.text();
  console.log(cartData);
}
