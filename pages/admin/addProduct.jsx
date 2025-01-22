import React, { useState } from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import { Router } from 'next/router';

export default function ProductUpload() {

  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    category: '',
    size: '',
    price: '',
    availableQty: '',
  });
  const [imgThumbnail, setImgThumbnail] = useState(null);
  const [imgages, setImgages] = useState([]);
  const [category, setCategory] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/getCategory');
            const data = await response.json();
            setCategory(data.categories);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    fetchProducts();
}, []);
console.log('product is',category)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'imgThumbnail') {
      setImgThumbnail(e.target.files[0]);
    } else if (e.target.name === 'imgages') {
      setImgages([...e.target.files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('desc', productData.desc);
    formData.append('category', productData.category);
    formData.append('size', productData.size);
    formData.append('price', productData.price);
    formData.append('availableQty', productData.availableQty);
    if (imgThumbnail) formData.append('imgThumbnail', imgThumbnail);
    imgages.forEach((img) => formData.append('imgages', img));

    try {
      const response = await fetch('/api/addProducts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Product uploaded successfully');

        // Redirect to the admin dashboard
        router.push('/admin/products');

        setProductData({
          title: '',
          desc: '',
          category: '',
          size: '',
          price: '',
          availableQty: '',
        });
        setImgThumbnail(null);
        setImgages([]);
      } else {
        alert('Failed to upload product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the product');
    }
  };

  return ( 
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Upload Product</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 mb-2">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-600 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="desc"
            value={productData.desc}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {category.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-600 mb-2">
          Size <p className='text-xs'>(Specify sizes (comma-separated) or leave blank if not applicable.)</p>
          </label>
          <input
            type="text"
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter sizes (comma separated)"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-600 mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="availableQty" className="block text-gray-600 mb-2">
            Available Quantity
          </label>
          <input
            type="number"
            name="availableQty"
            value={productData.availableQty}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter available quantity"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imgThumbnail" className="block text-gray-600 mb-2">
            Thumbnail Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="imgThumbnail"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="imgages" className="block text-gray-600 mb-2">
            Additional Images
          </label>
          <input
            type="file"
            name="imgages"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-600 transition duration-300"
          >
            Upload Product
          </button>
        </div>
      </form>
    </div>
    </>);
}
