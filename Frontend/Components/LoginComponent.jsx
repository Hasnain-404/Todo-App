import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            navigate('/todo');
        }
    }, [navigate]);

    const heandleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please fill all the fields");
            return;
        }

        const userInfo = { email, password };

        try {
            const res = await axios.post('/auth/login', userInfo);

            if (res.data.success) {
                localStorage.setItem("username", res.data.username); 
                setMessage(res.data.message);
                navigate("/todo"); 
            } else {
                setMessage(res.data.message);
            }
        } catch (error) {
            console.error("Error during login: ", error.message);
            setMessage("Login failed. Please try again.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-80">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={heandleSubmit}>
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md p-2">
                        <FaEnvelope className="text-gray-500 mr-3 text-[20px]" />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-2 text-gray-700 outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6 flex items-center border border-gray-300 rounded-md p-2">
                        <FaLock className="text-gray-500 mr-3" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-2 text-gray-700 outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className=' text-xl ml-8 py-2.5'>{message}</div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
