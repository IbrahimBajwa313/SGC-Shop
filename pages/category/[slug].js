<<<<<<< HEAD
import ProductCard from "../../components/ProductCard";
import Wrapper from "../../components/Wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // State for loader
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch("/api/getProducts");
        const result = await response.json();

        const filteredResults = result.products.filter((product) => {
          if (slug && product.category) {
            return product.category.toLowerCase() === slug.toLowerCase();
          }
          return true;
        });

        setProducts(filteredResults);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      handleSearch();
    }
  }, [slug ]);
 

  return (
    <Wrapper>
        <div className="w-full md:py-10 ">
        <div className="text-center mx-w-[800px] mx-auto md:pt-0">
          {slug && (
            <div className=" font-sans text-[28px] md:text-[34px] mb-10 leading-tight">
              Items related to '{slug}'
            </div>
          )}
        </div> 
        </div> 


        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <>
            {products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => {
                const discountPercentage = Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) * 100
                );

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 1, y: -50 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
                    className="bg-white shadow-xl duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl"
                  >
                    <Link href={`/product/${item._id}`}>
                      <Image
                        src={`/productIamages/${item.img || "placeholder"}/thumbnail.webp`}
                        alt={item.title || "Product Image"}
                        width={400}
                        height={400}
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                      />
                      <div className="p-4 text-black-[0.9]">
                        <h2 className="text-lg font-medium">{item.title}</h2>
                        <div className="flex items-center text-black-[0.8]">
                          <p className="mr-2 text-lg font-semibold">
                            {item.price}$
                          </p>
                          <p className="text-base font-medium line-through">
                            {item.originalPrice}$
                          </p>
                          <p className="ml-auto text-green-500 font-base">
                            {discountPercentage}% off
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}</div>
              ) : (
              <p className="text-center text-gray-600">No products found.</p>
            )}
          </>
        )}
      </Wrapper>
     
  );
};

export default Category;
=======
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { useRouter } from 'next/router'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { motion } from 'framer-motion';

const Category = () => {
    const [query, setquery] = useState(null)
    const router = useRouter()
    const { slug } = router.query
    const searchparams=useSearchParams()
// console.log('query is ',searchparams.get('query'))
const data=searchparams.get('query')
//
const handleSearch = async () => {
    // logic to handle search
 

      // Fetch products from the API
      const response = await fetch('/api/getProducts');
      const result = await response.json();

      // Filter products based on the search query
      const filteredResults = result.products.filter((product) =>
        product.title.toLowerCase().includes(data?.toLowerCase())
      );

      // Update the search results
      setquery(filteredResults);

    // Navigate to SearchResults page with the search query as a parameter
    
  };

  handleSearch()
//
  return (
    <div className='w-full md:py-10 min-h-screen'>
    <Wrapper>
        <div className='text-center mx-w-[800px] mx-auto md:pt-0'>
            {!data&&<div className='text-[28px] md:text-[34px] mb-10 leading-tight font-semibold'>
                {slug?.toUpperCase()}
            </div>}
            {data&&<div className='text-[28px] md:text-[34px] mb-10 leading-tight '>
                Items related to '{slug}'
            </div>}
        </div>

    {/* Product Grid   */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0'>
            <ProductCard slug={slug} query={query} />
           
        </div>                        
    </Wrapper>
      </div>
  )
}

export default Category
>>>>>>> ee4fa5c2f78c10c17fa243787654c77fef3ede14
