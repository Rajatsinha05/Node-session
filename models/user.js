const { STRING, INTEGER, ENUM } = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "User",
  {
    username: STRING,
    email: STRING,
    password: STRING,
    number: INTEGER,
    role: {
      type: ENUM,
      values: ["user", "admin"],

      defaultValue: "user",
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = User;
