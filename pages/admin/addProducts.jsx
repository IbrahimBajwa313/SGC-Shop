import React, { useState, useEffect } from 'react';
import { FaRupeeSign } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";
import { AiOutlineClose } from 'react-icons/ai';
import { RxCrossCircled } from "react-icons/rx";

export default function ProductUpload() {
  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    images: [],
    category: '',
    sizes: [],
    price: '',
    availability: true,
    availableQuantity: '',
    discount: ''
  });
  const [imgThumbnail, setImgThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selected, setSelected] = useState(false)
  const sizes = ['S', 'M', 'L', 'XL']

  const handleSizeClick = (size) => {
    // const sizes=[]
    // sizes.push(size)
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        // If size is already selected, remove it
        return prevSelectedSizes.filter((selectedSize) => selectedSize !== size);
      } else {
        // Otherwise, add the size to the selected sizes
        return [...prevSelectedSizes, size];
      }
    });

    setProductData(prevState => ({
      ...prevState, // Keep the previous values of the state
      sizes: selectedSizes,
    }));


  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index); // Remove image at the specified index
    });
    setProductData(prevState => ({
      ...prevState, 
      images: images // Set the new sizes array
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; 

  const handleFileChange = (e) => {
    setImages((prevImages) => {
        return [...prevImages, e.target.files[0]];
    });
    setProductData(prevState => ({
      ...prevState, 
      images: images // Set the new sizes array
    }));
  };

  useEffect(() => {
    // console.log('selectedSizes', selectedSizes)
    // console.log('images', images)
    setProductData(prevState => ({
      ...prevState,
      sizes: selectedSizes, 
      images: images // Set the new sizes array
    }));

  }, [handleSizeClick, handleImageRemove, handleFileChange])


  const handleSubmit = async (e) => {
    e.preventDefault();

    

    console.log('product', productData)
    console.log('product', productData.title)

    const formData = new FormData();
    formData.append('title', productData.title || '');
    formData.append('desc', productData.desc || '');
    formData.append('category', productData.category || '');
    formData.append('price', productData.price || 0);
    formData.append('availableQuantity', String(productData.availableQuantity || 0));
    formData.append('availability', productData.availability);
    formData.append('discount', productData.discount || 0);

    // Append 'sizes' as JSON string (array format)
    formData.append('sizes', productData.sizes || []);

    // Append 'images' as JSON string (array format)
    // formData.append('images', productData.images || []);
    if (productData.images && Array.isArray(productData.images)) {
      productData.images.forEach((image) => {
        formData.append('images[]', image);  // 'images[]' is the key that groups them as an array on the backend
      });
    }
    console.log('images',productData.images)
    

    const res = await fetch('/api/addProducts', {
      method: 'POST',
      body: formData,
    });
    
    if (res.ok) {
      alert('Product uploaded successfully');
    } else {
      // Log the error details
      const errorData = await res.json(); // Parse the JSON error response
      console.error('Upload Error:', errorData); // Log error details in the console
    
      // Display a more informative alert
      alert(`Failed to upload product: ${errorData.error || 'Unknown error occurred'}`);
    }
    
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-[60%]">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Upload Product</h2>

        {/* Product Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 mb-2">
            Product Title
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

        {/* Product Description */}
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-600 mb-2">
            Description
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

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter product category"
            required
          />
        </div>

        {/* Size */}
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-600 mb-2">
            Sizes (comma separated)
          </label>
          <div className="sizes flex items-center gap-2">
            {sizes.map((size, index) => (
              <div key={index} className={`py-2 px-3 cursor-pointer text-sm rounded-lg ${selectedSizes.includes(size)
                  ? 'bg-gray-600 text-white' // Selected size
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800' // Unselected size
                }`}
                onClick={() => { handleSizeClick(size); }}>{size}</div> // Render each item as a list
            ))}
          </div>
          {/* <input
            type="text"
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter sizes (comma separated)"
          /> */}
        </div>


        {/* Price */}
        <div className="mb-4 relative">
          <label htmlFor="price" className="block text-gray-600 mb-2 ">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter price"
            required
          />
          <div className="rs absolute right-4 top-[50%] p-2 bg-gray-300 rounded-full">
            <FaRupeeSign />
          </div>
        </div>

        {/* Price */}
        <div className="mb-4 relative">
          <label htmlFor="discount" className="block text-gray-600 mb-2">
            Discount(Optional)
          </label>
          <input
            type="text"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter price"
            required
          />
          <div className="rs absolute right-[0.85rem] top-[49%] p-[0.35rem] bg-gray-300 rounded-full">
            <RiDiscountPercentFill color='black' size={22} />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="availableQty" className="block text-gray-600 mb-2">
            Availability
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="availability"
                value={true}
                // checked={productData.availability === true}
                onChange={handleChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">In Stock</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="availability"
                value={false}
                // checked={productData.availability === false}
                onChange={handleChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Out of Stock</span>
            </label>
          </div>
        </div>


        {/* Available Quantity */}
        <div className="mb-4">
          <label htmlFor="availableQty" className="block text-gray-600 mb-2">
            Available Quantity
          </label>
          <input
            type="text"
            name="availableQuantity"
            value={productData.availableQuantity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter available quantity"
          />
        </div>

        {/* Thumbnail Image */}
        <div className="mb-4">
          <label htmlFor="imgThumbnail" className="block text-gray-600 mb-2">
            Image
          </label>

          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" name="imgThumbnail"
                onChange={handleFileChange} class="hidden" multiple />
            </label>
          </div>

          <div className="images-preview flex w-full items-center gap-2 my-2 overflow-x-auto">
            {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)}  className={`min-w-28 min-h-28 max-w-28 max-h-28 rounded-md hover:brightness-75`}
                  /> 
                  <RxCrossCircled onClick={() => handleImageRemove(index)}  size={20} color='red' className='absolute top-1 right-1 cursor-pointer' />
                </div>// Render each item as a list
              ))}
          </div>

          {/* <input
            type="file"
            name="imgThumbnail"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          /> */}
        </div>


        {/* Submit Button */}
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
  );
}
