// ==============================================
// NotFound.jsx
// ==============================================

import { Link } from "react-router-dom";

function NotFound() {

    return (
        <div className="h-screen flex flex-col justify-center items-center">

            <h1 className="text-6xl font-bold text-red-600">
                404
            </h1>

            <p className="text-2xl mt-4">
                Page Not Found
            </p>

            <Link
                to="/dashboard"
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
            >
                Go Back
            </Link>

        </div>
    );
}

export default NotFound;