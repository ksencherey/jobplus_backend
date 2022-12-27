const router = require("express-promise-router")();
const auth = require("../middlewares/auth.middleware");
const jobSKillController = require("../controllers/job_skill.controllers");

router.post("/job-skills", auth, jobSKillController.createJobSkill);
router.delete("/job-skills", auth, jobSKillController.deleteJobSkill);

module.exports = router;
