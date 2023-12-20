const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image: {
        data: String,
        contentType: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Замените 'User' на имя вашей модели пользователя, если она отличается
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
