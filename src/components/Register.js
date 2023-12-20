import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate(); // Переместите сюда

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/register', formData);
            console.log('Registration successful:', response.data);
            // Установите состояние success на true, чтобы показать сообщение об успешной регистрации
            setSuccess('Пользователь успешно зарегистрирован');
            // Очистите состояние error
            setError(null);
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            // В случае ошибки от сервера, обрабатываем ее и отображаем сообщение об ошибке пользователю.
            if (error.response && error.response.status === 400) {
                setError('Пользователь с таким именем или email уже существует');
                // Очистите состояние success
                setSuccess(null);
            } else {
                setError('Произошла ошибка при регистрации');
                // Очистите состояние success
                setSuccess(null);
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};

export default Register;
