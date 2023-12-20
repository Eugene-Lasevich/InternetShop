// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Получить все категории
router.get('/categories', categoryController.getAllCategories);

// Создать новую категорию
router.post('/categories', categoryController.createCategory);

router.put('/categories/:id', categoryController.updateCategory);

// Удалить категорию
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
