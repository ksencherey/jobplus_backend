const db = require("../config/database");

//create a job_skill
const createJobSkills = async (body) => {
  const { job_id, skill_id } = body;
  const { rows } = await db.query(
    "INSERT INTO job_skills (job_id, skill_id) VALUES ($1, $2) RETURNING *",
    [job_id, skill_id]
  );
  return rows[0];
};

//get all job_skills
// const getAllJobSkills = async () => {
//   const jobSkills = await db.query("SELECT * FROM job_skills");
//   return jobSkills.rows;
// };

//delete a job_skill
const deleteJobSKills = async (id) => {
  const jobSkill = await db.query("DELETE FROM job_skills WHERE id = $1", [id]);
  return jobSkill.rows;
};

// export all functions
module.exports = {
  createJobSkills,
  deleteJobSKills,
};
