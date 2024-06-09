import { formatCurrency } from "../scripts/utils/money.js";

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

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;
  }
}

export let products = [];

export async function loadProductsFetch() {
  try {
    const promise = await fetch("https://supersimplebackend.dev/products");
    const productData = await promise.json();
    products = productData.map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
  } catch (error) {
    console.log(`Unexpected error. ${error}. Please try again later.`);
  }
}
