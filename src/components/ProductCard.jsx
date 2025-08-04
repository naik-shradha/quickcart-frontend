import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "../utils/axiosConfig";
import socket from "../socket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    socket.emit("addToCart", {
      productId: product._id,
      name: product.name,
      quantity: 1,
    });

    try {
      await axios.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to cart!");
    } catch (err) {
      console.error(
        "❌ Failed to sync with backend cart:",
        err.response?.data?.message || err.message
      );
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl shadow p-4 flex flex-col gap-2">
      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-green-600 font-bold">₹{product.price}</p>
      <p className="text-sm text-gray-500">In Stock: {product.stock}</p>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center justify-center ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <Oval height={20} width={20} color="#ffffff" strokeWidth={4} />
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
};

export default ProductCard;
