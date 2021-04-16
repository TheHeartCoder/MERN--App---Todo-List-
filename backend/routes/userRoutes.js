const express = require('express');

const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Guest Routes
router.route('/users').post(registerUser);
router.route('/users/login').post(loginUser);

module.exports = router;
