const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
  Product.add(request.body)
    .then(() => {
      return Cart.add(request.body.name);
    })
    .then(() => {
      response.status(STATUS_CODE.FOUND).redirect("/products/new");
    })
    .catch((error) => console.error(error));
};

exports.getProductsCount = () => {
  return Cart.getProductsQuantity();
};
