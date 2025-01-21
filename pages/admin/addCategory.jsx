import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { MyContext } from '../../pages/_app'

const AddCategory = () => {

  const { setformSubmit } = MyContext()

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
        const response = await axios.post('/api/addCategory', { name, description });
        setMessage(response.data.message);
        setName('');
        setDescription('');

        // Delay the setformSubmit update by 2 seconds
        setTimeout(() => {
            setformSubmit((prev) => prev + 1);
        }, 2000);
    } catch (err) {
        const errorMessage = err.response?.data?.error || 'An error occurred';
        setError(errorMessage);
    }
};


  return (
    <Layout>
    <div className="container min-h-screen mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter category name"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Category Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter category description"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Category
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </form>
    </div>
    </Layout>);
};

export default AddCategory;
