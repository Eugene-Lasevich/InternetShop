// ProductsByCategory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductsByCategory = () => {
    const { categoryId } = useParams();
    console.log(categoryId)

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                console.log(categoryId)
                const response = await axios.get(`http://localhost:3001/api/products/category/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при получении товаров по категории:', error.message);
            }
        };

        fetchProductsByCategory();
    }, [categoryId]);

    return (
        <div>
            <h2>Товары по категории</h2>
            <ul>
                {products.map((product) => (
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

export default ProductsByCategory;
