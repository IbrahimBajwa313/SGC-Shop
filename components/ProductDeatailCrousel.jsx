import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import { Carousel } from 'react-responsive-carousel';
import Wrapper from './Wrapper';
import Image from 'next/image';

export default function ProductDetailCarousel({ imgThumbnail, imgages }) {
  console.log('imgages',imgages )
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
          {/* Thumbnail image */}
          <div>
            <Image 
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/${imgThumbnail}`}
              alt="Thumbnail" 
              width={600} 
              height={600} 
              className="rounded-lg"
            />
          </div>

          {/* Additional images from imgages array */}
          {imgages.map((image, index) => (
            <div key={index}>
              <Image 
  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`} 
  alt={`Image ${index + 1}`} 
  width={600} 
  height={600} 
  className="rounded-lg"
/>
            </div>
          ))}
        </Carousel>
      </Wrapper>
    </div>
  );
}
