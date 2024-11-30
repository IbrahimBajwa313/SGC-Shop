import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'; // Import the Image component from Next.js

const HeroBanner = () => {
    return (
        <div className='relative text-[20px] z-0 max-w-[1360px] mx-auto'>
            <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
                <div>
                    <Image 
                        src="/slide-1.png" 
                        alt="Slide 1" 
                        width={1360} 
                        height={500} 
                        layout="responsive" // Maintains responsive aspect ratio
                    />
                    <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.5] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                        Shop now
                    </div>
                </div>
                <div>
                    <Image 
                        src="/slide-2.png" 
                        alt="Slide 2" 
                        width={1360} 
                        height={500} 
                        layout="responsive"
                    />
                    <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                        Shop now
                    </div>
                </div>
                <div>
                    <Image 
                        src="/slide-3.png" 
                        alt="Slide 3" 
                        width={1360} 
                        height={500} 
                        layout="responsive"
                    />
                    <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.5] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                        Shop now
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

export default HeroBanner;
