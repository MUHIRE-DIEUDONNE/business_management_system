// ==============================================
// Products.jsx
// ==============================================

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Products() {

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        productname: "",
        category: "",
        price: "",
        quantity: "",
        supplier: "",
        addeddate: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        const res = await axios.get(
            "http://localhost:5000/products"
        );

        setProducts(res.data);
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
                `http://localhost:5000/products/${editingId}`,
                formData
            );

            alert("Product updated");

        } else {

            await axios.post(
                "http://localhost:5000/products",
                formData
            );

            alert("Product added");
        }

        fetchProducts();

        setEditingId(null);

        setFormData({
            productname: "",
            category: "",
            price: "",
            quantity: "",
            supplier: "",
            addeddate: ""
        });
    };

    const handleEdit = (product) => {

        setFormData(product);

        setEditingId(product.productcode);
    };

    const handleDelete = async (id) => {

        await axios.delete(
            `http://localhost:5000/products/${id}`
        );

        fetchProducts();
    };

    return (
        <>
            <Navbar />

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Products Management
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-3 gap-4 bg-white p-6 rounded shadow"
                >

                    <input
                        type="text"
                        name="productname"
                        placeholder="Product Name"
                        value={formData.productname}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="supplier"
                        placeholder="Supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        name="addeddate"
                        value={formData.addeddate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <button
                        className="bg-green-600 text-white p-2 rounded"
                    >
                        {editingId ? "Update Product" : "Add Product"}
                    </button>

                </form>

                <table className="w-full mt-8 border">

                    <thead className="bg-gray-200">

                        <tr>
                            <th className="border p-2">Code</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Supplier</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            products.map((product) => (

                                <tr key={product.productcode}>

                                    <td className="border p-2">
                                        {product.productcode}
                                    </td>

                                    <td className="border p-2">
                                        {product.productname}
                                    </td>

                                    <td className="border p-2">
                                        {product.category}
                                    </td>

                                    <td className="border p-2">
                                        {product.price}
                                    </td>

                                    <td className="border p-2">
                                        {product.quantity}
                                    </td>

                                    <td className="border p-2">
                                        {product.supplier}
                                    </td>

                                    <td className="border p-2">
                                        {product.addeddate}
                                    </td>

                                    <td className="border p-2 space-x-2">

                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product.productcode)}
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

export default Products;