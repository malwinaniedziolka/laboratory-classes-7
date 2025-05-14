const Product = require("./Product");
const { getDatabase } = require('../database');

const COLLECTION_NAME = "carts";

class Cart {
  constructor() {}

 static add(productName) {
    const db = getDatabase();

    return Product.findByName(productName) 
      .then((product) => {
        if (!product) {
          throw new Error(`Product '${productName}' not found.`);
        }

        return db.collection(COLLECTION_NAME)
          .findOne({ _id: "current" })
          .then((cart) => {
            /*
            if (!cart) {
              const newCart = { _id: "current", items: [{ product, quantity: 1 }] };
              return db.collection(COLLECTION_NAME)
                .insertOne(newCart)
                .then(() => newCart.items);
            }*/

            if (!cart.items.length) {
              cart.items.push({ product, quantity: 1 });
              return db.collection(COLLECTION_NAME)
                .updateOne({ _id: "current" }, { $set: { items: cart.items } })
                .then(() => cart.items);
            }

            const existingProduct = cart.items.find(
              (item) => item.product.name === productName
            );

            if (existingProduct) {
              existingProduct.quantity += 1;
              return db.collection(COLLECTION_NAME)
                .updateOne({ _id: "current" }, { $set: { items: cart.items } })
                .then(() => cart.items);

            } else {
              cart.items.push({ product, quantity: 1 });
              return db.collection(COLLECTION_NAME)
                .updateOne({ _id: "current" }, { $set: { items: cart.items } })
                .then(() => cart.items);
            }
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  static getItems() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .findOne({ _id: "current" })
      .then((cart) => cart ? cart.items : [])
      .catch((error) => console.error(error));
  }

  static getProductsQuantity() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .findOne({ _id: "current" })
      .then((cart) => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + item.quantity, 0);
      })
      .catch((error) => console.error(error));
  }

  static getTotalPrice() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .findOne({ _id: "current" })
      .then((cart) => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      })
      .catch((error) => console.error(error));
  }

  static clearCart() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .updateOne({ _id: "current" }, { $set: { items: [] } })
      .catch((error) => console.error(error));
  }
}

module.exports = Cart;