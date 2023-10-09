// Routes for the dashboard
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define a route for the user's dashboard
router.get('/dashboard', dashboardController.renderDashboard);

// Define a route for displaying the form to create a new post
router.get('/new', dashboardController.renderNewPostForm);

// Define a route for displaying the form to edit an existing post
router.get('/edit/:id', dashboardController.renderEditPostForm);

module.exports = router;