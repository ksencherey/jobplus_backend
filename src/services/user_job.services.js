const db = require("../config/database");

// create user job
const createUserJob = async (body) => {
  const { user_id, job_id, type } = body;

  //check if user has already applied for this job
  const checkUserJob = await db.query(
    "SELECT * FROM user_jobs WHERE user_id = $1 AND job_id = $2 AND type = $3",
    [user_id, job_id, type]
  );

  if (checkUserJob.rows.length > 0) {
    throw new Error("User already applied for this job");
  }

  const { rows } = await db.query(
    "INSERT INTO user_jobs (user_id, job_id, type) VALUES ($1, $2, $3) RETURNING *",
    [user_id, job_id, type]
  );
  return rows[0];
};

//delete user job
const deleteUserJob = async (id) => {
  const userJob = await db.query(
    "DELETE FROM user_jobs WHERE id = $1 RETURNING *",
    [id]
  );
  return userJob.rows[0];
};

//delete all user jobs by user_id and type
const deleteUserJobsByUserAndType = async (body) => {
  const { user_id, type } = body;
  const userJobs = await db.query(
    "DELETE FROM user_jobs WHERE user_id = $1 AND type = $2 RETURNING *",
    [user_id, type]
  );
  return userJobs.rows;
};

// get all user jobs for a user_id and type
const getUserJobsByUserAndType = async (params) => {
  //lets call it params and not body as limit and page aren't part of the body
  //pagination, defaulting limit to 10 and page to 1 just in case front end does not add to url
  const { user_id, type, limit = 10, page = 1 } = params;

  //calculating offset, pages to ignore
  const offset = (page - 1) * limit;

  const userJob = await db.query(
    `
  SELECT 
    jobs.*,
    json_agg(DISTINCT companies) AS Company,
    json_agg(DISTINCT sectors) AS Sector,
    json_agg(DISTINCT skills) AS Skills,
    json_agg(DISTINCT saved) AS User_Saved,
    json_agg(DISTINCT applied) AS User_Application,
    json_agg(DISTINCT notification) AS User_Notification
  FROM jobs 
  LEFT JOIN companies ON jobs.company_id = companies.id
  LEFT JOIN sectors  ON sectors.id = jobs.sector_id
  LEFT JOIN job_skills ON jobs.id = job_skills.job_id
  LEFT JOIN skills ON job_skills.skill_id = skills.id
  LEFT JOIN user_jobs AS saved ON jobs.id = saved.job_id AND saved.type='Saved' AND saved.user_id = $1
  LEFT JOIN user_jobs AS applied ON jobs.id = applied.job_id AND applied.type='Application' AND applied.user_id = $1
  LEFT JOIN user_jobs AS notification ON jobs.id = notification.job_id AND notification.type='Notification' AND notification.user_id = $1
  WHERE jobs.id IN (
    SELECT job_id
    FROM user_jobs
    WHERE user_id = $1 AND type = $2
  )
  GROUP BY jobs.id
  ORDER BY jobs.created_at ASC
  LIMIT $3
  OFFSET $4 
  `,
    [user_id, type, limit, offset]
  );
  return userJob.rows;
};

//export all functions
module.exports = {
  createUserJob,
  deleteUserJob,
  deleteUserJobsByUserAndType,
  getUserJobsByUserAndType,
};
