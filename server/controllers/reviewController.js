// controllers/reviewController.js
const Review = require('../models/Review');

// Получить все отзывы
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user product'); // Подключаем данные из связанных моделей User и Product
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Создать новый отзыв
exports.createReview = async (req, res) => {
    const { user, product, rating, comment } = req.body;

    try {
        const newReview = new Review({ user, product, rating, comment });
        const savedReview = await newReview.save();
        res.json(savedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateReview = async (req, res) => {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        res.json(updatedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Удалить отзыв
exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id;

    try {
        await Review.findByIdAndDelete(reviewId);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};