const db = require("../config/database");

// create new profile
const createProfile = async (body) => {
  const { job_title, min_salary, job_type, experience, sector_id, user_id } =
    body;

  // check if user has profile
  const { rows } = await db.query(
    'SELECT * FROM "profiles" WHERE user_id = $1',
    [user_id]
  );
  if (rows.length > 0) {
    throw new Error("User already has a profile");
  }

  // create new profile
  const profile = await db.query(
    'INSERT INTO "profiles" (job_title, min_salary, job_type, experience, sector_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [job_title, min_salary, job_type, experience, sector_id, user_id]
  );

  return profile.rows[0];
};

// export all the functions
module.exports = {
  createProfile,
};
