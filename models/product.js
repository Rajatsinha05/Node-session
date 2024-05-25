const { STRING, INTEGER } = require("sequelize");
const db = require("../config/db");
const User = require("./user");



const Product=db.define("Product",{
    title:STRING,
    category:STRING,
    image:STRING,
    price:INTEGER
},{
    createdAt:false,
    updatedAt:false,
})

User.hasMany(Product)
Product.belongsTo(User)

module.exports = Product;