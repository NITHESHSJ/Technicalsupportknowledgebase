const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/users', protect, authorize('admin'), authController.getUsers);
router.put('/users/:id', protect, authorize('admin'), authController.updateUser);
router.delete('/users/:id', protect, authorize('admin'), authController.deleteUser);

module.exports = router;
