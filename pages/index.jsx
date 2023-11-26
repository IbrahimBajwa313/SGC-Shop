//  import Header from "@/pages/header";

import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useInView } from 'react-hook-inview'
import { motion } from "framer-motion";
export default function Home() {
  const [ref, inView] = useInView();
  return (
    
    <motion.main
        initial={{ opacity: 0 ,scale:1,y:-50   }}  animate={{y:0,  opacity: 1, scale: 1}} transition={{ delay: 0,duration:.3,stiffness:50 }} className='overflow-x-hidden z-40'>
      {/* <div className="bg-black text-white">jnjnjnjjnk</div> */}
      <HeroBanner></HeroBanner>

      <Wrapper>
        <div className=' text-center max-w-[800px] mt-[50px] md:mt-[80px] mx-auto'>

          <div className='font-bold text-[28px] md:text-[34px]  mb-2 leading-tight '>Discover Your Signature Look</div>
          <div className='felx text-[20px] mb-4'>Explore our thoughtfully curated collection of shoes that caters to various styles, occasions, and personalities.  </div>

        </div>

        {/* Product Grid   */}
        <div ref={ref} className="mb-52">
        {inView&&<motion.div  initial={{ opacity: 0,y:-100}} transition={{ type:'tween',duration:.7,delay:.2 ,stiffness: 100 }} animate={{ y:0,x: 0,rotate:0, opacity: 1, scale: 1 }}className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0'>
          <ProductCard />
        </motion.div>}

</div>
      </Wrapper>
    </motion.main>
  )
}
