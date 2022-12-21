const db = require("../config/database");
const jwt = require("JsonWebToken");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  //Retrieve session token
  const token = req.session.token;

  //if token is not present, return error
  if (!token) {
    return res.status(401).send({ error: "Please authenticate" });
  }
  //verify token
  try {
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //retrieve the user from Database
    const { rows } = await db.query("SELECT * FROM users WHERE id=$1", [
      decoded.id,
    ]);

    //if user is not found, return error
    if (!rows[0]) {
      throw new Error("User not found");
    }
    //Attach user to request object
    req.user = rows[0];

    // continue to next middleware
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = auth;
