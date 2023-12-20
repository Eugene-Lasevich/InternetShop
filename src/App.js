import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Categories from './components/Categories';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider, useAuth } from './AuthContext';
import Logout from "./components/Logout";
import ProductForm from "./components/ProductForm";
import ProductDetail from './components/ProductDetail';
import ProductsByCategory from './components/ProductsByCategory';
import ProductsByUser from './components/ProductsByUser';
import MyProducts from './components/MyProducts';

const PrivateRoute = ({ element, requireAuth }) => {
    const auth = useAuth();
    if (requireAuth && !auth.isAuthenticated()) {
        // If authentication is required and the user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }
    // Otherwise, return the component
    return element;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />

                        {/* Added route for creating a product */}
                        <Route path="/create-product" element={<PrivateRoute element={<ProductForm />} requireAuth />} />
                        <Route path="/product/:productId" element={<ProductDetail />} />
                        <Route path="/category/:categoryId" element={<ProductsByCategory />} />
                        <Route path="/user/:userId" element={<ProductsByUser />} />
                        <Route path="/my-products/:userId" element={<MyProducts />} />

                        {/* Add other routes as needed */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
