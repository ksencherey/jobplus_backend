const userJobServices = require("../services/user_job.services");

//create user job
const createUserJob = async (req, res) => {
  const body = {
    user_id: req.user.id,
    job_id: req.body.job_id,
    type: req.body.type,
  };

  try {
    const userJob = await userJobServices.createUserJob(body);
    res.status(201).send({ message: "User Job created successfully", userJob });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete user job
const deleteUserJob = async (req, res) => {
  try {
    const userJob = await userJobServices.deleteUserJob(req.params.id);
    res.status(201).send({ message: "User Job deleted successfully", userJob });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete all user jobs by user_id and type
const deleteUserJobByUserAndType = async (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  try {
    const userJobs = await userJobServices.deleteUserJobsByUserAndType(body);
    res.status(200).send({
      message: "user Job by user and type deleted successfully",
      userJobs,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get all user jobs for a user_id and type
const getUserJobsByUserAndType = async (req, res) => {
  // req.query is a way to grab the url http://localhost:4000/user_jobs?page=1&limit=1 from postman or frontend
  // console.log(req.query);
  //instead of hard coding page and limit as shown on line 48 below, we can use req.query
  // const params = { ...req.body, user_id: req.user.id, limit: 10, page: 1 };
  const params = { ...req.body, user_id: req.user.id, ...req.query };

  try {
    const userJobs = await userJobServices.getUserJobsByUserAndType(params);
    res.status(200).send({ message: "List of User Job And Type", userJobs });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// export all functions/methods
module.exports = {
  createUserJob,
  deleteUserJob,
  deleteUserJobByUserAndType,
  getUserJobsByUserAndType,
};
