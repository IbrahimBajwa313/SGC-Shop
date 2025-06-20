import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-4 sm:px-6 md:px-10 py-14 sm:py-16 md:py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Right Section: Content */}
      <div className="w-full md:flex-1 px-2 sm:px-6 md:px-10 space-y-6 text-center md:text-left mt-12 md:mt-0">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-white">
          Shop with <span className="text-gray-300">Purpose</span>,
          <br className="hidden sm:block" /> Style with{" "}
          <span className="text-gray-300">Impact</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300">
          Discover top-quality products, handpicked for your lifestyle. <br />
          <span className="font-semibold text-white">
            50% of all profits are donated to support the Palestine cause.
          </span>
        </p>
        <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-lg hover:bg-gray-200 hover:shadow-xl transition-all duration-300">
          Start Shopping
        </button>
        <div className="space-y-2 mt-6 sm:mt-8">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Every Order Counts
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
            Whether you're upgrading your wardrobe, tech, or home essentials —
            your purchase contributes to a meaningful cause. Shop consciously.
            Make an impact.
          </p>
        </div>
      </div>

      {/* Left Section: Image */}
      <div className="w-full md:flex-1 flex justify-center relative mt-10 md:mt-0">
        {/* Decorative background bubble */}
        <div className="absolute top-0 left-0 w-3/6 h-3/6 bg-white/10 rounded-full transform -translate-x-10 -translate-y-10 -z-10 hidden md:block"></div>

        {/* Responsive image container */}
        <div className="relative overflow-hidden rounded-full shadow-2xl transform hover:scale-105 transition duration-300 w-48 h-48 sm:w-60 sm:h-60 md:w-[480px] md:h-[480px]">
          <Image
            src="/ibi.jpg"
            alt="Product"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
