// ProductDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/ProductDetail.module.css'; // Импорт файла стилей

const ProductDetail = () => {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
                setProductDetail(response.data);
            } catch (error) {
                console.error('Ошибка при получении информации о товаре:', error.message);
            }
        };

        fetchProductDetail();
    }, [productId]);

    if (!productDetail) {
        return <p>Loading...</p>;
    }

    const { product, createdBy } = productDetail;
    const category = product.category;

    return (
        <div className={styles['product-detail']}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
                Category: {category && <Link to={`/category/${category._id}`}>{category.name}</Link>}
            </p>
            {product.image && product.image.data && product.image.contentType && (
                <img src={`data:${product.image.contentType};base64,${product.image.data}`} alt={product.name} />
            )}
            {createdBy && createdBy.username && (
                <p>
                    Created by:{' '}
                    <Link to={`/user/${createdBy._id}`}>{createdBy.username}</Link>
                </p>
            )}
        </div>
    );
};

export default ProductDetail;
