import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import '../styles/ProductForm.css'; // Импорт файла стилей


const ProductForm = () => {
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchCategoriesFromBackend();
    }, []);

    const fetchCategoriesFromBackend = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('category', selectedCategory);
        formData.append('image', image); // добавляем файл напрямую

        saveProductToBackend(formData);
    };

    const saveProductToBackend = async (product) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            };

            await axios.post('http://localhost:3001/api/products', product, config);

            console.log('Product created successfully');
        } catch (error) {
            console.error('Error creating product:', error.message);
        }
    };

    return (
        <form className="product-form" onSubmit={handleFormSubmit}>
            <label htmlFor="productName">Название товара</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />

            <label htmlFor="productDescription">Описание товара</label>
            <textarea
                id="productDescription"
                rows="3"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
            ></textarea>

            <label htmlFor="productPrice">Цена товара</label>
            <input
                type="number"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
            />

            <label htmlFor="productCategory">Категория товара</label>
            <select
                id="productCategory"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
            >
                <option value="" disabled>
                    Выберите категорию
                </option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label htmlFor="productImage">Изображение товара</label>
            <input
                type="file"
                id="productImage"
                accept="image/*"
                onChange={handleImageChange}
            />

            <button type="submit">Создать товар</button>
        </form>
    );
};

export default ProductForm;
