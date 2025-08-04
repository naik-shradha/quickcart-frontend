import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ theme, setTheme }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="QuickCart Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          QuickCart
          </h1>
        </div>
        <div className="space-x-6 flex items-center">
          {/* Dark mode toggle button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* existing links */}
          <Link
            to="/shop"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Shop
          </Link>
          <Link
            to="/About"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            About
          </Link>
          <Link to="/login">
            <button className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="p-6 pt-4 flex flex-col items-center text-center text-gray-800 dark:text-gray-200">
        <img
          src="/img1.jpg"
          alt="Groceries Banner"
          className="w-full max-w-4xl rounded-xl shadow-lg mb-6 mt-6"
        />
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Get Groceries Delivered in Minutes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          QuickCart brings fresh groceries to your door in real-time. Shop now
          and experience the convenience.
        </p>
        <Link to="/login">
          <button className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:bg-red-600 transition">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Why Choose QuickCart */}
      <section className="bg-white dark:bg-gray-800 py-12 px-6">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          Why Choose QuickCart?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl text-center shadow">
            <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              ⏱️ Real-Time Delivery
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Get your groceries delivered in minutes, not hours.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl text-center shadow">
            <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              🛍️ Wide Selection
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from a vast array of products, from fresh produce to pantry
              staples.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl text-center shadow">
            <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
              ✅ Quality Assurance
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              We ensure the highest quality and freshness for all our products.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="text-center py-12 px-6 text-gray-800 dark:text-gray-200"
      >
        <h3 className="text-2xl font-semibold mb-8">📞 Contact Me</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow text-center">
            <h4 className="font-semibold text-lg mb-1"> Email</h4>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              shradhanaik@gmail.com
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow text-center">
            <h4 className="font-semibold text-lg mb-1"> Phone</h4>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              +91 96476 85436
            </p>
          </div>
        </div>
      </section>

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

export default LandingPage;
