const { Router } = require("express");
const {
  getProducts,
  createProduct,
  addProduct,
  getProductPage,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductController");
const isLogin = require("../middlewares/loginChecker");
const isAdmin = require("../middlewares/Admin");

const productRoute = Router();

productRoute.get("/", isAdmin, getProducts);
productRoute.post("/", isAdmin, createProduct);
productRoute.get("/add", isLogin, addProduct);

productRoute.get("/products", isLogin, getProductPage);

productRoute.get("/:id", isLogin, deleteProduct);

productRoute.patch("/:id", isAdmin, updateProduct);
productRoute.delete("/:id", isAdmin, deleteProduct);
module.exports = productRoute;
