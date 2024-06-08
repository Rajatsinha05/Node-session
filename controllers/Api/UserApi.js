const User = require("../../models/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const ApiLogin = async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({ where: { email } });
  if (!user) {
    console.log("User not found");
    res.send({ msg: "user not fond" });
  }
  let isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.send("password mismatch");
  }
  let token = await jwt.sign({ user: user }, "nodejs");
  console.log("token: ", token);

  res.json({ token, user });
  
  // let token=req.headers.authorization.split(" ")[1]
  //   let decode=jwt.verify(token,"nodejs")
  // res.send({decode})
};

const ApiSignup = async (req, res) => {
  console.log("req.body", req.body);
  let { email } = req.body;
  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      res.send("user already registered");
    } else {
      let hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
      user = await User.create(req.body);

      let token = await jwt.sign({ user: user }, "nodejs");
      console.log("token: ", token);

      res.json({ token, user });
    }
  } catch (error) {
    res.send("error signing");
  }
};

module.exports = { ApiSignup, ApiLogin };
