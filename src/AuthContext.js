import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';

// Создайте контекст
const AuthContext = createContext();

// Создайте редуктор для управления состоянием аутентификации
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};

// Оберните ваше приложение в провайдер контекста
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false });
    const [user, setUser] = useState(null);

    // Добавьте этот useEffect, чтобы проверить наличие токена в localStorage при загрузке приложения
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Если токен найден в localStorage, устанавливаем пользователя и устанавливаем isAuthenticated в true
            setUser({}); // Вместо {} установите данные пользователя, если они доступны
            dispatch({ type: 'LOGIN' });
        }
    }, []); // Пустой массив зависимостей гарантирует, что useEffect выполняется только один раз при монтировании компонента

    const login = (userData, token) => {
        setUser(userData);
        dispatch({ type: 'LOGIN' });
        // Сохраняем токен в localStorage при входе
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        dispatch({ type: 'LOGOUT' });
        // Удаляем токен из localStorage при выходе
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// Создайте хук для использования состояния аутентификации
const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
