import Image from 'next/image'
import { MyContext } from '@/pages/_app'
import React from 'react'

const order = () => {
    // Using Context API to use app functions in this file
    const { cart, addToCart, oneMinusQty, clearCart, subTotal } = MyContext()

    return (

        Object.keys(cart).map((k) => {
            return (

                <div key={k}>
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">Nike</h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{cart[k].name}</h1>
                                    <div className="flex mb-4">
                                        <a className="flex-grow text-gray-500 border-b-2 border-black py-2 text-lg px-1">Item Description</a>
                                        <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                                        <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Total</a>
                                    </div>
                                    <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Color</span>
                                        <span className="ml-auto text-gray-900">{cart[k].variant}</span>
                                    </div>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Size</span>
                                        <span className="ml-auto text-gray-900">{cart[k].size}</span>
                                    </div>
                                    <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                        <span className="text-gray-500">Quantity</span>
                                        <span className="ml-auto text-gray-900">{cart[k].qty}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="title-font font-medium text-2xl text-gray-900">{cart[k].price} Rs /.</span>
                                        <button className="flex ml-auto text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-black rounded">Pay Now</button>
                                        
                                        <button className="rounded-full w-10 h-10 bg-gray-400 p-0 border-0 inline-flex items-center justify-center text-white  hover:bg-black ml-4">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Image height={"500"} width={"500"} alt="ecommerce" className="lg:-1/2  ml-4    object-cover object-center rounded" src="/product-1.webp" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>)
        })
    )
}

export default order