const Product = require("../models/Product");

const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

const cartController = require("./cartController");

exports.getProductsView = (request, response) => {
  const cartCount = cartController.getProductsCount();
  Product.getAll()
    .then((products) => {
      response.render("products.ejs", {
        headTitle: "Shop - Products",
        path: "/",
        menuLinks: MENU_LINKS,
        activeLinkPath: "/products",
        products,
        cartCount,
      });
    })
    .catch((error) => {
      console.error(error);
      response.render("products.ejs", {
        headTitle: "Shop - Products",
        path: "/",
        menuLinks: MENU_LINKS,
        activeLinkPath: "/products",
        products: [],
        cartCount,
      });
    });
};

exports.getAddProductView = (request, response) => {
  const cartCount = cartController.getProductsCount();

  response.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
    cartCount,
  });
};

exports.getNewProductView = (request, response) => {
  const cartCount = cartController.getProductsCount();
  Product.getLast()
    .then((newestProduct) => {
      response.render("new-product.ejs", {
        headTitle: "Shop - New product",
        path: "/new",
        activeLinkPath: "/products/new",
        menuLinks: MENU_LINKS,
        newestProduct,
        cartCount,
      });
    })
    .catch((error) => {
      console.error(error);
      response.render("new-product.ejs", {
        headTitle: "Shop - New product",
        path: "/new",
        activeLinkPath: "/products/new",
        menuLinks: MENU_LINKS,
        newestProduct,
        cartCount,
      });
    });
};

exports.getProductView = (request, response) => {
  const cartCount = cartController.getProductsCount();
  const name = request.params.name;

  Product.findByName(name)
    .then((product) => {
      response.render("product.ejs", {
        headTitle: "Shop - Product",
        path: `/products/${name}`,
        activeLinkPath: `/products/${name}`,
        menuLinks: MENU_LINKS,
        product,
        cartCount,
      });
    })
    .catch((error) => {
      console.error(error);
      response.render("product.ejs", {
        headTitle: "Shop - Product",
        path: `/products/${name}`,
        activeLinkPath: `/products/${name}`,
        menuLinks: MENU_LINKS,
        product: null,
        cartCount,
      });
    });
};

exports.deleteProduct = (request, response) => {
  const name = request.params.name;
  Product.deleteByName(name)
    .then(() => {
      response.status(STATUS_CODE.OK).json({ success: true });
    })
    .catch((error) => console.error(error));
};
