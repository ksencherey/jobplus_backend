const jobSKillServices = require("../services/job_skill.services");

//create job_skill
const createJobSkill = async (req, res) => {
  try {
    const jobSkill = await jobSKillServices.createJobSkills(req.body);
    res
      .status(200)
      .send({ message: "Job_Skill created successfully", jobSkill });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete a job_skill
const deleteJobSkill = async (req, res) => {
  try {
    const jobSkill = await jobSKillServices.deleteJobSKills(req.params.id);
    res
      .status(200)
      .send({ message: "Job_Skill deleted successfully", jobSkill });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//export functions
module.exports = {
  createJobSkill,
  deleteJobSkill,
};
