import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-wrap justify-between min-h-screen items-center px-10 py-20 bg-pink-50">
      <div className="max-w-lg">
        <h2 className="text-4xl font-bold text-red-500 mb-5">Furniture Store Market</h2>
        <p className="text-gray-600 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="space-x-5">
          <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
            Sign In
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300">
            Register
          </button>
        </div>
      </div>
      <div className="relative flex-grow max-w-xl flex justify-center items-center">
        {/* Furniture Images */}
        <div className="absolute w-40 h-40 top-10 left-10">
          <Image src="/images/sofa.avif" alt="Sofa" layout="responsive" width={1} height={1} />
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            $54
          </span>
        </div>
        <div className="absolute w-32 h-32 top-40 left-20">
          <Image src="/images/chair.avif" alt="Chair" layout="responsive" width={1} height={1} />
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            $22
          </span>
        </div>
        <div className="absolute w-20 h-20 top-40 right-20">
          <Image src="/images/chair.avif" alt="Table" layout="responsive" width={1} height={1} />
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            $12
          </span>
        </div>
        <div className="absolute w-16 h-16 top-5 right-10">
          <Image src="/images/chair.avif" alt="Clock" layout="responsive" width={1} height={1} />
        </div>
      </div>
    </section>
  );
}
