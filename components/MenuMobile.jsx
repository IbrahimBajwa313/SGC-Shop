import Link from 'next/link';
import React from 'react'
import { useState } from 'react';

// importing icons from React
import { BsChevronDown } from 'react-icons/Bs'



// Objects containing info 
const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
    { id: 5, name: "Login", url: "/login" },
];

const subMenuData = [
    { id: 1, name: "Jordan", doc_count: 11 },
    { id: 2, name: "Sneakers", doc_count: 8 },
    { id: 3, name: "running shoes", doc_count: 64 },
    { id: 4, name: "Football shoes", doc_count: 107 },
];

// Objects starts here ( Menu logic )
const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {



    return (
        <>
            <ul className=' flex flex-col z-40 md:hidden absolute top-[50px] font-medium left-0 w-full h-[calc(100vh-50px)] text-black bg-white border-t'>
                {
                    data.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                {item.subMenu ? (
                                    <li className='py-4 px-5 border-b  gap-2 flex flex-col relative'
                                        onClick={() => { setShowCatMenu(!showCatMenu) }}
                                    >
                                        <div className='flex  '>
                                            {item.name}
                                            <BsChevronDown size={18} className='mt-1 ml-2' />
                                        </div>

                                        {/* Menu in Category option */}
                                        {showCatMenu && (
                                            <ul className='bg-black/[0.05] -mx-5 mt-4 -mb-4 '>
                                                {subMenuData.map((subMenu) => {
                                                    return (
                                                        <Link
                                                            key={subMenu.id} href={"/"}
                                                            onClick={() => {
                                                                setShowCatMenu(false);
                                                                // setShowCatMenu(false);
                                                            }}>

                                                            <li className='py-4 px-8 border-t flex justify-between'>
                                                                {subMenu.name}
                                                                <span className='text-sm opacity-50'> {subMenu.doc_count}</span>
                                                            </li>
                                                        </Link>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                ) : (
                                    <li className="py-4 px-5 border-b">
                                        <Link
                                            href={item?.url}
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                )}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default MenuMobile