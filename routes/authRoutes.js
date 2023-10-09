// Authentication routes (signup, login, logout)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define a route for user registration
router.post('/signup', authController.signup);

// Define a route for user login
router.post('/login', authController.login);

// Define a route for user logout
router.post('/logout', authController.logout);

module.exports = router;