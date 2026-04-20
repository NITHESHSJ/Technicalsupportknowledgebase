const Category = require('../models/Category');
const Article = require('../models/Article');

// Get all categories with article counts
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    
    // Get article count for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Article.countDocuments({ categoryId: cat._id.toString() });
        return {
          ...cat.toObject(),
          id: cat._id,
          articleCount: count
        };
      })
    );
    
    res.status(200).json(categoriesWithCounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    
    const count = await Article.countDocuments({ categoryId: category._id.toString() });
    
    res.status(200).json({
      ...category.toObject(),
      id: category._id,
      articleCount: count
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    
    const category = await Category.create({
      name,
      description,
      icon: icon || 'Folder'
    });
    
    res.status(201).json({
      ...category.toObject(),
      id: category._id,
      articleCount: 0
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update category (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!category) return res.status(404).json({ message: 'Category not found' });
    
    const count = await Article.countDocuments({ categoryId: category._id.toString() });
    
    res.status(200).json({
      ...category.toObject(),
      id: category._id,
      articleCount: count
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete category (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    // Check if category has articles
    const articleCount = await Article.countDocuments({ categoryId: req.params.id });
    if (articleCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category with ${articleCount} articles. Delete articles first or move them to another category.` 
      });
    }
    
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
