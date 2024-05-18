const { Router } = require("express");
const {
  handlePost,
  handleGet,
  handleUpdate,
  handleDelete,
  getLoginPage,
  getSignUp,
  handleLogin,
} = require("../controllers/userController");
const passport = require("passport");
const isExists = require("../middlewares/Validate");

const userRoute = Router();

userRoute.get("/", handleGet);
userRoute.post("/", handlePost);
userRoute.patch("/:id", handleUpdate);
userRoute.delete("/:id", handleDelete);
userRoute.get("/login", getLoginPage);
userRoute.post("/login", handleLogin);

userRoute.post("/passportLogin", passport.authenticate("local"), (req, res) => {
  res.send("logged in");
});


userRoute.get("/admin",isExists,(req, res) => {


res.send({user:req.user,msg:"welcome"})
})

userRoute.get("/signup", getSignUp);

module.exports = userRoute;
