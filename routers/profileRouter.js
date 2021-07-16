const router = require('express').Router();
const { getProfile, setProfile } = require('../controllers/profileController');

router.route('/').get(getProfile);

module.exports = router;
