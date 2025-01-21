import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Login = () => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/getAdmin');

            const data = await response.json();
            if (username==data.users[0].username&&password==data.users[0].password) {
                // Save token in cookies
                Cookies.set('authToken', data.users[0]._id, { expires: 1/24 }); // Expires in 1 hour
                router.push('/admin/dashboard'); // Redirect to the admin dashboard
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1, y: -10 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.3, stiffness: 50 }}
            className="flex flex-col justify-center items-center h-screen bg-white"
        >
            <div className="md:w-auto w-[90%] p-8 rounded-xl m-4 flex flex-col items-center shadow-lg border border-gray-400 opacity-90">
                <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
                    <h1 className="font-semibold text-3xl text-black m-2">Log In</h1>
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
                    <div className="">
                        <div className="m-1 text-lg text-black text-semibold">username</div>
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            className="border-b border-black focus:outline-none text-black placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="">
                        <div className="m-1 text-lg text-black text-semibold">Password</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-b border-black focus:outline-none text-black placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                </div>
                <div className="text-center mt-7">
                    <button
                        onClick={handleLogin}
                        className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-full text-white bg-black font-medium"
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="text-center my-6 flex flex-col">
                <Link href="/forgotPassword" className="text-sm font-medium text-gray-400 hover:text-violet-500 m-1">
                    Forgot Password?
                </Link>
                <Link href="/signup" className="text-sm font-bold text-gray-400 hover:text-violet-500 m-1">
                    Not a User? Create New Account
                </Link>
            </div>
        </motion.div>
    );
};

export default Login;
