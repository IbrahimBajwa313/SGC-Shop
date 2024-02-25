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
