import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Выход пользователя (вызов функции logout из контекста аутентификации)
        logout();

        // Удаление токена из localStorage
        localStorage.removeItem('token');

        // Перенаправление на страницу входа
        navigate('/');
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
