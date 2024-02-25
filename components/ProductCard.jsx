import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProductCard = ({ slug,query }) => {
  // console.log(slug,query)
  const [products, setProducts] = useState([]);
  const [Category, setCategory] = useState('');
  
  
// console.log('data',query.length)s
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getProducts');
        const result = await response.json();

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

  useEffect(() => {
    setCategory(slug);
  }, [slug]);

  return (
    <>
    {query?.length==0&&<> 
      {products.map((item) => {
        const discountPercentage = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

        return (
        <>  {item.category==slug?.toLowerCase()&&<motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 1, y: -50 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
            className='bg-white shadow-xl duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl'
          >
            <Link href={`/product/${item._id}`}>
              <Image
                src={`/productIamages/${item.img}/thumbnail.webp`}
                alt="Product-Image"
                width={400}
                height={400}
              />
              <div className='p-4 text-black-[0.9]'>
                <h2 className='text-lg font-medium'>{item.title}</h2>
                <div className='flex items-center text-black-[0.8]'>
                  <p className='mr-2 text-lg font-semibold'>{item.price}$</p>
                  <p className='text-base font-medium line-through'>{item.originalPrice}$</p>
                  <p className='ml-auto text-green-500 font-base'>{discountPercentage}% off</p>
                </div>
              </div>
            </Link>
          </motion.div>
        }</>);
      })}
    </>}
    {query==undefined&&slug==undefined&&<> 
      {products.map((item) => {
        const discountPercentage = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

        return (
        <>  <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 1, y: -50 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
            className='bg-white shadow-xl duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl'
          >
            <Link href={`/product/${item._id}`}>
              <Image
                src={`/productIamages/${item.img}/thumbnail.webp`}
                alt="Product-Image"
                width={400}
                height={400}
              />
              <div className='p-4 text-black-[0.9]'>
                <h2 className='text-lg font-medium'>{item.title}</h2>
                <div className='flex items-center text-black-[0.8]'>
                  <p className='mr-2 text-lg font-semibold'>{item.price}$</p>
                  <p className='text-base font-medium line-through'>{item.originalPrice}$</p>
                  <p className='ml-auto text-green-500 font-base'>{discountPercentage}% off</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </>);
      })}
    </>}
    {query?.length!=0&&<>
      {query?.map((item) => {
        const discountPercentage = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 1, y: -50 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
            className='bg-white shadow-xl duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl'
          >
            <Link href={`/product/${item._id}`}>
              <Image
                src={`/productIamages/${item.img}/thumbnail.webp`}
                alt="Product-Image"
                width={400}
                height={400}
              />
              <div className='p-4 text-black-[0.9]'>
                <h2 className='text-lg font-medium'>{item.title}</h2>
                <div className='flex items-center text-black-[0.8]'>
                  <p className='mr-2 text-lg font-semibold'>{item.price}$</p>
                  <p className='text-base font-medium line-through'>{item.originalPrice}$</p>
                  <p className='ml-auto text-green-500 font-base'>{discountPercentage}% off</p>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </>}
    </>
  );
};

export default ProductCard;
