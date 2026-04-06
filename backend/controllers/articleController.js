const Article = require('../models/Article');
const Feedback = require('../models/Feedback');

// Article Controllers
exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create({ ...req.body, author: req.user._id });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name');
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    article.views += 1;
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const { id } = req.params;
    
    console.log(`Attempting to delete article with ID: ${id} by user: ${req.user._id} (${req.user.role})`);
    
    if (req.user.role !== 'admin') {
      console.log('Access denied: User is not an admin');
      return res.status(403).json({ message: 'Only admins can delete articles' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ID format: ${id}`);
      return res.status(400).json({ message: 'Invalid article ID format' });
    }

    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      console.log(`Article with ID ${id} not found in database`);
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Also delete associated feedback
    const feedbackResult = await Feedback.deleteMany({ articleId: id });
    console.log(`Successfully deleted article and ${feedbackResult.deletedCount} associated feedback entries`);
    
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error in deleteArticle:', error);
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Feedback Controllers
exports.addFeedback = async (req, res) => {
  try {
    const { rating, comment, helpful } = req.body;
    const feedback = await Feedback.create({
      articleId: req.params.id,
      userId: req.user._id,
      rating,
      comment,
      helpful
    });

    // Update article stats
    const feedbacks = await Feedback.find({ articleId: req.params.id });
    const avgRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length;
    
    await Article.findByIdAndUpdate(req.params.id, {
      rating: avgRating.toFixed(1),
      feedbackCount: feedbacks.length
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
