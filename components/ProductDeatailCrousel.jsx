import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import { Carousel } from "react-responsive-carousel";
import Wrapper from "./Wrapper";
import Image from "next/image";

export default function ProductDetailCarousel({ img, images }) {
  // Parse the images if they are in stringified JSON format
  let imageArray = [];
  try {
    imageArray = typeof images === "string" ? JSON.parse(images) : [];
  } catch (error) {
    console.error("Failed to parse images:", error);
  }

  // Ensure img is a valid string
  const mainImage = typeof img === "string" ? img : null;

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Wrapper>
        <Carousel
          infiniteLoop={true}
          showIndicators={true}
          showStatus={true}
          autoPlay={true}
          thumbWidth={60}
          showThumbs={imageArray.length > 0} // Show thumbs only if images exist
          renderThumbs={() =>
            imageArray.map((image, index) => (
              <img
                key={index}
                src={image} // Thumbnail path
                alt={`Thumbnail ${index + 1}`}
                className="rounded-md"
              />
            ))
          }
          className="productCarousel"
        >
          {/* Main Image */}
          {mainImage && (
            <div>
              <Image
                src={mainImage}
                alt="Main Product Image"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          )}

          {/* Additional Images */}
          {imageArray.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
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
