import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProductManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      fetchProducts();
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/products/${editId}`, formData);
      } else {
        await axios.post("/products/add", formData);
      }
      setFormData({ name: "", price: "", stock: "", image: "" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Admin: Manage Products</h2>

        <form onSubmit={handleAddOrUpdate} className="space-y-4 mb-6">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div>
          <h3 className="text-xl font-semibold mb-2">Existing Products</h3>
          {products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center border p-2 mb-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p>
                  ₹{product.price} | Stock: {product.stock}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagement;
