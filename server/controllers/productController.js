const jwtDecode = require('jwt-decode');
const Product = require('../models/Product');
const multer = require('multer');
const User = require("../models/User");
const upload = multer({ dest: 'uploads/' });
const Category = require('../models/Category'); // Подключаем модель категории


// Получить все товары
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getProductDetail = async (req, res) => {
    const productId = req.params.id;

    try {
        // Находим информацию о продукте по productId
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Находим информацию о пользователе по userId, который создал продукт
        const createdByUser = await User.findById(product.createdBy);

        if (!createdByUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Находим информацию о категории по categoryId в продукте
        const category = await Category.findById(product.category);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Возвращаем полную информацию о продукте, создателе и категории
        res.json({
            product: {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: {
                    _id: category._id,
                    name: category.name,
                    // Другие свойства категории, которые вы хотите включить
                },
                image: {
                    data: product.image.data,
                    contentType: product.image.contentType,
                },
            },
            createdBy: {
                _id: createdByUser._id,
                username: createdByUser.username,
                // Другие свойства пользователя, которые вы хотите включить
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProductsByCategory = async (req, res) => {
    const categoryId = req.path.split('/')[3]

    try {
        // Находим все товары, у которых поле category равно categoryId
        const products = await Product.find({ category: categoryId });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
;

// Получить товары пользователя по userId
exports.getProductsByUser = async (req, res) => {
    const userId = req.path.split('/')[3]
    console.log(req)

    try {
        // Проверяем существование пользователя
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Находим все товары, созданные указанным пользователем
        const userProducts = await Product.find({ createdBy: userId });

        res.json(userProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Создать новый товар
exports.createProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwtDecode.jwtDecode(token);
        console.log(req.file);
        console.log(decodedToken);

        // Преобразование буфера в строку base64
        const imageString = req.file.buffer.toString('base64');

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            createdBy: decodedToken.userId,
            image: {
                data: imageString,
                contentType: req.file.mimetype,
            },
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
        console.log('Product created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update товара
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, category },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Удалить товар
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await Product.findByIdAndDelete(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
