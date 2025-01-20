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
