const User = require("../models/user");
const bcrypt = require("bcrypt");

const handlePost = async (req, res) => {
  try {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    let user = await User.create(req.body);

    //
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

const handleGet = async (req, res) => {
  try {
    let users = await User.findAll();

    res.send(users);
  } catch (error) {
    res.sen(error);
  }
};

const handleUpdate = async (req, res) => {
  let { id } = req.params;
  let user = await User.findByPk(id);
  user = await user.update(req.body);
  res.send(user);
};

const handleDelete = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findByPk(id);
    if (!user) {
      res.send("user not found");
    }
    user.destroy();

    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

// page
const getSignUp = (req, res) => {
  res.render("signup");
};
const getLoginPage = (req, res) => {
  res.render("login");
};

const handleLogin = async (req, res) => {
  let { email } = req.body;
  let user = await User.findOne({ where: { email: email } }, { raw: true });
  if (!user) {
    res.send("user not found");
  }

  
  let isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.send("password mismatch");
  }

  res.send(user);
};

module.exports = {
  handlePost,
  handleGet,
  handleUpdate,
  handleDelete,
  getLoginPage,
  getSignUp,
  handleLogin,
};
