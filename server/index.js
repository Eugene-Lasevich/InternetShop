const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Middleware для обработки сессий
const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Установите secure: true в продакшене при использовании HTTPS
});

const app = express();
app.use(sessionMiddleware);

// Middleware для обработки куков
app.use(cookieParser());

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/InternetShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Использование маршрутов для категорий, пользователей, товаров и отзывов
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', reviewRoutes);

// Добавьте маршруты для авторизации (authRoutes) и middleware для аутентификации (authenticate) из предыдущего ответа

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
