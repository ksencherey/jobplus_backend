const db = require("../config/database");

//create a new job
const createJob = async (body) => {
  const {
    title,
    salary_type,
    salary,
    job_types,
    description,
    company_id,
    sector_id,
    category_id,
  } = body;
  const { rows } = await db.query(
    "INSERT INTO jobs (title, salary_type, salary, job_types, description, company_id, sector_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      title,
      salary_type,
      salary,
      job_types,
      description,
      company_id,
      sector_id,
      category_id,
    ]
  );

  return rows[0];
};

// get all jobs
const getAllJobs = async () => {
  const jobs = await db.query("SELECT * FROM jobs");
  return jobs.rows;
};

// update a job
const updateJob = async (id, body) => {
  const {
    title,
    salary_type,
    salary,
    job_types,
    description,
    company_id,
    sector_id,
    category_id,
  } = body;
  const job = await db.query(
    "UPDATE jobs SET title=$1, salary_type = $2, salary = $3, job_types = $4, description = $5, company_id = $6, sector_id = $7, category_id = $8 WHERE id=$9 RETURNING *",
    [
      title,
      salary_type,
      salary,
      job_types,
      description,
      company_id,
      sector_id,
      category_id,
      id,
    ]
  );
  return job.rows[0];
};

// delete a job
const deleteJob = async (id) => {
  const job = await db.query("DELETE FROM jobs WHERE id = $1 RETURNING *", [
    id,
  ]);
  return job.rows[0];
};

//export all the functions
module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
};
