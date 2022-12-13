const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login a user
const login = async (body) => {
  const { email, password } = body;

  //get user from db
  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length === 0) {
    throw new Error("Username or password incorrect");
  }

  //compare password
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    throw new Error("Username or password incorrect");
  }

  //create token
  const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

module.exports = {
  login,
};
