const { Sequelize } = require("sequelize");


const db=new Sequelize("rnw","root","Rajat@123",{
    host: "localhost",
    dialect:'mysql'
})

module.exports =db