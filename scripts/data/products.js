import { formatCurrency } from "../utils/money.js";

export function getProduct(productId) {
  let machingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      machingProduct = product;
    }
  });
  return machingProduct;
}

class Product {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }
  id;
  image;
  name;
  rating;
  priceCents;

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return ``;
  }
}

export let products = [];

export async function loadProductsFetch() {
  try {
    const promise = await fetch("https://supersimplebackend.dev/products");
    const productData = await promise.json();
    const haram = [
      "5968897c-4d27-4872-89f6-5bcb052746d7",
      "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
      "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
      "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    ];
    products = productData
      .filter((product) => !haram.includes(product.id))
      .map((productDetails) => {
        return new Product(productDetails);
      });
  } catch (error) {
    console.log(`Unexpected error. ${error}. Please try again later.`);
  }
}
