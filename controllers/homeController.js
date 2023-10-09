// Controller for homepage
const { Post, Comment, User } = require('../models');

const homeController = {
  // Render the homepage with existing blog posts
  renderHomepage: async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Render an individual blog post
  renderPost: async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          },
        ],
      });

      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = postData.get({ plain: true });

      res.render('post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = homeController;