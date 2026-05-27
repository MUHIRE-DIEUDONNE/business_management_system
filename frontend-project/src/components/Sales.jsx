// ==============================================
// Sales.jsx (CRUD + Update + Delete)
// ==============================================

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Sales() {

    const [sales, setSales] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        customerid: "",
        productcode: "",
        quantitysold: "",
        unitprice: "",
        saledate: "",
        paymentstatus: ""
    });

    useEffect(() => {
        fetchSales();
        fetchCustomers();
        fetchProducts();
    }, []);

    // =========================
    // FETCH DATA
    // =========================
    const fetchSales = async () => {
        const res = await axios.get("http://localhost:5000/sales");
        setSales(res.data);
    };

    const fetchCustomers = async () => {
        const res = await axios.get("http://localhost:5000/customers");
        setCustomers(res.data);
    };

    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
    };

    // =========================
    // FORM CHANGE
    // =========================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;

        const selectedProduct = products.find(
            (p) => p.productcode == productId
        );

        setFormData({
            ...formData,
            productcode: productId,
            unitprice: selectedProduct ? selectedProduct.price : ""
        });
    };

    // =========================
    // CREATE / UPDATE
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {

            // UPDATE
            await axios.put(
                `http://localhost:5000/sales/${editingId}`,
                formData
            );

            alert("Sale updated");

        } else {

            // CREATE
            await axios.post(
                "http://localhost:5000/sales",
                formData
            );

            alert("Sale added");
        }

        fetchSales();
        resetForm();
    };

    // =========================
    // EDIT
    // =========================
    const handleEdit = (sale) => {
        setEditingId(sale.saleid);

        setFormData({
            customerid: sale.customerid,
            productcode: sale.productcode,
            quantitysold: sale.quantitysold,
            unitprice: sale.unitprice,
            saledate: sale.saledate,
            paymentstatus: sale.paymentstatus
        });
    };

    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this sale?")) return;

        await axios.delete(`http://localhost:5000/sales/${id}`);

        alert("Sale deleted");

        fetchSales();
    };

    // =========================
    // RESET FORM
    // =========================
    const resetForm = () => {
        setEditingId(null);
        setFormData({
            customerid: "",
            productcode: "",
            quantitysold: "",
            unitprice: "",
            saledate: "",
            paymentstatus: ""
        });
    };

    return (
        <>
            <Navbar />

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Sales Management
                </h1>

                {/* ================= FORM ================= */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-3 gap-4 bg-white p-6 rounded shadow"
                >

                    {/* CUSTOMER */}
                    <select
                        name="customerid"
                        value={formData.customerid}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Customer</option>

                        {customers.map((c) => (
                            <option key={c.customerid} value={c.customerid}>
                                {c.firstname} {c.lastname}
                            </option>
                        ))}
                    </select>

                    {/* PRODUCT */}
                    <select
                        name="productcode"
                        value={formData.productcode}
                        onChange={handleProductChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Product</option>

                        {products.map((p) => (
                            <option key={p.productcode} value={p.productcode}>
                                {p.productname}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="quantitysold"
                        placeholder="Quantity Sold"
                        value={formData.quantitysold}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="number"
                        name="unitprice"
                        value={formData.unitprice}
                        readOnly
                        className="border p-2 rounded bg-gray-100"
                    />

                    <input
                        type="date"
                        name="saledate"
                        value={formData.saledate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <select
                        name="paymentstatus"
                        value={formData.paymentstatus}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Payment Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>

                    {/* BUTTONS */}
                    <div className="flex gap-2">

                        <button className="bg-purple-600 text-white p-2 rounded w-full">
                            {editingId ? "Update Sale" : "Add Sale"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-500 text-white p-2 rounded w-full"
                            >
                                Cancel
                            </button>
                        )}

                    </div>
                </form>

                {/* ================= TABLE ================= */}
                <table className="w-full mt-8 border">

                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Product</th>
                            <th className="border p-2">Qty</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Total</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.saleid}>

                                <td className="border p-2">{sale.saleid}</td>

                                <td className="border p-2">
                                    {sale.firstname} {sale.lastname}
                                </td>

                                <td className="border p-2">
                                    {sale.productname}
                                </td>

                                <td className="border p-2">
                                    {sale.quantitysold}
                                </td>

                                <td className="border p-2">
                                    {sale.unitprice}
                                </td>

                                <td className="border p-2">
                                    {sale.totalamount}
                                </td>

                                <td className="border p-2">
                                    {sale.saledate}
                                </td>

                                <td className="border p-2">
                                    {sale.paymentstatus}
                                </td>

                                {/* ACTIONS */}
                                <td className="border p-2 flex gap-2">

                                    <button
                                        onClick={() => handleEdit(sale)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(sale.saleid)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Sales;