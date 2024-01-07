import CartItem from '@/components/CartItem'
import Wrapper from '@/components/Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { MyContext } from './_app'
import { motion } from 'framer-motion'

const Cart = () => {

    // Using Context API to use app functions in this file
    const { cart, addToCart, oneMinusQty, clearCart, subTotal } = MyContext()


    return (
        <motion.div  initial={{ opacity: 0 ,scale:1,y:-20   }}  animate={{y:0,  opacity: 1, scale: 1}} transition={{ delay: 0,duration:.3,stiffness:50 }} className='md:my-20 w-full min-h-screen '>
            <Wrapper>

                {/* Shoong Cart Heading */}
                <div className='text-center mt-8 md:mt-0 max-w-[800px] mx-auto'>
                    <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                        Shoping Cart
                    </div>
                </div>


                {/* Cart Content */}

                {Object.keys(cart).length !== 0 && <div className='flex flex-col lg:flex-row gap-12 py10'>
                    {/* Cart Item Start */}
                    <div className='flex-[2] '>
                        <div className='text-lg font-bold '>Cart Items</div>

                        <CartItem />
                    </div>
                    {/* Cart Item end */}

                    {/* Summary Item Start */}
                    <div className='flex-[1]'>
                        <div className='text-lg font-bold'>Summary</div>
                        <div className='p-5 my-5 bg-black/[0.05] rounded-xl '>
                            <div className='flex justify-between'>

                                <div className='uppercase text-md md:text-lg font-medium text-black'>
                                    Subtotal
                                </div>

                                <div className='uppercase text-md md:text-lg font-medium text-black'>
                                    {localStorage.getItem("SubTotal")}/. $
                                </div>

                            </div>

                            <div className='text-sm md:text-md  border-t mt-5 py-5 '>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis est fugit dicta dolore porro incidunt .
                            </div>
                        </div>

                        <Link href={"./checkout"}>
                            <button className='w-full  text-lg bg-black text-white border  rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 '>Checkout</button>
                        </Link>


                        {/* Clear Chart Button Start */}
                        <button onClick={clearCart} className='w-full  text-lg border border-black rounded-full py-4 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mt-4'>
                            Clear Cart
                        </button>
                        {/* Clear Chart Button End */}

                    </div>
                    {/* Summary Item end */}

                </div>}
                {/* Cart Content End*/}



                {/*When Cart is empty  */}
                {Object.keys(cart).length === 0 && <div className='flex flex-[2] flex-col items-center  pb-[50px] md:mt-12' >
                    <Image
                        priority={false}
                        src="/empty-cart.jpg"
                        height={300}
                        alt="Empty Cart Image"
                        width={300}
                        className='w-[300px] md:w-[400px]'
                    ></Image>

                    <span className='font-bold text-xl'>Your Cart is empty</span>
                    <span className='text-center mt-4'>
                        Looks Like have'nt added anything in your cart
                        <br /> Go ahead and explore more Categories
                    </span>

                    {/* Add To Continue Shoping Start */}
                    <Link href="/">
                        <button className='w-60  text-lg bg-black text-white border  rounded-full py-3 mt-8 font-md transition-transform active:scale-95 flex items-center justify-center hover:opacity-75 mb-3'>Continue Shoping</button>
                    </Link>
                    {/* Add To Continue Shoping */}
                </div>}

            </Wrapper>
        </motion.div>
    )
}

export default Cart
