const Product = require('../models/Product');
const User = require('../models/User');

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

        // Возвращаем полную информацию о продукте и создателе
        res.json({
            product: {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
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
