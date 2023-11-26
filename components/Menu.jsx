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
    { id: 3, name: "Running shoes", doc_count: 64 },
    { id: 4, name: "Football shoes", doc_count: 107 },
];

// Objects starts here ( Menu logic )
const Menu = ({ showCatMenu, setShowCatMenu }) => {



    return (
        <>
            <ul className='hidden md:flex items-center font-medium  text-black '>
                {
                    data.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                {!!item?.subMenu ? (
                                    <li className='cursor-pointer z-40 gap-2 flex text-center relative border border-transparent rounded-md hover:shaodw-lg px-4 py-2'
                                        onMouseEnter={() => {setShowCatMenu(true)}}
                                        onMouseLeave={() => {setShowCatMenu(false)}}
                                    >
                                        {item.name}
                                        <BsChevronDown size={18} className='mt-1 ' />

                                        {showCatMenu && (
                                            <ul className='bg-white z-40 top-10 absolute left-4 min-w-[250px] text-black shadow-xl'>
                                                {subMenuData.map((subMenu) => {
                                                    return (
                                                        <Link key={subMenu.id} href={`/category/${subMenu.name}`} onClick={()=>setShowCatMenu(false)}>

                                                            <li className='cursor-pointer flex justify-between items-center   px-3 hover:shadow-sm hover:bg-gray-100 rounded-md'>
                                                                {subMenu.name}
                                                            <span className='text-sm opacity-50 '> {subMenu.doc_count}</span>
                                                            </li>
                                                        </Link>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                ) : (
                                    <li className='cursor-pointer p9  border  border-transparent rounded-md hover:shadow-lg hover:bg-gray-200 px-4 py-2'>

                                        <Link href={item?.url}> {item.name} </Link>

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

export default Menu