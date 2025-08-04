// src/redux/loadUserAndCart.js
import { setUser, logout } from "./authSlice";
import { setCart } from "./cartSlice";
import axios from "../utils/axiosConfig";

export const loadUserAndCart = async (store) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      // Optional: Validate token expiry
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.exp * 1000 < Date.now()) {
        store.dispatch(logout());
        return;
      }

      store.dispatch(setUser({ token, user: JSON.parse(user) }));

      const res = await axios.get("/cart");
      const items = res.data.items.map((i) => ({
        product: i.productId,
        quantity: i.quantity,
      }));
      store.dispatch(setCart(items));
    } catch (err) {
      console.error("❌ Failed to load user or cart:", err);
      store.dispatch(logout());
    }
  }
};
