import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext'; // Adjust the path based on your project structure

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useUser(); // Access the login function from UserContext

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/getAdmin');
            const data = await response.json();

            if (username === data.users[0].username && password === data.users[0].password) {
                // Save token in cookies
                Cookies.set('authToken', data.users[0]._id, { expires: 1 / 24 }); // Expires in 1 hour
                
                // Store username in localStorage and update context
                login({ username });
                
                // Redirect to the admin dashboard
                router.push('/admin/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid Credentials. Please try again.');
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
                    <div>
                        <div className="m-1 text-lg text-black text-semibold">Username</div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-b border-black focus:outline-none text-black placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
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
        </motion.div>
    );
};

export default Login;
