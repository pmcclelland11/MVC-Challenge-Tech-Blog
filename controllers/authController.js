// Controller for authentication (signup, login, logout)
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    req.session.userId = userData.id;
    req.session.loggedIn = true;

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData || !(await bcrypt.compare(req.body.password, userData.password))) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.userId = userData.id;
    req.session.loggedIn = true;

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;