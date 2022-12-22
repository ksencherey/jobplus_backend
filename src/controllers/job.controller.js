const jobServices = require("../services/job.services");

//create a job
const createJob = async (req, res) => {
  try {
    const job = await jobServices.createJob(req.body);
    res.status(201).send({ message: "Job created successfully", job });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobServices.getAllJobs();
    res.status(201).send({ message: "List of All Jobs", jobs });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// update job
const updateJob = async (req, res) => {
  try {
    const job = await jobServices.updateJob(req.params.id, req.body);
    res.status(200).send({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await jobServices.deleteJob(req.params.id);
    res.status(200).send({ message: "Job deleted successfully", job });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// export all functions
module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
};
