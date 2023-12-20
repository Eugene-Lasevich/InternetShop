// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multerMiddleware = require('../middleware/multerMiddleware');


// Получить все товары
router.get('/products', productController.getAllProducts);

router.get('/products/:id', productController.getProductDetail);

router.get('/products/category/:id', productController.getProductsByCategory);

router.get('/products/user/:id', productController.getProductsByUser);
// Создать новый товар
router.post('/products', multerMiddleware.single('image'), productController.createProduct);

router.put('/products/:id', productController.updateProduct);

// Удалить товар
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;

