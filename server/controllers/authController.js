const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)

        // Проверка наличия пользователя с таким именем или email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем или email уже существует' });
        }

        // Хеширование пароля
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const newUser = new User({
            username,
            email,
            password
        });

        // Сохранение пользователя в базе данных
        await newUser.save();

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {username, password } = req.body;

        // Поиск пользователя в базе данных
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        // Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Incorrect password")
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        // Создание JWT токена
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            'your-secret-key',
            { expiresIn: '1h' }
        );
        console.log(token)

        // Сохранение токена в сессии
        req.session.token = token;

        res.json({ userId: user._id, username: user.username, email: user.email, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.logoutUser = (req, res) => {
    // Удаление токена из сессии
    req.session.token = null;

    res.json({ message: 'Пользователь успешно вышел' });
};
