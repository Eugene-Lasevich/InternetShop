// controllers/userController.js
const User = require('../models/User');

// Получить всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Создать нового пользователя
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Удалить пользователя
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
