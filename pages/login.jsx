import Link from 'next/link'
import React from 'react'

const Login = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className=" md:w-auto w-[90%] p-8 rounded-xl  m-4 flex flex-col items-center shadow-lg border border-gray-400 opacity-90 ">
            <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 ">
                <h1 className="font-semibold text-3xl text-black m-2">Log In</h1>
            </div>
            <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
                <div className="">
                    <div className="m-1 text-lg text-black text-semibold">Username</div>
                    <input type="text" 
                        className="border-b border-black focus:outline-none  text-black placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"/>
                </div>
                <div className="">
                    <div className="m-1 text-lg text-black text-semibold">Password</div>
                    <input type="password"
                        className="border-b border-black focus:outline-none  text-black placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"/>
                </div>
               
            </div>
            <div className="text-center mt-7">
                <button
                    className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-full text-white bg-black  font-medium ">login</button>
            </div>
        </div>
        <div className="text-center my-6 flex flex-col">
            <Link href="/forgotPassword" className="text-sm font-medium text-gray-400 hover:text-violet-500 m-1">Forgot
                Password ?</Link>
            <Link href="/signup" className="text-sm font-bold text-gray-400 hover:text-violet-500 m-1">
                Not a User? Create New Account</Link>
        </div>
    
    </div> 
    )
}

export default Login