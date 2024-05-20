export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [
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

function saveToStoeage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let machingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      machingItem = cartItem;
    }
  });

  if (machingItem) {
    machingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToStoeage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStoeage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let machingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      machingItem = cartItem;
    }
  });
  machingItem.deliveryOptionId = deliveryOptionId;
  saveToStoeage();
}
