//  import Header from "@/pages/header";

import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import Wrapper from "../components/Wrapper";
import { useInView } from "react-hook-inview";
import { motion } from "framer-motion";
import Loader from "../components/loader";

export default function Home() {
  const [ref, inView] = useInView();
  return (
    <main className="overflow-x-hidden w-screen z-40">
      <HeroBanner />
      {/* Business Tagline */}
      <div className="text-center text-black px-6 md:px-0 my-10 md:mt-16">
        <h1 className="text-lg md:text-3xl font-bold max-w-3xl mx-auto">
          We’re more than just a store — we’re a movement.{" "}
          <span className="text-teal-600 font-semibold">
            50% of our profits go directly to supporting the people of
            Palestine.
          </span>
        </h1>
      </div>
      <Wrapper>
        {/* Product Grid   */}
        <div ref={ref} className="mb-52">
          {
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 md:px-0">
              <ProductCard />
            </div>
          }
        </div>
      </Wrapper>
    </main>
  );
}
