import CartItem from "../components/CartItem";
import { useState } from "react";
import Wrapper from "../components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { MyContext } from "./_app";
import { motion } from "framer-motion";
import VoiceInput from "../components/VoiceInput";
import { parseVoiceCommand } from "../utils/voiceParser";
import stringSimilarity from "string-similarity";

const Cart = () => {
  // Using Context API to use app functions in this file
  const { cart, addToCart, oneMinusQty, clearCart, subTotal } = MyContext();

  const [products, setProducts] = useState([]);

  const userRole = "buyer"; // Get from session/auth context

  useEffect(() => {
  fetch("/api/getProducts")
    .then((res) => res.json())
    .then((data) => {
      // If your API returns { products: [...] }
      setProducts(data.products || data);
    });
}, []);

  //   handleVoiceCommand Function
const handleVoiceCommand = (text) => {
  console.log("Recognized text:", text);
  const userRole = "buyer";
  const command = parseVoiceCommand(text, userRole);
  console.log("Parsed command:", command);

  if (command.intent === "add_to_cart") {
    // Build an array of product names (lowercase)
    const productNames = products.map(
      (p) => (p.title || p.name || "").toLowerCase()
    );

    // Use string-similarity to find the best match
    const bestMatch = stringSimilarity.findBestMatch(
      command.product.toLowerCase(),
      productNames
    );

    // Get the best matching product name and its rating
    const bestProductName = bestMatch.bestMatch.target;
    const bestRating = bestMatch.bestMatch.rating;

    // Find the actual product object
    const product = products.find(
      (p) =>
        (p.title && p.title.toLowerCase() === bestProductName) ||
        (p.name && p.name.toLowerCase() === bestProductName)
    );

    // Only add if the match is reasonably close (tune threshold as needed)
    if (product && bestRating > 0.5) {
      addToCart(
        product._id,
        product.title,
        command.quantity,
        product.price,
        product.color || "",
        product.imgThumbnail || "",
        product.category || ""
      );
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          `Added ${command.quantity} ${product.title}(s) to your cart.`
        )
      );
    } else {
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          `Sorry, I could not find ${command.product}.`
        )
      );
    }
  } else {
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance("Sorry, I did not understand the command.")
    );
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, y: -20 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
      className="md:my-20 w-full min-h-screen "
    >
      <Wrapper>
        {/* Voice Button Fixed at Bottom Right */}
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            zIndex: 1000,
          }}
        >
          <VoiceInput onText={handleVoiceCommand} />
        </div>

        {/* Shoong Cart Heading */}
        <div className="text-center mt-8 md:mt-0 max-w-[800px] mx-auto">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shoping Cart
          </div>
        </div>

        {/* Cart Content */}

        {Object.keys(cart).length !== 0 && (
          <div className="flex flex-col lg:flex-row gap-12 py10">
            {/* Cart Item Start */}
            <div className="flex-[2] ">
              <div className="text-lg font-bold ">Cart Items</div>

              <CartItem />
            </div>
            {/* Cart Item end */}

            {/* Summary Item Start */}
            <div className="flex-[1]">
              <div className="text-lg font-bold">Summary</div>
              <div className="p-5 my-5 bg-black/[0.05] rounded-xl ">
                <div className="flex justify-between">
                  <div className="uppercase text-md md:text-lg font-medium text-black">
                    Subtotal
                  </div>

                  <div className="uppercase text-md md:text-lg font-medium text-black">
                    {localStorage.getItem("SubTotal")}/. $
                  </div>
                </div>

                <div className="text-sm md:text-md  border-t mt-5 py-5 ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corporis est fugit dicta dolore porro incidunt .
                </div>
              </div>

              <Link href={"./checkout"}>
                <button className="w-full  text-lg bg-black text-white border  rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 ">
                  Checkout
                </button>
              </Link>

              {/* Clear Chart Button Start */}
              <button
                onClick={clearCart}
                className="w-full  text-lg border border-black rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mt-4"
              >
                Clear Cart
              </button>
              {/* Clear Chart Button End */}
            </div>
            {/* Summary Item end */}
          </div>
        )}
        {/* Cart Content End*/}

        {/*When Cart is empty  */}
        {Object.keys(cart).length === 0 && (
          <div className="flex flex-[2] flex-col items-center  pb-[50px] md:mt-12">
            <Image
              priority={false}
              src="/empty-cart.jpg"
              height={300}
              alt="Empty Cart Image"
              width={300}
              className="w-[300px] md:w-[400px]"
            ></Image>

            <span className="font-bold text-xl">Your Cart is empty</span>
            <span className="text-center mt-4">
              Looks Like have'nt added anything in your cart
              <br /> Go ahead and explore more Categories
            </span>

            {/* Add To Continue Shoping Start */}
            <Link href="/">
              <button className="w-60  text-lg bg-black text-white border  rounded-full py-3 mt-8 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mb-3">
                Continue Shoping
              </button>
            </Link>
            {/* Add To Continue Shoping */}
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
};

export default Cart;
