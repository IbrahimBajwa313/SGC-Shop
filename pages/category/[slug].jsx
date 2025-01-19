import ProductCard from "../../components/ProductCard";
import Wrapper from "../../components/Wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../../components/loader";

const Category = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const router = useRouter();
  const { slug } = router.query; // Destructure 'slug' from router.query
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMessage(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setIsLoading(true)
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
  }, [slug]); // Dependency array ensures this runs when 'slug' changes

  return (
    <Wrapper>
      <div className="w-full md:py-8">
        <div className="text-center mx-w-[800px] mx-auto md:pt-0">
          {slug && (
            <div className="font-sans text-[28px] md:text-[34px] mb-10 leading-tight">
              Items related to '{slug}'
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader></Loader>
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
                    <Link href={`/product/${item._id}`} >
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
              })}
            </div>
          ) :!isLoading&&message? (
            <p className="text-center text-gray-600">No products found.</p>
          ):null}
        </>
      )}
    </Wrapper>
  );
};

export default Category;
