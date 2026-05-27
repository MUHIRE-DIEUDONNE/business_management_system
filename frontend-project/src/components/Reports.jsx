// ==============================================
// Reports.jsx
// ==============================================

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    CalendarDays,
    BadgeCheck,
    Clock3,
    AlertCircle,
    Search,
    FileSpreadsheet,
    FileText,
    RotateCcw
} from "lucide-react";

function Reports() {

    // ==========================================
    // STATES
    // ==========================================

    const [summary, setSummary] = useState({});
    const [sales, setSales] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);

    // SEARCHES
    const [searchCustomer, setSearchCustomer] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchDate, setSearchDate] = useState("");

    // ==========================================
    // FETCH DATA
    // ==========================================

    useEffect(() => {

        fetchSummary();
        fetchSales();
        fetchMonthlySales();

    }, []);

    // ==========================================
    // SUMMARY REPORT
    // ==========================================

    const fetchSummary = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/reports/summary"
            );

            setSummary(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    // ==========================================
    // SALES REPORT
    // ==========================================

    const fetchSales = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/reports/sales"
            );

            setSales(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    // ==========================================
    // MONTHLY SALES
    // ==========================================

    const fetchMonthlySales = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/reports/monthly-sales"
            );

            setMonthlySales(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    // ==========================================
    // FILTER SALES
    // ==========================================

    const filteredSales = sales.filter((sale) => {

        return (

            `${sale.firstname} ${sale.lastname}`
                .toLowerCase()
                .includes(searchCustomer.toLowerCase())

            &&

            sale.productname
                ?.toLowerCase()
                .includes(searchProduct.toLowerCase())

            &&

            sale.paymentstatus
                ?.toLowerCase()
                .includes(searchStatus.toLowerCase())

            &&

            sale.saledate
                ?.toLowerCase()
                .includes(searchDate.toLowerCase())

        );
    });

    // ==========================================
    // CALCULATIONS
    // ==========================================

    const paidSales = sales.filter(
        (sale) => sale.paymentstatus === "Paid"
    ).length;

    const pendingSales = sales.filter(
        (sale) => sale.paymentstatus === "Pending"
    ).length;

    const unpaidSales = sales.filter(
        (sale) => sale.paymentstatus === "Unpaid"
    ).length;

    // ==========================================
    // RESET FILTERS
    // ==========================================

    const resetFilters = () => {

        setSearchCustomer("");
        setSearchProduct("");
        setSearchStatus("");
        setSearchDate("");
    };

    // ==========================================
    // DOWNLOAD PDF
    // ==========================================

    const downloadPDF = () => {

        const doc = new jsPDF();

        doc.text("Business Sales Report", 14, 15);

        autoTable(doc, {

            startY: 25,

            head: [[
                "Sale ID",
                "Customer",
                "Product",
                "Quantity",
                "Amount",
                "Date",
                "Status"
            ]],

            body: filteredSales.map((sale) => ([

                sale.saleid,
                `${sale.firstname} ${sale.lastname}`,
                sale.productname,
                sale.quantitysold,
                sale.totalamount,
                sale.saledate,
                sale.paymentstatus

            ]))
        });

        doc.save("sales-report.pdf");
    };

    // ==========================================
    // DOWNLOAD EXCEL
    // ==========================================

    const downloadExcel = () => {

        const excelData = filteredSales.map((sale) => ({

            "Sale ID": sale.saleid,
            "Customer": `${sale.firstname} ${sale.lastname}`,
            "Product": sale.productname,
            "Quantity": sale.quantitysold,
            "Amount": sale.totalamount,
            "Date": sale.saledate,
            "Status": sale.paymentstatus

        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Sales Report"
        );

        const excelBuffer = XLSX.write(
            workbook,
            {
                bookType: "xlsx",
                type: "array"
            }
        );

        const fileData = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
            }
        );

        saveAs(fileData, "sales-report.xlsx");
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Reports & Analytics
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Monitor business activities and performance
                        </p>

                    </div>

                    <div className="bg-white px-6 py-4 rounded-2xl shadow border border-gray-200">

                        <div className="flex items-center gap-3">

                            <CalendarDays className="text-blue-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Current Date
                                </p>

                                <h1 className="font-bold text-gray-800">
                                    {new Date().toLocaleDateString()}
                                </h1>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SUMMARY */}
                {/* ========================================== */}

                <div className="grid grid-cols-4 gap-6 mb-10">

                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-3xl shadow-xl">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-lg">
                                    Customers
                                </p>

                                <h1 className="text-5xl font-bold mt-4">
                                    {summary.totalCustomers || 0}
                                </h1>

                            </div>

                            <Users size={60} className="opacity-30" />

                        </div>

                    </div>

                    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-3xl shadow-xl">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-lg">
                                    Products
                                </p>

                                <h1 className="text-5xl font-bold mt-4">
                                    {summary.totalProducts || 0}
                                </h1>

                            </div>

                            <Package size={60} className="opacity-30" />

                        </div>

                    </div>

                    <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-3xl shadow-xl">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-lg">
                                    Sales
                                </p>

                                <h1 className="text-5xl font-bold mt-4">
                                    {summary.totalSales || 0}
                                </h1>

                            </div>

                            <ShoppingCart size={60} className="opacity-30" />

                        </div>

                    </div>

                    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-6 rounded-3xl shadow-xl">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-lg">
                                    Revenue
                                </p>

                                <h1 className="text-4xl font-bold mt-4">
                                    {summary.totalRevenue || 0}
                                </h1>

                            </div>

                            <DollarSign size={60} className="opacity-30" />

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* PAYMENT STATUS */}
                {/* ========================================== */}

                <div className="grid grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-3xl p-6 shadow-lg">

                        <div className="flex items-center gap-4">

                            <div className="bg-green-100 p-4 rounded-2xl">

                                <BadgeCheck className="text-green-600" />

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Paid Sales
                                </p>

                                <h1 className="text-4xl font-bold">
                                    {paidSales}
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg">

                        <div className="flex items-center gap-4">

                            <div className="bg-yellow-100 p-4 rounded-2xl">

                                <Clock3 className="text-yellow-600" />

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Pending Sales
                                </p>

                                <h1 className="text-4xl font-bold">
                                    {pendingSales}
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg">

                        <div className="flex items-center gap-4">

                            <div className="bg-red-100 p-4 rounded-2xl">

                                <AlertCircle className="text-red-600" />

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Unpaid Sales
                                </p>

                                <h1 className="text-4xl font-bold">
                                    {unpaidSales}
                                </h1>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SALES TABLE */}
                {/* ========================================== */}

                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                    {/* HEADER */}
                    <div className="p-6 border-b border-gray-200">

                        <div className="flex justify-between items-center mb-6">

                            <div>

                                <h1 className="text-2xl font-bold text-gray-800">
                                    Sales Transactions
                                </h1>

                                <p className="text-gray-500">
                                    Search and download reports
                                </p>

                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={downloadPDF}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition"
                                >

                                    <FileText size={18} />

                                    PDF

                                </button>

                                <button
                                    onClick={downloadExcel}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl transition"
                                >

                                    <FileSpreadsheet size={18} />

                                    Excel

                                </button>

                            </div>

                        </div>

                        {/* SEARCHES */}

                        <div className="grid grid-cols-5 gap-4">

                            {/* CUSTOMER */}
                            <div className="relative">

                                <Search
                                    className="absolute left-4 top-3.5 text-gray-400"
                                    size={18}
                                />

                                <input
                                    type="text"
                                    placeholder="Customer"
                                    value={searchCustomer}
                                    onChange={(e) =>
                                        setSearchCustomer(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* PRODUCT */}
                            <div className="relative">

                                <Search
                                    className="absolute left-4 top-3.5 text-gray-400"
                                    size={18}
                                />

                                <input
                                    type="text"
                                    placeholder="Product"
                                    value={searchProduct}
                                    onChange={(e) =>
                                        setSearchProduct(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* STATUS */}
                            <select
                                value={searchStatus}
                                onChange={(e) =>
                                    setSearchStatus(e.target.value)
                                }
                                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="">
                                    All Status
                                </option>

                                <option value="Paid">
                                    Paid
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Unpaid">
                                    Unpaid
                                </option>

                            </select>

                            {/* DATE */}
                            <input
                                type="date"
                                value={searchDate}
                                onChange={(e) =>
                                    setSearchDate(e.target.value)
                                }
                                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* RESET */}
                            <button
                                onClick={resetFilters}
                                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white rounded-2xl px-4 py-3 transition"
                            >

                                <RotateCcw size={18} />

                                Reset

                            </button>

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="p-4 text-left">
                                        Sale ID
                                    </th>

                                    <th className="p-4 text-left">
                                        Customer
                                    </th>

                                    <th className="p-4 text-left">
                                        Product
                                    </th>

                                    <th className="p-4 text-left">
                                        Quantity
                                    </th>

                                    <th className="p-4 text-left">
                                        Amount
                                    </th>

                                    <th className="p-4 text-left">
                                        Date
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    filteredSales.map((sale) => (

                                        <tr
                                            key={sale.saleid}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >

                                            <td className="p-4 font-semibold">
                                                #{sale.saleid}
                                            </td>

                                            <td className="p-4">
                                                {sale.firstname} {sale.lastname}
                                            </td>

                                            <td className="p-4">
                                                {sale.productname}
                                            </td>

                                            <td className="p-4">
                                                {sale.quantitysold}
                                            </td>

                                            <td className="p-4 text-green-600 font-semibold">
                                                {sale.totalamount}
                                            </td>

                                            <td className="p-4">
                                                {sale.saledate}
                                            </td>

                                            <td className="p-4">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold
                                                    ${
                                                        sale.paymentstatus === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : sale.paymentstatus === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {sale.paymentstatus}
                                                </span>

                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Reports;