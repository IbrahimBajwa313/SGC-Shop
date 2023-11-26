import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Link from 'next/link';
import { BiMenu } from 'react-icons/Bi';
import { BsCart3 } from 'react-icons/Bs';
import { IoMdHeart } from 'react-icons/Io';
import { VscChromeClose } from 'react-icons/Vsc';
 
const Header = (cart) => {
  const [Number, setNumber] = useState(0);
  useEffect(() => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('cart')) {
    setNumber(Object.keys(JSON.parse(localStorage.getItem('cart'))).length);
  }
  }, [cart])
  
  // console.log(cart)

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);

  return (
    <div className='bg-white'>
      <Wrapper className='flex pt-3 pb-2 items-center justify-between right-3'>
        {/* Logo of the Store */}
        <Link href={"/"}>
          <img src="/logo.png" className='w-[80px] md:w-[90px] mr-2 mt-2  border border-transparent rounded-md hover:bg-gray-50 hover:shadow-lg px-4 py-2' />
        </Link>

        
        {/* Navbar Menu items , catecory sub menu  */}
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
        />

        {mobileMenu && (
          <MenuMobile
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            showCatMenu={showCatMenu}
          />
        )}

        {/* Other items, placed at the right */}
        <div className='flex  items-center gap-6 text-black'>
          {/* Mobile Menu Icon */}
          {mobileMenu ? (
            <VscChromeClose
              className=' relative text-[22px] left-12 md:hidden md:text-[28px]'
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <BiMenu
              className='relative left-12 text-[22px] md:hidden md:text-[28px]'
              onClick={() => setMobileMenu(true)}
            />
          )}

         

          {/* Heart Icon */}
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex left-10 justify-center items-center hover:shadow-lg hover:bg-gray-200 relative cursor-pointer'>
            <IoMdHeart className='text-[20px] md:text-[24px]' />
            <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 flex justify-center items-center absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] px-[2px] md:px-[5px]'>46</div>
          </div>

          {/* Cart Icon */}
          <Link href="/cart">
            <div className='w-8 md:w-12 h-8 mr-2 md:h-12 rounded-full flex justify-center left-5 items-center hover:bg-gray-200 hover:shadow-lg relative cursor-pointer'>
              <BsCart3 className='text-[15px] md:text-[20px]' />
              <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 flex justify-center items-center absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] px-[2px] md:px-[5px]'>{Number}</div>
            </div>
          </Link>
        </div>
      </Wrapper>
    </div>
  );
}

export default Header;
