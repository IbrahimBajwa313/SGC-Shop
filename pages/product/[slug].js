import ProductDetailCarousel from '../../components/ProductDeatailCrousel';
import RelatedProducts from '../../components/RelatedProducts';
import Wrapper from '../../components/Wrapper';
import React, { useState, useEffect } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { MyContext } from '../../pages/_app';
import { useRouter } from 'next/router';
import AddToCartNotification from '../../components/AddToCartNotification';
import { motion } from 'framer-motion';

export default function ProductDetails() {
    const [Items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getProducts');
                const result = await response.json();

                if (result && Array.isArray(result.products)) {
                    setItems(result.products);
                } else {
                    console.error('Invalid data structure received:', result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [isCartVisible, setIsCartVisible] = useState(false);
    const [sizeSelect, setSizeSelect] = useState(undefined);

    const router = useRouter();
    const { slug } = router.query;

    const { addToCart } = MyContext();

    const [pin, setPin] = useState(undefined);
    const [service, setService] = useState();

    const checkServiceAvailability = async () => {
        let pins = await fetch('/api/pincode');
        let pinJson = await pins.json();
        if (pinJson.includes(+pin)) {
            setService(true);
        } else {
            setService(false);
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
            {Items.map((key, i) => (
                key?._id === slug && (
                    <div key={key._id}>
                        <Wrapper>
                            <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                                {/* Left column */}
                                <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                                    <ProductDetailCarousel imgThumbnail={key.imgThumbnail} imgages={key.imgages} />
                                </div>

                                {/* Right column */}
                                <div className="flex-[1] py-3">
                                    <div className="font-bold text-[31px] mb-2">
                                        {key.title}
                                    </div>

                                    <div className="text-lg font-semibold mb-5">
                                        {key.category}
                                    </div>

                                    <div className="text-lg font-semibold">
                                        Price : {key.price} $
                                    </div>
                                    <div className="text-sm text-black/[0.5]">
                                        Incl. of Taxes
                                    </div>
                                    <div className="text-sm text-black/[0.5] mb-20">
                                        (Also includes all applicable duties)
                                    </div>

                                    {key.size[0] !== "" && (
                                        <>
                                            <div className="flex justify-between mb-2">
                                                <div className="text-md font-semibold">
                                                    Select Size
                                                </div>

                                                <div className="text-sm font-medium cursor-pointer text-black/[0.5]">
                                                    Select Guide
                                                </div>
                                            </div>

                                            <div className="grid mb-6 grid-cols-3 gap-2">
                                                {key.size.map((size, index) => (
                                                    <div
                                                        key={index} // If `size` is unique, replace `index` with `size`
                                                        onClick={() => setSizeSelect(size)}
                                                        className={`border text-center rounded-md hover:border-black py-3 cursor-pointer font-medium ${sizeSelect === size ? 'bg-gray-300' : 'bg-white'}`}
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>

                                            {!sizeSelect && (
                                                <div className="text-red-500 text-lg font-semibold mb-3">
                                                    Size Selection is required
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {!service && service != null && (
                                        <div className="text-red-600 mb-3">
                                            We can't deliver to this Postal Code
                                        </div>
                                    )}

                                    {service && service != null && (
                                        <div className="text-green-600 mb-3">
                                            Delivery Services are available at this pin code
                                        </div>
                                    )}

                                    {true && (
                                        <button
                                            onClick={() => {
                                                addToCart(slug, key.title, key.availableQty, key.price, sizeSelect, key.color, key.imgThumbnail, key.category);
                                                setIsCartVisible(true);
                                                setTimeout(() => {
                                                    setIsCartVisible(false);
                                                }, 3000);
                                            }}
                                            className="w-full text-lg bg-black text-white border rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mb-3"
                                        >
                                            Add To Cart
                                        </button>
                                    )}

                                    <AddToCartNotification isVisible={isCartVisible} />

                                    <button className="w-full text-lg border border-black rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mb-10">
                                        Wishlist
                                        <IoMdHeartEmpty size={20} />
                                    </button>

                                    <div>
                                        <div className="text-lg font-bold mb-5">
                                            Product Details
                                        </div>
                                        <div className="text-md mb-5"></div>
                                    </div>
                                </div>
                            </div>

                            <RelatedProducts />
                        </Wrapper>
                    </div>
                )
            ))}
        </motion.div>
    );
}
