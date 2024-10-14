"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { productData as initialProductData } from "../../data"; // Adjust the path as needed

export default function Dashboard() {
  const [productForm, setProductForm] = useState({
    productName: "",
    productPrice: "",
  });

  const [productData, setProductData] = useState(() => {
    // Load existing product data from local storage
    const storedData = localStorage.getItem("productData");
    return storedData ? JSON.parse(storedData) : initialProductData;
  });

  const router = useRouter();

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: productForm.productName,
      price: parseFloat(productForm.productPrice),
    };

    // Update productData state
    const updatedProductData = [...productData, newProduct];
    setProductData(updatedProductData);
    
    // Store updated product data in local storage
    localStorage.setItem("productData", JSON.stringify(updatedProductData));

    // Reset the form
    setProductForm({ productName: "", productPrice: "" });

    // Navigate to the billing page
    router.push("/billing"); // Change to your billing page path
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Add Products</h2>

        <form onSubmit={handleProductSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Product Name</label>
            <input
              type="text"
              name="productName"
              value={productForm.productName}
              onChange={handleProductChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Product Price</label>
            <input
              type="number"
              name="productPrice"
              value={productForm.productPrice}
              onChange={handleProductChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200"
              placeholder="Enter product price"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Add Product
          </button>
        </form>

        {/* Display added products */}
        <h3 className="mt-6 text-xl font-bold text-gray-800 dark:text-gray-200">Products Added:</h3>
        <ul>
          {productData.map((product, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {product.name} - ${product.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


