// ==============================================
// Customers.jsx
// ==============================================

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        telephone: "",
        address: "",
        registrationdate: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {

        const res = await axios.get(
            "http://localhost:5000/customers"
        );

        setCustomers(res.data);
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (editingId) {

            await axios.put(
                `http://localhost:5000/customers/${editingId}`,
                formData
            );

            alert("Customer updated");

        } else {

            await axios.post(
                "http://localhost:5000/customers",
                formData
            );

            alert("Customer added");
        }

        setFormData({
            firstname: "",
            lastname: "",
            gender: "",
            telephone: "",
            address: "",
            registrationdate: ""
        });

        setEditingId(null);

        fetchCustomers();
    };

    const handleEdit = (customer) => {

        setFormData(customer);

        setEditingId(customer.customerid);
    };

    const handleDelete = async (id) => {

        if (window.confirm("Delete customer?")) {

            await axios.delete(
                `http://localhost:5000/customers/${id}`
            );

            fetchCustomers();
        }
    };

    return (
        <>
            <Navbar />

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Customers Management
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-3 gap-4 bg-white p-6 rounded shadow"
                >

                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <input
                        type="text"
                        name="telephone"
                        placeholder="Telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        name="registrationdate"
                        value={formData.registrationdate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <button
                        className="bg-blue-600 text-white p-2 rounded"
                    >
                        {editingId ? "Update Customer" : "Add Customer"}
                    </button>

                </form>

                <table className="w-full mt-8 border">

                    <thead className="bg-gray-200">

                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">First Name</th>
                            <th className="border p-2">Last Name</th>
                            <th className="border p-2">Gender</th>
                            <th className="border p-2">Telephone</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            customers.map((customer) => (

                                <tr key={customer.customerid}>

                                    <td className="border p-2">
                                        {customer.customerid}
                                    </td>

                                    <td className="border p-2">
                                        {customer.firstname}
                                    </td>

                                    <td className="border p-2">
                                        {customer.lastname}
                                    </td>

                                    <td className="border p-2">
                                        {customer.gender}
                                    </td>

                                    <td className="border p-2">
                                        {customer.telephone}
                                    </td>

                                    <td className="border p-2">
                                        {customer.address}
                                    </td>

                                    <td className="border p-2">
                                        {customer.registrationdate}
                                    </td>

                                    <td className="border p-2 space-x-2">

                                        <button
                                            onClick={() => handleEdit(customer)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(customer.customerid)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Customers;