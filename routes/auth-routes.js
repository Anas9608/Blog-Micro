const express = require('express');
const { signIn, signUp } = require('../controllers/auth-controller');
const router = express.Router();

router.route('/signIn').post(signIn);
router.route('/signUp').post(signUp);

module.exports = router;