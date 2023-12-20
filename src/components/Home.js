import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Home.css'; // Импорт файла стилей

const Home = () => {
    const [tokenData, setTokenData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setTokenData(decodedToken);
        }

        fetchProducts();
        fetchCategories();

        // Устанавливаем интервал для обновления времени каждую минуту
        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);

        return () => {
            clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
        };
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            let url = 'http://localhost:3001/api/products';

            // Если выбрана конкретная категория, добавляем её id к запросу
            if (selectedCategory) {
                url += `/category/${selectedCategory}`;
            }

            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error('Ошибка при получении товаров:', error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Ошибка при получении категорий:', error.message);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);
    };

    return (
        <div>
            <div>
                <p>Текущая таймзона: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
                <p>Текущее время: {currentTime}</p>
            </div>
            <h2>Главная страница</h2>
            {tokenData ? (
                <>
                    <p>Пользователь {tokenData.username} авторизован</p>
                    {tokenData && (
                        <Link to={`/my-products/${tokenData.userId}`}>
                            <button>Мои товары</button>
                        </Link>
                    )}
                </>
            ) : (
                <p>Пользователь не авторизован.</p>
            )}
            <label htmlFor="categorySelect">Выберите категорию: </label>
            <select id="categorySelect" onChange={handleCategoryChange} value={selectedCategory}>
                <option value="">Все категории</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <h3>Список товаров:</h3>
            <ul>
                {products.map((product) => (
                    <li key={product._id} onClick={() => handleProductClick(product._id)}>
                        <p>
                            {product.name} - {product.price}$
                        </p>
                        {product && product.image && product.image.data && product.image.contentType && (
                            <img
                                src={`data:${product.image.contentType};base64,${product.image.data}`}
                                alt={product.name}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
