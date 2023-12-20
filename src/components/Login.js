import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [weather, setWeather] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', formData);
            console.log('Login successful:', response.data);

            // Сохранение токена в localStorage
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token);

            // Установите состояние success на true, чтобы показать сообщение об успешном входе
            setSuccess('Вход успешен');

            // Перенаправление на главную страницу
            navigate('/');

            // Очистите состояние error
            setError(null);
        } catch (error) {
            console.error('Error during login:', error);
            // В случае ошибки от сервера, обрабатываем ее и отображаем сообщение об ошибке пользователю.
            if (error.response && error.response.status === 401) {
                setError('Неверное имя пользователя или пароль');
                // Очистите состояние success
                setSuccess(null);
            } else {
                setError('Произошла ошибка при входе');
                // Очистите состояние success
                setSuccess(null);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Запрос к API OpenWeatherMap (используйте свой токен)
                const weatherResponse = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        q: 'Minsk',
                        appid: '70abe42e784aa04d6126fe706ca4612f',
                        units: 'metric',
                    },
                });
                setWeather(weatherResponse.data);

                // Запрос к API нацбанка Беларуси для получения курса BYN к USD
                const exchangeRateResponse = await axios.get('https://api.nbrb.by/exrates/rates/USD?parammode=2');
                setExchangeRate(exchangeRateResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Ваш обработчик ошибок
            }
        };

        fetchData(); // Вызовите функцию fetchData при загрузке компонента

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Пустой массив зависимостей означает, что useEffect будет вызван только при монтировании компонента

    return (
        <div>
            <h2>Login</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <p>
                    Текущая температура: {weather.main.temp}°C, Ощущается как: {weather.main.feels_like}°C
                </p>
            )}
            {exchangeRate && (
                <p>
                    Курс белорусского рубля к доллару (BYN к USD): {exchangeRate.Cur_OfficialRate}
                </p>
            )}
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
