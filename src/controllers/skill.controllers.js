const skillServices = require("../services/skill.services");

//create a skill
const createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const skill = await skillServices.createSkill({ name });
    res.status(201).send({ message: "Skill created successfully", skill });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await skillServices.getAllSkills();
    res.status(201).send({ message: "List Of All Skills", skills });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//update a skill
const updateSkill = async (req, res) => {
  try {
    const skill = await skillServices.updateSkill(req.params.id, req.body);
    res.status(200).send({ message: "Skill updated successfully", skill });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete a skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await skillServices.deleteSkill(req.params.id);
    res.status(200).send({ message: "Skill deleted successfully", skill });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// export all functions
module.exports = {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};
