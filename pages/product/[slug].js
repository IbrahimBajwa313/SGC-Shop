import ProductDetailCarousel from "../../components/ProductDeatailCrousel";
import RelatedProducts from "../../components/RelatedProducts";
import Wrapper from "../../components/Wrapper";
import React, { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { MyContext } from "../../pages/_app";
import { useRouter } from "next/router";
import AddToCartNotification from "../../components/AddToCartNotification";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const [items, setItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  const { addToCart } = MyContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getProducts");
        const result = await response.json();

        // Ensure the response has a "products" property and it's an array
        if (result) {
          setItems(result.products);
        } else {
          console.error("Invalid data structure received:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const checkServiceAvailability = async () => {
    try {
      const pins = await fetch("/api/pincode");
      const pinJson = await pins.json();
      if (pinJson.includes(+pin)) {
        setService(true);
      } else {
        setService(false);
      }
    } catch (error) {
      console.error("Error checking service availability:", error);
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, y: -10 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
      className="w-full min-h-screen md:py-20"
    >
      {items.map(
        (product) =>
          product.id === slug && (
            <div key={product.id}>
              {/* Parse and validate images */}
              <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                  {/* Left Column */}
                  <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                    <ProductDetailCarousel
                      img={product.img}
                      images='["/productImages/palestine-black-keffiyeh/1.jpg",
                      "/productImages/palestine-black-keffiyeh/2.jpg",
                      "/productImages/palestine-black-keffiyeh/3.jpg",
                      "/productImages/palestine-black-keffiyeh/4.jpg"]'
                    />
                  </div>

                  {/* Right Column */}
                  <div className="flex-[1] py-3">
                    {/* Product Title */}
                    <div className="font-bold text-[31px] mb-2">
                      {product.title}
                    </div>

                    {/* Product Subtitle */}
                    <div className="text-lg font-semibold mb-5">
                      {product.category}
                    </div>

                    {/* Price Details */}
                    <div className="text-lg font-semibold">
                      Price: {product.price} $
                    </div>
                    <div className="text-sm text-black/[0.5]">
                      Incl. of Taxes
                    </div>
                    <div className="text-sm text-black/[0.5] mb-20">
                      (Also includes all applicable duties and delivery charges)
                    </div>

                    {/* Pin Code Service Availability */}
                    <div className="mb-10">
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="mb-4 w-full"
                        method="post"
                      >
                        <div className="flex">
                          <input
                            onChange={onChangePin}
                            type="text"
                            placeholder="Enter your Pincode"
                            className="border px-3 sm:py-4 py-3 w-full rounded-3xl mr-2 border-gray-600"
                          />
                          <button
                            onClick={checkServiceAvailability}
                            className="bg-black border border-black text-white sm:text-md text-sm px-auto py-3 w-full sm:py-4 rounded-3xl font-md transition-transform active:scale-95 hover:opacity-75"
                          >
                            Check
                          </button>
                        </div>
                      </form>

                      {!service && service !== null && (
                        <div className="text-red-600 mb-3">
                          We can't deliver to this Postal Code
                        </div>
                      )}
                      {service && service !== null && (
                        <div className="text-green-600 mb-3">
                          Delivery Services are available at this pin code
                        </div>
                      )}
                    </div>

                    {/* Add To Cart Button */}
                    <button
                      onClick={() => {
                        addToCart(
                          slug,
                          product.title,
                          product.availableQty,
                          product.price,
                          product.color,
                          product.imgThumbnail,
                          product.category
                        );
                        setIsCartVisible(true);
                        setTimeout(() => setIsCartVisible(false), 3000);
                      }}
                      className="w-full text-lg bg-black text-white border rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mb-3"
                    >
                      Add To Cart
                    </button>

                    <AddToCartNotification isVisible={isCartVisible} />

                    {/* Wishlist Button */}
                    <button className="w-full text-lg border border-black rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mb-10">
                      Wishlist
                      <IoMdHeartEmpty size={20} />
                    </button>

                    {/* Product Details */}
                    <div>
                      <div className="text-lg font-bold mb-5">
                        Product Details
                      </div>
                      <div className="text-md mb-5">{product.desc}</div>
                    </div>
                  </div>
                </div>

                <RelatedProducts />
              </Wrapper>
            </div>
          )
      )}
    </motion.div>
  );
}
