"use client";
// src/app/layout.js
import './globals.css';
import Link from 'next/link';
import { useState } from 'react';

// Metadata should be placed outside the client-side component
/*export const metadata = {
  title: 'Book Store Billing System',
  description: 'Manage your book store with ease',
};*/

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <header className="bg-blue-500 dark:bg-blue-700 p-4 text-white">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">QuickBill</h1>

            {/* Hamburger menu for small/medium screens */}
            <button
              className="md:hidden block text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Links - hidden on smaller screens */}
            <div className={`space-x-4 md:flex ${isOpen ? 'hidden' : 'hidden'}`}>
              <Link href="/">Home</Link>
              <Link href="/register">Register Company</Link>
              <Link href="/login">Login</Link>
            </div>
          </nav>

          {/* Dropdown menu for small/medium screens */}
          {isOpen && (
            <div className="md:hidden bg-blue-600 mt-2 space-y-2 p-2 rounded">
              <Link href="/" className="block text-white">
                Home
              </Link>
              <Link href="/register" className="block text-white">
                Register Company
              </Link>
              <Link href="/login" className="block text-white">
                Login
              </Link>
            </div>
          )}
        </header>

        <main className="container mx-auto py-8">{children}</main>

        <footer className="bg-blue-500 dark:bg-blue-700 p-4 text-center text-white">
          <p>&copy; {new Date().getFullYear()} Book Store Billing System. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}


