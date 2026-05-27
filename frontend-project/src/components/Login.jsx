import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
    User,
    Lock,
    LogIn
} from "lucide-react";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/login",
                formData,
                {
                    withCredentials: true
                }
            );

            alert(res.data.message);

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">

            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]"
            >

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-gray-200 mt-2">
                        Login with your account
                    </p>

                </div>

                <div className="relative mb-5">

                    <User
                        className="absolute top-4 left-3 text-gray-300"
                        size={20}
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 pl-12 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                </div>

                <div className="relative mb-6">

                    <Lock
                        className="absolute top-4 left-3 text-gray-300"
                        size={20}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 pl-12 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                </div>

                <button
                    className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition duration-300 font-semibold"
                >
                    <LogIn size={20} />
                    Login
                </button>

                <p className="text-center text-gray-200 mt-6">

                    Don't have account?

                    <Link
                        to="/create-account"
                        className="text-yellow-300 ml-2 font-semibold"
                    >
                        Create Account
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;