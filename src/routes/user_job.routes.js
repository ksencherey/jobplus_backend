const router = require("express-promise-router")();
const auth = require("../middlewares/auth.middleware");
const userJobController = require("../controllers/user_job.controllers");

router.post("/user-jobs", auth, userJobController.createUserJob);
router.delete("/user-jobs/:id", auth, userJobController.deleteUserJob);
router.delete("/user-jobs", auth, userJobController.deleteUserJobByUserAndType);
router.get("/user-jobs", auth, userJobController.getUserJobsByUserAndType);

module.exports = router;
