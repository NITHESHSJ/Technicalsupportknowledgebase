const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(articleController.getArticles)
  .post(protect, authorize('admin'), articleController.createArticle);

router.route('/:id')
  .get(articleController.getArticle)
  .put(protect, authorize('admin'), articleController.updateArticle)
  .delete(protect, authorize('admin'), articleController.deleteArticle);

router.post('/:id/feedback', protect, articleController.addFeedback);

module.exports = router;
