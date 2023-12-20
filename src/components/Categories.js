import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3001/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from server:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    const handleAddCategory = () => {
        axios.post('http://localhost:3001/api/categories', { name: newCategory.name })
            .then(response => {
                console.log('Category added successfully:', response.data);
                setCategories(prevCategories => [...prevCategories, response.data]);
                setNewCategory({ name: '' });
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });
    };

    const handleConfirmDelete = (categoryId) => {
        setConfirmDelete(categoryId);
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null);
    };

    const handleDeleteCategory = (categoryId) => {
        axios.delete(`http://localhost:3001/api/categories/${categoryId}`)
            .then(response => {
                console.log('Category deleted successfully:', response.data);
                setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryId));
                setConfirmDelete(null);
            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    };

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>
                        {category.name}
                        {confirmDelete === category._id ? (
                            <>
                                <button onClick={() => handleDeleteCategory(category._id)}>Confirm Delete</button>
                                <button onClick={handleCancelDelete}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => handleConfirmDelete(category._id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>

            <h2>Add New Category</h2>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" value={newCategory.name} onChange={handleInputChange} />
                </label>
                <br />
                <button type="button" onClick={handleAddCategory}>Add Category</button>
            </form>
        </div>
    );
};

export default Categories;
