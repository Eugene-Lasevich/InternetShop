// ProductsByUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductsByUser = () => {
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

    return (
        <div>
            <h2>Товары, опубликованные пользователем</h2>
            <ul>
                {userProducts.map((product) => (
                    <li key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <p>{product.name} - {product.price}$</p>
                            {/* Отображение изображения */}
                            {product.image && product.image.data && product.image.contentType && (
                                <img
                                    src={`data:${product.image.contentType};base64,${product.image.data}`}
                                    alt={product.name}
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            )}
                            {/* Другие детали товара, которые вы хотите отобразить */}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsByUser;
