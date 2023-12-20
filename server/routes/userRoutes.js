// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


// Получить всех пользователей
router.get('/users', userController.getAllUsers);

// Создать нового пользователя
router.post('/users', userController.createUser);

router.put('/users/:id', userController.updateUser);

// Удалить пользователя
router.delete('/users/:id', userController.deleteUser);

router.post('/register', authController.registerUser);

// Вход пользователя
router.post('/login', authController.loginUser);

// Выход пользователя
router.post('/logout', authController.logoutUser);

module.exports = router;
