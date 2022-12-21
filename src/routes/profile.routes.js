const router = require("express-promise-router")();
const profileController = require("../controllers/profile.controllers");
const auth = require("../middlewares/auth.middleware");

router.post("/profiles", auth, profileController.createProfile);
router.put("/profiles/:id", auth, profileController.updateProfile);

module.exports = router;
