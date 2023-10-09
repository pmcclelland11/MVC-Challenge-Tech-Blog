// Routes for the homepage
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Define routes for the home page
router.get('/', homeController.renderHomepage);

// Define a route for displaying an individual blog post
router.get('/post/:id', homeController.renderPost);

module.exports = router;