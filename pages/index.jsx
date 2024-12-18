//  import Header from "@/pages/header";

import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import Wrapper from "../components/Wrapper";
import { useInView } from 'react-hook-inview'
import { motion } from "framer-motion";

export default function Home() {

  const [ref, inView] = useInView();
  return (
    
    <main  className='overflow-x-hidden w-screen z-40'>

      <HeroBanner />

      <Wrapper>
        <div className=' text-center max-w-[800px] mt-[50px] md:mt-[80px] mx-auto'>

          <div className='font-bold text-[28px] md:text-[34px]  mb-2 leading-tight '>Stand for Palestine with Every Step</div>
          <div className='felx text-[20px] mb-4'>
          Discover our collection of thoughtfully crafted products, where every purchase contributes to the cause of justice, hope, and freedom for Palestine. Together, let’s make a difference! </div>

        </div>

        {/* Product Grid   */}
        <div ref={ref} className="mb-52">
        {<div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0'>
          <ProductCard />
        </div>}

</div>
      </Wrapper>
    </main>
  )
}
