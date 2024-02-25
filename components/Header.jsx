import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Link from 'next/link';
import { BiMenu } from 'react-icons/Bi';
import { BsCart3 } from 'react-icons/Bs';
import { IoMdHeart } from 'react-icons/Io';
import { VscChromeClose } from 'react-icons/Vsc'; 
import Image from 'next/image';
import { useRouter } from 'next/router';
 

const Header =   (cart) => {

 

  const [Number, setNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
 
   

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('cart')) {
      setNumber(Object.keys(JSON.parse(localStorage.getItem('cart'))).length);
    }
  }, [cart]);
  
 

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const router = useRouter(); // Use the useRouter hook to get the router object
  const { slug } = router.query;

  const handleSearch = async (query) => {
    // logic to handle search
    // console.log('Search query:', query);
 

      console.log(filteredResults);
      
      window.location.replace(`http://localhost:3000/category/${query}?query=${query}`);
      // setSearchQuery('')
  };

   

  return (
    <div className='bg-white'>
      <Wrapper className='flex pt-3 pb-2 items-center justify-between right-3'>

        {/* Logo of the Store */}
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={90}
            height={90}
            className='w-[80px] md:w-[90px] mr-2 mt-2 border border-transparent rounded-md hover:bg-gray-50 hover:shadow-lg px-4 py-2'
          />
        </Link>



        {/* Navbar Menu items, category sub-menu */}
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          showSortMenu={showSortMenu}
          setShowSortMenu={setShowSortMenu}
        />

        {mobileMenu && (
          <MenuMobile
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            showCatMenu={showCatMenu}
          />
        )}


        {/* Mobile Menu Icon */}
        <div className='flex items-center gap-6 text-black'>
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


          {/* Other items, placed at the right */}

          {/* Search Interface */}
          <div className='flex items-center gap-4 text-black'>
            <div className='flex items-center'>
              <input
                type='text'
                placeholder=' Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='border px-2 border-gray-300 rounded-l-xl p-1 outline-none'
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className='bg-black border-2-solid-black text-white rounded-r-xl px-3 py-1'
              >
                Search
              </button>
            </div>
          </div>

          {/* Cart Icon */}
          <Link href="/cart">
            <div className='w-8 md:w-12 h-8 mr-2 md:h-12 rounded-full flex justify-center left-16 items-center hover:bg-gray-200 hover:shadow-lg relative cursor-pointer'>
              <BsCart3 className='text-[15px] md:text-[20px]' />
              <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 flex justify-center items-center absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] px-[2px] md:px-[5px]'>{Number}</div>
            </div>
          </Link>

          {/* Heart Icon */}
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex left-10 justify-center items-center hover:shadow-lg hover:bg-gray-200 relative cursor-pointer'>
            <IoMdHeart className='text-[20px] md:text-[24px]' />
            <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 flex justify-center items-center absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] px-[2px] md:px-[5px]'>46</div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;

