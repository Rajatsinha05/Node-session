const Product = require("../models/product");
const User = require("../models/user");
const createProduct = async (req, res) => {
  let product = await Product.create(req.body);
  res.send(product);
};

const getProducts = async (req, res) => {
  // let products = await Product.findAll({
  //   include: User,
  //   where: { UserId: req.body.UserId },
  // });
  let products=await Product.findAll();
  res.send(products);
};

// pages
const addProduct = async (req, res) => {
  res.render("productAdd");
};

const getProductPage = async (req, res) => {
  let products = await Product.findAll({
    where: { UserId: req.body.UserId },
    raw: true,
  });
  // let products = await Product.findAll({raw:true});
  console.log("products: ", products);

  res.render("products", { products });
};



const deleteProduct = async (req, res)=>{
    let {id}=req.params
    let product=await Product.findByPk(id)
    product.destroy()
    res.redirect("/product/products")
}
module.exports = {
  getProducts,
  createProduct,
  addProduct,
  getProductPage,
  deleteProduct
};
