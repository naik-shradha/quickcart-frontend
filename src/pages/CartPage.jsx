import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, setCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import PayPalCheckoutButton from "../components/PayPalCheckoutButton";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/cart"); // returns { items: [...] }
        const cartItems = res.data.items || [];
        dispatch(setCart(cartItems));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    if (token) {
      fetchCart();
    }
  }, [dispatch, token]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`/cart/remove/${productId}`);
      dispatch(removeFromCart(productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.patch(`/cart/update/${productId}`, { quantity: newQuantity });
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          🛒 Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <Link to="/shop" className="text-blue-500">
              Shop now
            </Link>
          </p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={item._id || `${item.name}-${index}`}
                className="flex items-center justify-between mb-4 p-4 border rounded shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  src={
                    item.image ||
                    "https://dummyimage.com/64x64/cccccc/000000&text=No+Image"
                  }
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 px-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="text-lg font-semibold mt-6">
              Total: ₹{totalPrice.toFixed(2)}
            </div>

            <div className="mt-4">
              {totalPrice > 0 && (
                <PayPalCheckoutButton total={Number(totalPrice.toFixed(2))} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
