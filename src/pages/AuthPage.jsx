import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";

    try {
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await axios.post(endpoint, payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(setUser(res.data));
      toast.success(`${isLogin ? "Login" : "Registration"} successful!`);
      setTimeout(() => navigate("/shop"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="QuickCart Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            QuickCart
          </h1>
        </div>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            About
          </Link>
        </div>
      </nav>

      {/* Auth Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            {isLogin ? "Login to QuickCart" : "Register for QuickCart"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <Oval
                  height={20}
                  width={20}
                  color="white"
                  secondaryColor="#f87171"
                  strokeWidth={5}
                  visible={true}
                  ariaLabel="oval-loading"
                />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
            {isLogin ? "New user?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 hover:underline"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex justify-center gap-4 mb-2">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
        © 2024 QuickCart. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthPage;
