const { getDatabase } = require('../database');

const COLLECTION_NAME = "products";

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static getAll() {
    const db = getDatabase();
    db.collection(COLLECTION_NAME)
      .find()
      .toArray()
      .then((products) => products)
      .catch((error) => console.error(error));
  }

  static add(product) {
  const db = getDatabase();
  db.collection(COLLECTION_NAME)
      .insertOne(product)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  static findByName(name) {
    const db = getDatabase();
    db.collection(COLLECTION_NAME)
      .findOne({ name })
      .then((product) => product)
      .catch((error) => console.error(error));
  }

  static deleteByName(name) {
    const db = getDatabase();
    db.collection(COLLECTION_NAME)
      .deleteOne({ name })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  static getLast(callback) {
    const db = getDatabase();
    db.collection(COLLECTION_NAME)
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray()
      .then((products) => products[0] || null)
      .catch((error) => console.error(error));
  }
}

module.exports = Product;
