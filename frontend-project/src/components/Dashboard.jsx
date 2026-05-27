import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

function Dashboard() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const res = await axios.get("http://localhost:5000/reports/sales");
            setSales(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ==============================
    // DERIVED DATA (NO REPORT API)
    // ==============================

    const totalCustomers = new Set(sales.map(s => s.customerid)).size;
    const totalProducts = new Set(sales.map(s => s.productid)).size;
    const totalSales = sales.length;

    const totalRevenue = sales.reduce((sum, s) => sum + Number(s.totalamount || 0), 0);

    const paidSales = sales.filter(s => s.paymentstatus === "Paid").length;
    const pendingSales = sales.filter(s => s.paymentstatus === "Pending").length;
    const unpaidSales = sales.filter(s => s.paymentstatus === "Unpaid").length;

    // ==============================
    // CHART DATA
    // ==============================

    const statusData = [
        { name: "Paid", value: paidSales },
        { name: "Pending", value: pendingSales },
        { name: "Unpaid", value: unpaidSales },
    ];

    const COLORS = ["#22c55e", "#facc15", "#ef4444"];

    const barData = [
        { name: "Customers", value: totalCustomers },
        { name: "Products", value: totalProducts },
        { name: "Sales", value: totalSales },
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                {/* HEADER */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Real-time analytics powered by sales data
                    </p>
                </div>

                {/* KPI CARDS */}
                <div className="grid grid-cols-4 gap-6 mb-10">

                    <KpiCard title="Customers" value={totalCustomers} icon={<Users />} color="blue" />
                    <KpiCard title="Products" value={totalProducts} icon={<Package />} color="green" />
                    <KpiCard title="Sales" value={totalSales} icon={<ShoppingCart />} color="purple" />
                    <KpiCard title="Revenue" value={`$${totalRevenue}`} icon={<DollarSign />} color="red" />

                </div>

                {/* VISUALIZATION */}
                <div className="grid grid-cols-2 gap-6 mb-10">

                    {/* PIE CHART */}
                    <div className="bg-white p-6 rounded-3xl shadow">
                        <h2 className="text-xl font-bold mb-4">Payment Status</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    label
                                >
                                    {statusData.map((_, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* BAR CHART */}
                    <div className="bg-white p-6 rounded-3xl shadow">
                        <h2 className="text-xl font-bold mb-4">System Overview</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* RECENT SALES TABLE */}
                <div className="bg-white rounded-3xl shadow overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Recent Sales</h2>
                    </div>

                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left">Customer</th>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">Amount</th>
                                <th className="p-4 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sales.slice(0, 5).map((sale) => (
                                <tr key={sale.saleid} className="border-b">
                                    <td className="p-4">
                                        {sale.firstname} {sale.lastname}
                                    </td>
                                    <td className="p-4">{sale.productname}</td>
                                    <td className="p-4 font-semibold text-green-600">
                                        ${sale.totalamount}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm
                                            ${sale.paymentstatus === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : sale.paymentstatus === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                            {sale.paymentstatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

// ==============================
// SMALL KPI COMPONENT
// ==============================
function KpiCard({ title, value, icon, color }) {
    const colors = {
        blue: "from-blue-600 to-blue-400",
        green: "from-green-600 to-green-400",
        purple: "from-purple-600 to-purple-400",
        red: "from-red-600 to-red-400",
    };

    return (
        <div className={`p-6 rounded-3xl text-white shadow bg-gradient-to-r ${colors[color]}`}>
            <div className="flex justify-between items-center">
                <div>
                    <p className="opacity-90">{title}</p>
                    <h1 className="text-3xl font-bold mt-2">{value}</h1>
                </div>
                <div className="opacity-40 scale-125">{icon}</div>
            </div>
        </div>
    );
}

export default Dashboard;