const db = require("../config/database");

//create a new user
const createUser = async (body) => {
  const { first_name, last_name, email, password, confirm_password } = body;
  //in database.js, remember db accepts  text and params
  const { rows } = await db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *",
    [first_name, last_name, email, password]
  );
  return rows[0];
};

//export all the functions
module.exports = {
  createUser,
};
