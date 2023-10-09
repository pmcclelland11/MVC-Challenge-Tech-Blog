// Controller for dashboard
const { Post, User } = require('../models');

const dashboardController = {
  // Render the user's dashboard with their posts
  renderDashboard: async (req, res) => {
    try {
      if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
      }

      const userData = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });

      const user = userData.get({ plain: true });

      res.render('dashboard', { user, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Render the form for creating a new post
  renderNewPostForm: (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
    res.render('new-post', { loggedIn: req.session.loggedIn });
  },

  // Render the form for editing an existing post
  renderEditPostForm: async (req, res) => {
    try {
      if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
      }

      const postData = await Post.findByPk(req.params.id);

      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = postData.get({ plain: true });

      res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = dashboardController;