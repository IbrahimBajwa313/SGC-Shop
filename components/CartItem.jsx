import { MyContext } from '@/pages/_app'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";


const CartItem = () => {

  // Using Context API to use app functions in this file
  const { cart, addToCart, delQty, clearCart, subTotal, oneMinusQty , oneAddQty } = MyContext()
  
  return (
     
      Object.keys(cart).map((k) => {
        return(
        <div key={k} className='flex py-5 gap-3 md:gap-5  border-b'>


          {/* Product Image Start */}
          <div className='shrink-0 aspect-square w-[50px] md:w-[120px]'>
            <img src={cart[k].img} alt="Boot Image" />
          </div>
          {/* Image End */}

         
          {/* Product Description */}
          <div className='flex flex-col w-full'>
            <div className='flex flex-col md:flex-row justify-between'>

              {/* Product Title Start */}
              <div className='text-sm md:text-2xl font-semibold text-black/[0.8]'>
                 {cart[k].name}
              </div>
              {/* Product Title End */}


              {/* Product Price Start */}
              <div className='text-sm md:text-md font-bold text-black/[0.5] mt-2 '>
                Price : {cart[k].price}/. $
              </div>
              {/* Product Price End */}

            </div>
            {/* Product Subtitle Start */}
            <div className='text-sm md:text-md font-medium block text-black/[0.5] '>
              Men&apos;s Golf Shoes
              {/* {cart[k].subTitle} */}
            </div>
            {/* Product Subtitle End */}


            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center gap-2 md:gap-10 text-sm md:text-md text-black/[0.5]'>
                <div className='flex items-center gap-1'>

                  <div className='font-semibold me-2 '>Size <span className='font-extrabold text-gray-600'>{cart[k].size}</span></div>
                 
                  <FaCircleMinus onClick={()=>{
                    oneMinusQty(k)
                  }}  className='text-md ' />

                  <div className='font-extrabold text-gray-600 mx-1 '>{cart[k].qty}</div>
                  
                  <FaCirclePlus onClick={()=>{
                    oneAddQty(k)
                  }}  className='text-md' />
                </div>
                
                <RiDeleteBin6Line onClick={()=>{
                  delQty(k)
                }}  className='cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]'></RiDeleteBin6Line> 
              </div>
            </div>


          </div>


        </div>) })
    
  )
}

export default CartItem