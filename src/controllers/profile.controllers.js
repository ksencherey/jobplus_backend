const profileServices = require("../services/profile.services");

// create new profile
const createProfile = async (req, res) => {
  try {
    //body should have job_title, min_salary, job_type, experience, sector_id;
    const body = {
      job_title: req.body.job_title,
      min_salary: req.body.min_salary,
      job_type: req.body.job_type,
      experience: req.body.experience,
      sector_id: req.body.sector_id,
      user_id: req.user.id,
    };

    // const body = { ...req.body, user_id: req.user.id };
    const profile = await profileServices.createProfile(body);
    res.status(201).send({ message: "Profile created successfully", profile });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// export all the functions
module.exports = {
  createProfile,
};
