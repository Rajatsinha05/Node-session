const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendMail = require("../service/mail");
const Product = require("../models/product");

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
    let users = await User.findAll({include:Product});

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


let map=new Map();
const optGen=async(req,res)=>{

  let{email} = req.body;
  let user = await User.findOne({ where: { email} });
  if(!user){
    res.send("user not found")
  }
  let otp=Math.round(Math.random()*10000)
  map.set(email,otp)
  await sendMail(email,otp)
  res.send("otp sent successfully")
}


const passwordReset = async(req, res)=>{
let {email,password,otp} = req.body
if(map.has(email)){
  let oldOtp=map.get(email)
  if(oldOtp==otp){
    let hashPassword = await bcrypt.hash(password, 10);
    let user=await User.findOne({where:{email}})
    user.update({password:hashPassword})

    res.send("password updated successfully")
  }else{
    res.send("otp not match")
  }

}else{
  res.send("email not found")
}

}
module.exports = {
  handlePost,
  handleGet,
  handleUpdate,
  handleDelete,
  getLoginPage,
  getSignUp,
  handleLogin,
  optGen,
  passwordReset
};
