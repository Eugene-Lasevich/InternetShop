// components/ProductsByUser.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm'; // Импортируем компонент ProductForm
import '../styles/MyProducts.css'; // Импорт файла стилей



const MyProducts = () => {
    const { userId } = useParams();
    const [userProducts, setUserProducts] = useState([]);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/products/user/${userId}`);
                setUserProducts(response.data);
            } catch (error) {
                console.error('Ошибка при получении товаров пользователя:', error.message);
            }
        };

        fetchUserProducts();
    }, [userId]);

    const handleDeleteProduct = async (productId) => {
        try {
            // Отправляем запрос на удаление товара
            await axios.delete(`http://localhost:3001/api/products/${productId}`);

            // Обновляем список товаров после удаления
            const updatedProducts = userProducts.filter((product) => product._id !== productId);
            setUserProducts(updatedProducts);
        } catch (error) {
            console.error('Ошибка при удалении товара:', error.message);
        }
    };


    const handleUpdateProduct = async (productId, updatedData) => {
        try {
            // Отправляем запрос на обновление товара
            const response = await axios.put(`http://localhost:3001/api/products/${productId}`, updatedData);

            // Обновляем список товаров после успешного обновления
            const updatedProducts = userProducts.map((product) =>
                product._id === productId ? response.data : product
            );
            setUserProducts(updatedProducts);
        } catch (error) {
            console.error('Ошибка при обновлении товара:', error.message);
        }
    };

    // ... (ваш код)

    return (
        <div>
            <h2>Мои товары</h2>

            {/* Включаем компонент ProductForm для создания нового товара */}
            <ProductForm />

            <h3>Список моих товаров:</h3>
            <ul>
                {userProducts.map((product) => (
                    <li key={product._id}>
                        <p>
                            {product.name} - {product.price}$
                            <button onClick={() => handleDeleteProduct(product._id)}>Удалить</button>
                            <button
                                onClick={() => {
                                    const updatedData = prompt('Введите новое описание товара:');
                                    if (updatedData !== null) {
                                        handleUpdateProduct(product._id, { description: updatedData });
                                    }
                                }}
                            >
                                Обновить описание
                            </button>
                        </p>
                        {/* Отображение изображения */}
                        {product.image && product.image.data && product.image.contentType && (
                            <img
                                src={`data:${product.image.contentType};base64,${product.image.data}`}
                                alt={product.name}
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        )}
                        {/* Другие детали товара, которые вы хотите отобразить */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyProducts
