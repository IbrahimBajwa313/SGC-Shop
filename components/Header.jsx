import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import Wrapper from './Wrapper';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Link from 'next/link';
import { BiMenu } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import { IoMdHeart } from 'react-icons/io';
import { VscChromeClose } from 'react-icons/vsc';  
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { RxCross1 } from "react-icons/rx";
 

const Header =   (cart) => {

 

  const [Number, setNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setsearch] = useState('Search...');
  const [showsearch, setshowsearch] = useState(false);
  const [repetation, setrepetation] = useState(0);
 
   

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('cart')) {
      setNumber(Object.keys(JSON.parse(localStorage.getItem('cart'))).length);
    }
  }, [cart]);
  
 

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [suggestions, setSuggestions] = useState(undefined);

  const router = useRouter(); // Use the useRouter hook to get the router object


  const handleSearch = async (query) => {
    // logic to handle search 
    // console.log('Search query:', query);
 
      
      window.location.replace(`/category/${query}?query=${query}`);
      // setSearchQuery('')
  };
  const searchSuggestion = async (query) => {
    // logic to handle search 
    // console.log('Search query:', query);
    const response = await fetch('/api/getProducts');
    const result = await response.json();

    // Filter products based on the search query
    const filteredResults = result.products.filter((product) =>{
        console.log(query)
        if(query!='')
        {console.log('very tur')
          return product.title.toLowerCase().includes(query?.toLowerCase())}
      }
    );
    setSuggestions(filteredResults)
      
      // setSearchQuery('')
  };

    const [isClient, setIsClient] = useState(false)
   
    useEffect(() => {
      setIsClient(true)
    }, [])
   

  return (

    <div  className='bg-white w-screen '> 
{ (isClient&&showsearch)&&   <motion.div initial={{y:-30}} animate={{y:0}} transition={{duration:.3}} className=' pt-3 pb-3 justify-between right-3  items-center gap-4 text-black'>
            <form   onSubmit={(e) => 
{              e.preventDefault();
              handleSearch(searchQuery)
              
            }
              } className='flex justify-center   items-center'>
            
            <input
                type='text'
                placeholder={search}
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)
                searchSuggestion(e.target.value)       
                if(e.target.value==''){
                  console.log(true)
setSuggestions(undefined)
                }         
                }}
                className='border ml-2 sm:w-4/12 w-6/12 relative border-gray-600 rounded-lg p-1 outline-none'
              />
             {suggestions&&<div className='bg-white max-h-60 overflow-y-auto z-40 top-12 absolute rounded-lg text-black shadow-xl'>
              
              {suggestions?.map((keys)=>{
              
                return(
                  <>
               <div onClick={()=>{window.location.replace(`/product/${keys._id}`);}} className='px-3 cursor-pointer flex justify-between mb-2 hover:bg-gray-100 '>
                    <div>{keys.title}</div><img className='w-20' src={`/productIamages/${keys.img}/thumbnail.webp`} alt="" /> </div>
                  </>
                )
              })}</div>}
              <input type='submit'
                
                className='bg-black ml-1 sm:w-2/12 w-3/12  rounded-lg text-white  px-3 py-1'
              
              />

            <RxCross1 onClick={()=>{setshowsearch(false); setSearchQuery(''); setSuggestions(undefined)} }  className='ml-6  text-xl'/>
            </form>

          </motion.div>}

  {(isClient&&!showsearch)&&  
      <motion.wrapper initial={{y:-30}} animate={{y:0}} transition={{duration:.3}} className='flex pt-3 pb-1 items-center justify-between mx-6'>

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
            showSortMenu={showSortMenu}
          setShowSortMenu={setShowSortMenu}
            
          />
        )}
        
       
        


        {/* Mobile Menu Icon */}
        <div className='flex items-center gap-6 text-black'>
          {mobileMenu ? (
            <VscChromeClose
              className='me-8 relative text-[22px] left-12 lg:hidden md:text-[28px]'
              onClick={() => setMobileMenu(false)}
            />
          ) : (
           <div className='flex mr-10  lg:mr-0'>
            <BiMenu
              className={`${setsearch}?hidden relative left-12 text-[22px] lg:hidden md:text-[28px]`}
              onClick={() => setMobileMenu(true)}
            /><CiSearch  onClick={()=>{
              setshowsearch(true)
            }}  className='relative ml-5 left-12 text-[22px] lg:hidden md:text-[28px]'/></div>
          )}


          {/* Other items, placed at the right */}

          {/* Search Interface */}
          <div className=' border lg:flex hidden  items-center gap-4 text-black'>
            <form   onSubmit={(e) => 
{              e.preventDefault();
              handleSearch(searchQuery)
            }
              } className='flex items-center'>
            
            <input
                type='search'
                placeholder={search}
                // onClick={()=>{
                //   setsearch('')   
                // }}
                // onDragExit={()=>{ setsearch('Search..')  }}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                searchSuggestion(e.target.value)
                if(e.target.value==''){
                  console.log(true)
setSuggestions(undefined)
                }
                }}
                className=' px-2 relative border border-gray-600 rounded-lg p-1 outline-none'
              />
               {suggestions&&<div className='bg-white max-h-72 overflow-y-auto z-40 top-16 absolute  text-black shadow-xl'>{suggestions?.map((keys)=>{
              // 
                return(
                  <>
                  <div onClick={()=>{window.location.replace(`/product/${keys._id}`);}} className='px-3 cursor-pointer flex justify-between mb-2 '>
                    <div className='text-gray-500 hover:text-black'>{keys.title}</div><img className='w-20' src={`/productIamages/${keys.img}/thumbnail.webp`} alt="" /> </div>
                  </>
                )
              })}</div>}
              <input type='submit'
                
                className='bg-black  text-white rounded-lg px-3 ml-1 py-1 '
              
                placeholder='Search'
              />
            </form>
          </div>
      

          {/* Cart Icon */}
         {!mobileMenu&& <Link href="/cart">
            <div className='w-8 md:w-12 h-8 mr-2 md:h-12 rounded-full flex justify-center  items-center hover:bg-gray-200 hover:shadow-lg relative cursor-pointer'>
              <BsCart3 className='text-[15px] md:text-[20px]' />
              <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 flex justify-center items-center absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] px-[2px] md:px-[5px]'>{Number}</div>
            </div>
          </Link>
}
          {/* Heart Icon */}
         
        </div>
      </motion.wrapper>}
      
    </div>
  );
};

export default Header;

