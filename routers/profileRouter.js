const router = require('express').Router();
const { getProfile, setProfile } = require('../controllers/profileController');

router.route('/').get();

module.exports = router;
