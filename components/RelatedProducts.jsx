import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import ProductCard from './ProductCard';
import Wrapper from './Wrapper';

const RelatedProducts = () => {
  // Using the library , Reacat Respnsive multi carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    
<>
    <div className='mt-[50px] md:mt-[100px] mb-[100px] md:mb-0'>
        <div className='text-2xl font-bold mb-5'>Relsted Items</div>
       
    </div>

    
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0'>
        <ProductCard />
      </div></>
  )
}

export default RelatedProducts
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import React from 'react'
// import ProductCard from './productCard';

// const RelatedProducts = () => {
//     // Using the library , Reacat Respnsive multi carousel
//     const responsive = {
//         desktop: {
//           breakpoint: { max: 3000, min: 1024 },
//           items: 3
//         },
//         tablet: {
//           breakpoint: { max: 1024, min: 464 },
//           items: 2
//         },
//         mobile: {
//           breakpoint: { max: 464, min: 0 },
//           items: 1
//         }
//       };
//   return (
//     <div className='mt-[50px] md:mt-[100px] mb-[100px] md:mb-0'>
//         <div className='text-2xl font-bold mb-5'>Relsted Items</div>
//         <Carousel responsive={responsive} containerClass='-mx-[10px]' itemClass='px-[10px]'>
//             {/* itemClass applies on every single item */}
//             {/* containerClass applies on the whole container */}
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//         </Carousel>;
//     </div>
//   )
// }

// export default RelatedProducts

