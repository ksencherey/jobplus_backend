const skillController = require("../controllers/skill.controllers");
const auth = require("../middlewares/auth.middleware");
const router = require("express-promise-router")();

router.post("/skills", auth, skillController.createSkill);
router.get("/skills", auth, skillController.getAllSkills);
router.put("/skills/:id", auth, skillController.updateSkill);
router.delete("/skills/:id", auth, skillController.deleteSkill);

module.exports = router;
