import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import React from 'react'

const Category = () => {
  return (
    <div className='w-full md:py-10'>
    <Wrapper>
        <div className='text-center mx-w-[800px] mx-auto md:pt-0'>
            <div className='text-[28px] md:text-[34px] mb-10 leading-tight font-semibold'>
                Running Shoes
            </div>
        </div>

    {/* Product Grid   */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>                        
    </Wrapper>
      </div>
  )
}

export default Category
