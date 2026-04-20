const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

// Get all categories
router.get('/', categoryController.getCategories);

// Get single category
router.get('/:id', categoryController.getCategory);

// Create category (Admin only)
router.post('/', protect, authorize('admin'), categoryController.createCategory);

// Update category (Admin only)
router.put('/:id', protect, authorize('admin'), categoryController.updateCategory);

// Delete category (Admin only)
router.delete('/:id', protect, authorize('admin'), categoryController.deleteCategory);

module.exports = router;
