const { Model } = require("sequelize");

const isExists = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.redirect("/user/login");
  }
};


module.exports=isExists