const db = require("../config/database");

//create skill
const createSkill = async (body) => {
  const { name } = body;
  const { rows } = await db.query(
    "INSERT INTO skills (name) VALUES ($1) RETURNING *",
    [name]
  );
  return rows[0];
};

//get all skills
const getAllSkills = async () => {
  const skills = await db.query("SELECT * FROM skills");
  return skills.rows;
};

//update a skill
const updateSkill = async (id, body) => {
  const { name } = body;
  const skill = await db.query(
    "UPDATE skills SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return skill.rows[0];
};

//delete a skill
const deleteSkill = async (id) => {
  const { rows } = await db.query(
    "DELETE FROM skills WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};

// export all functions
module.exports = {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};
