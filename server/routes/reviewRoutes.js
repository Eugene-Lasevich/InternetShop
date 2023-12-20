// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Получить все отзывы
router.get('/reviews', reviewController.getAllReviews);

// Создать новый отзыв
router.post('/reviews', reviewController.createReview);

router.put('/reviews/:id', reviewController.updateReview);

// Удалить отзыв
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
