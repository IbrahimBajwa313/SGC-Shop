import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative flex flex-wrap items-center justify-between min-h-screen px-10 py-20 bg-gradient-to-br from-pink-100 via-white to-teal-50">
      {/* Left Section: Image */}
      <div className="relative flex-1">
        <div className="absolute top-0 left-0 w-5/6 h-5/6 bg-pink-200 rounded-full transform -translate-x-10 -translate-y-10 -z-10"></div>
        <div className="relative overflow-hidden rounded-xl shadow-2xl transform hover:scale-105 transition duration-300">
          <Image
            src="/images/image.png" // Replace with your chair image path
            alt="Chair"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Section: Content */}
      <div className="flex-1 px-10 space-y-6">
  <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
    Crafting <span className="text-teal-600">Comfort</span>, <br /> Defining <span className="text-teal-600">Elegance</span>
  </h1>
  <p className="text-xl text-gray-700">
    Discover timeless designs built to last. Enjoy exclusive discounts for our first 50 customers and redefine your home today.
  </p>
  <button className="px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all duration-300">
    Shop the Collection
  </button>
  <div className="space-y-2">
    <p className="mt-10 text-2xl font-bold text-gray-800">
      Built for a Lifetime of Comfort
    </p>
    <p className="text-gray-600 leading-relaxed">
      Transform your living spaces with furniture designed for beauty and durability. Every piece is crafted with care, combining style and functionality to make your house feel like home.
    </p>
  </div>
</div>
    </section>
  );
}
