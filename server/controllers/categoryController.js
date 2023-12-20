// controllers/categoryController.js
const Category = require('../models/Category');

// Получить все категории
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        console.log('Categories:', categories); // Добавьте эту строку

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Создать новую категорию
exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Удалить категорию
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        await Category.findByIdAndDelete(categoryId);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};