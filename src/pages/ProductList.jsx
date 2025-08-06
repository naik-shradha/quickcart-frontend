import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux

  useEffect(() => {
    axios
      .get("/products");
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row sm:justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="QuickCart Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            QuickCart
          </h1>
        </div>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 max-w-xl px-4 py-2 rounded-full border border-gray-300 shadow-sm mb-2 sm:mb-0 dark:bg-gray-700 dark:text-gray-200"
        />

        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Home
          </Link>

          {/* ✅ Admin links */}
          {user?.role === "admin" && (
            <>
              <Link
                to="/admin/orders"
                className="text-blue-600 font-medium dark:text-blue-400"
              >
                Manage Orders
              </Link>
              <Link
                to="/admin/inventory"
                className="text-blue-600 font-medium dark:text-blue-400"
              >
                Manage Inventory
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white relative"
          >
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 mt-auto">
        <div className="flex justify-center gap-4 mb-2">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
        © 2024 QuickCart. All rights reserved.
      </footer>
    </div>
  );
};

export default ProductList;
