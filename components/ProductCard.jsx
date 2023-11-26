import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const ProductCard = () => {
  const [products, setProducts] = useState([]); // Change variable name to 'products'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getProducts');
        const result = await response.json();

        // Ensure the response has a "products" property and it's an array before setting state
        if (result && Array.isArray(result.products)) {
          setProducts(result.products);
        } else {
          console.error('Invalid data structure received:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      {products.map((item) => {
        // Calculate the discount percentage
        const discountPercentage = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
  
        return (
          <div key={item._id} className='bg-white shadow-xl duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl'>
            <Link href={`/product/${item._id}`}>
              <img className='w-full' src={`/productIamages/${item.img}/thumbnail.webp`} alt="Product-Image" />
              <div className='p-4 text-black-[0.9]'>
                <h2 className='text-lg font-medium'>{item.tytle}</h2>
                <div className='flex items-center text-black-[0.8]'>
                  <p className='mr-2 text-lg font-semibold'>{item.price}$</p>
                  <p className='text-base font-medium line-through'>{item.originalPrice}$</p>
                  <p className='ml-auto text-green-500 font-base'>{discountPercentage}% off</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
  
}

export default ProductCard;
