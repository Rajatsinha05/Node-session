const { Router } = require("express");
const { getProducts, createProduct, addProduct, getProductPage, deleteProduct } = require("../controllers/ProductController");
const isLogin = require("../middlewares/loginChecker");

const productRoute=Router()

productRoute.get('/',isLogin,getProducts)
productRoute.post('/',isLogin,createProduct)
productRoute.get("/add",isLogin,addProduct)
productRoute.get("/products",isLogin,getProductPage)

productRoute.get('/:id',isLogin,deleteProduct)
module.exports=productRoute
