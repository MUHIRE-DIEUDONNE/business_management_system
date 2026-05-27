// ==============================================
// Logout.jsx
// ==============================================

import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {

        logout();

    }, []);

    const logout = async () => {

        await axios.get(
            "http://localhost:5000/logout",
            {
                withCredentials: true
            }
        );

        navigate("/");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold">
                Logging out...
            </h1>
        </div>
    );
}

export default Logout;