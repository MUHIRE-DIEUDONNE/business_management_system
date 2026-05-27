// ==============================================
// Navbar.jsx (Fully Responsive Modern UI)
// ==============================================

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    FileBarChart2,
    LogOut,
    Menu,
    X
} from "lucide-react";

function Navbar() {

    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // ==========================================
    // ACTIVE LINK STYLE
    // ==========================================
    const activeLink = (path) => {
        return location.pathname === path
            ? "bg-blue-600 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-800 hover:text-white";
    };

    // close menu after click (mobile UX)
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800 shadow-2xl">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* ========================================== */}
                {/* LOGO */}
                {/* ========================================== */}
                <div className="flex items-center gap-4">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
                        <ShoppingCart className="text-white" size={28} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-wide">
                            BMS System
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Business Management Solution
                        </p>
                    </div>
                </div>

                {/* ========================================== */}
                {/* DESKTOP NAV */}
                {/* ========================================== */}
                <div className="hidden md:flex items-center gap-3">

                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${activeLink("/dashboard")}`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/customers"
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${activeLink("/customers")}`}
                    >
                        <Users size={18} />
                        Customers
                    </Link>

                    <Link
                        to="/products"
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${activeLink("/products")}`}
                    >
                        <Package size={18} />
                        Products
                    </Link>

                    <Link
                        to="/sales"
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${activeLink("/sales")}`}
                    >
                        <ShoppingCart size={18} />
                        Sales
                    </Link>

                    <Link
                        to="/reports"
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${activeLink("/reports")}`}
                    >
                        <FileBarChart2 size={18} />
                        Reports
                    </Link>

                    <Link
                        to="/logout"
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 shadow-lg"
                    >
                        <LogOut size={18} />
                        Logout
                    </Link>

                </div>

                {/* ========================================== */}
                {/* MOBILE MENU BUTTON */}
                {/* ========================================== */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* ========================================== */}
            {/* MOBILE MENU */}
            {/* ========================================== */}
            {isOpen && (
                <div className="md:hidden px-6 pb-4 space-y-2 bg-gray-950 border-t border-gray-800">

                    <Link
                        to="/dashboard"
                        onClick={handleLinkClick}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl ${activeLink("/dashboard")}`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/customers"
                        onClick={handleLinkClick}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl ${activeLink("/customers")}`}
                    >
                        <Users size={18} />
                        Customers
                    </Link>

                    <Link
                        to="/products"
                        onClick={handleLinkClick}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl ${activeLink("/products")}`}
                    >
                        <Package size={18} />
                        Products
                    </Link>

                    <Link
                        to="/sales"
                        onClick={handleLinkClick}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl ${activeLink("/sales")}`}
                    >
                        <ShoppingCart size={18} />
                        Sales
                    </Link>

                    <Link
                        to="/reports"
                        onClick={handleLinkClick}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl ${activeLink("/reports")}`}
                    >
                        <FileBarChart2 size={18} />
                        Reports
                    </Link>

                    <Link
                        to="/logout"
                        onClick={handleLinkClick}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-600 text-white"
                    >
                        <LogOut size={18} />
                        Logout
                    </Link>

                </div>
            )}
        </div>
    );
}

export default Navbar;