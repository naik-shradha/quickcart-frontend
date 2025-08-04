import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import LandingPage from "./pages/LandingPage";
import ProductList from "./pages/ProductList";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductManagement from "./pages/AdminProductManagement"; // ✅ New import
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "ASp4r9vMYH4H_gGXJbbpRmgV-xz8aCfKHj3MXN1HiReI0SjqiAszurk-DuZaP69c4yPaEVUnmqC-D-W9",
        currency: "USD",
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LandingPage theme={theme} setTheme={setTheme} />} // pass toggle
          />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders/success" element={<SuccessPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route
            path="/admin/inventory"
            element={<AdminProductManagement />}
          />{" "}
          {/* ✅ New route */}
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
