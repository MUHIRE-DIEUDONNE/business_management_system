// ==============================================
// CreateAccount.jsx (Modern UI)
// ==============================================

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    UserPlus
} from "lucide-react";

function CreateAccount() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
            "http://localhost:5000/register",
            formData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        alert(res.data.message);

        navigate("/");

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Registration failed"
        );
    }
};

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800">

            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]"
            >

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-200 mt-2">
                        Register new account
                    </p>

                </div>

                <div className="relative mb-5">

                    <User className="absolute top-4 left-3 text-gray-300" size={20} />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 pl-12 p-4 rounded-xl"
                        required
                    />

                </div>

                <div className="relative mb-5">

                    <Mail className="absolute top-4 left-3 text-gray-300" size={20} />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 pl-12 p-4 rounded-xl"
                        required
                    />

                </div>

                <div className="relative mb-6">

                    <Lock className="absolute top-4 left-3 text-gray-300" size={20} />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 pl-12 p-4 rounded-xl"
                        required
                    />

                </div>

                <button
                    className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-semibold transition duration-300"
                >
                    <UserPlus size={20} />
                    Create Account
                </button>

                <p className="text-center text-gray-200 mt-6">

                    Already have account?

                    <Link
                        to="/"
                        className="text-yellow-300 ml-2 font-semibold"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default CreateAccount;