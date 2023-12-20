import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const location = useLocation();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, [location.pathname]); // Используем location.pathname в качестве зависимости, чтобы эффект срабатывал при изменении пути

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {!token && (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
                {token && (
                    <li><Link to="/logout">Logout</Link></li>
                )}
                {/* Добавьте другие ссылки по мере необходимости */}
            </ul>
        </nav>
    );
};

export default Navbar;
