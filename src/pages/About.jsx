import React from "react";
import { Link } from "react-router-dom";

const About = () => {
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
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-gray-800 dark:text-white font-semibold border-b-2 border-red-500 pb-1"
          >
            About
          </Link>
          <Link to="/register">
            <button className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* About Content */}
      <section className="flex-grow px-6 py-12 max-w-3xl mx-auto text-center text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-bold mb-4">👩🏻‍💻 About the Creator</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Hi! I'm <strong className="text-red-500">Shradha</strong>, a
          passionate student building this platform as part of my internship
          project at{" "}
          <strong className="text-red-500">Ultimez Technologies</strong>.
          <br />
          <br />
          QuickCart is a modern grocery shopping experience designed using the
          MERN stack. I’m building everything from backend APIs to the
          interactive frontend to sharpen my skills and solve real-world
          problems.
        </p>
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

export default About;
