const router = require('express-promise-router')();
const profileController = require ('../controllers/profile.controllers');
const auth = require ('../middlewares/auth.middleware');

router.post('/profiles', auth, profileController.createProfile);

module.exports = router;