class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStoeage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, num) {
    let machingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        machingItem = cartItem;
      }
    });

    if (machingItem) {
      if (num) {
        machingItem.quantity += num;
      } else {
        machingItem.quantity += 1;
      }
    } else {
      this.cartItems.push({
        productId,
        quantity: num ? num : 1,
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
