import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { useRouter } from 'next/router'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link'

const Sort = () => {
    const [Product, setProduct] = useState([])
    const router = useRouter()
    const { slug } = router.query
    const searchparams=useSearchParams()

//
const handleSearch = async () => {
    // logic to handle search
//  console.log('isis',slug)

      // Fetch products from the API
    if(slug=='Price high to low'){
      const response = await fetch('/api/getProducts?sortBy=highToLow');
      const result = await response.json();
      setProduct(result.products)
      console.log(result)
}if(slug=='Price low to high'){
    const response = await fetch('/api/getProducts?sortBy=lowToHigh');
    const result = await response.json();
    setProduct(result.products)
}
      // Filter products based on the search query
      

      // Update the search results
      

    // Navigate to SearchResults page with the search query as a parameter
    
  };

  handleSearch()
//
  return (
    <div className='w-full md:py-10 min-h-screen'>
    <Wrapper>
        <div className='text-center mx-w-[800px] mx-auto md:pt-0'>
            <div className='text-[28px] md:text-[34px] mb-10 leading-tight font-semibold'>
                {slug?.toUpperCase()}
            </div>
            </div>

    {/* Product Grid   */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0'>
    {Product?.map((item) => {
        const discountPercentage = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
// console.log('isisis',item.title)
        return (
        <>  <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 1, y: -50 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
            className='bg-white shadow-xl duration-200 hover:scale-105 cursor-pointer hover:shadow-2xl'
          >
            <Link href={`/product/${item._id}`}>
              <img
                src={`/productIamages/${item.img}/thumbnail.webp`}
                alt="Product-Image"
               
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
           
        </div>                        
    </Wrapper>
      </div>
  )
}

export default Sort
