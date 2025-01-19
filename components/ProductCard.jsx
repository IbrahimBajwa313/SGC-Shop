import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Loader from "./loader";

const ProductCard = ({ slug, query }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loader

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/getProducts");
        const result = await response.json();

        if (result && Array.isArray(result.products)) {
          setProducts(result.products);
          setIsLoading(false)
        } else {
          console.error("Invalid data structure received:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false); // Stop the loader after data is fetched
      }
    };

    fetchData();
  }, []);


  
  
  return (
     
        <>
        {isLoading&&<Loader></Loader>}
        
          {products?.length > 0 ? (
            // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              products.map((item) => {
                console.log('item is',item.imgages)
                const discountPercentage = Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) * 100
                );

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0, duration: 0.2 }}
                    className="bg-white shadow-xl duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl"
                  >
                    <Link href={`/product/${item._id}`}>
                      <Image
                        src={item.imgThumbnail}
                        alt="Product-Image"
                        width={400}
                        height={400}
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
              })
             
          ) :!isLoading? (
           <p className="text-center text-gray-600">No products found.</p>
          ):null
          }
        </> 
  );
};

export default ProductCard;
