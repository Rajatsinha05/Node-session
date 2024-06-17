const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  console.log("token: ", req.headers);

  try {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.send({ status: "failed", message: "not logged in" });
    }

    if (token) {
      let decode = jwt.verify(token, "nodejs");

      if (decode.user?.role != "admin") {
        res.send({ status: "failed", message: "you are not authorized" });
      }

      if (decode?.user?.role == "admin") {
        req.body.UserId = decode.user.id;
        next();
      } else {
        res.send({ status: "failed", message: "you are not authorized" });
      }
    } else {
      res.send({ status: "failed", message: "you are not authorized" });
    }
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
};

module.exports = isAdmin;
