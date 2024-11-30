import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import { Carousel } from 'react-responsive-carousel';
import Wrapper from './Wrapper';
import Image from 'next/image'; // Import Image from next/image

export default function ProductDetailCarousel({ img }) {  // Destructure img prop

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Wrapper>
        <Carousel
          infiniteLoop={true}
          showIndicators={true}
          showStatus={true}
          autoPlay={true}
          thumbWidth={60}
          className="productCarousel"
        > 
          {/* Replace img with Next.js Image component for optimization */}
          <div>
            <Image 
              src={`/productImages/${img}/thumbnail.webp`} 
              alt="Product Thumbnail" 
              width={600}  // Adjust the width and height as needed
              height={600}
              layout="responsive"  // To make the image responsive
            />
          </div>
          <div>
            <Image 
              src={`/productImages/${img}/1.webp`} 
              alt="Product Image 1" 
              width={600} 
              height={600}
              layout="responsive"
            />
          </div>
          <div>
            <Image 
              src={`/productImages/${img}/2.webp`} 
              alt="Product Image 2" 
              width={600} 
              height={600}
              layout="responsive"
            />
          </div>
          <div>
            <Image 
              src={`/productImages/${img}/3.webp`} 
              alt="Product Image 3" 
              width={600} 
              height={600}
              layout="responsive"
            />
          </div>
          <div>
            <Image 
              src={`/productImages/${img}/4.webp`} 
              alt="Product Image 4" 
              width={600} 
              height={600}
              layout="responsive"
            />
          </div>
        </Carousel>
      </Wrapper>
    </div>
  );
}
