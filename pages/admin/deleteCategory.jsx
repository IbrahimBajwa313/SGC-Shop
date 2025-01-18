import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { MyContext } from '../../pages/_app'

const DeleteCategory = () => {
  const { setformSubmit } = MyContext()
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/getCategory');
        setCategories(response.data.categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setformSubmit((prev) => prev + 1);
    if (!selectedCategory) {
      setError('Please select a category to delete.');
      return;
    }

    try {
      const response = await axios.delete('/api/deleteCategory', {
        data: { id: selectedCategory },
      });

      setMessage(response.data.message);
      setCategories(categories.filter((cat) => cat._id !== selectedCategory));
      setSelectedCategory('');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An error occurred';
      setError(errorMessage);
    }
  };

  return (
    <Layout>
    <div className="container min-h-screen mx-auto max-w-md py-8">


      <h1 className="text-2xl font-bold mb-4">Delete Category</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Select Category to Delete
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Category
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </form>
    </div>
    </Layout> );
};

export default DeleteCategory;
