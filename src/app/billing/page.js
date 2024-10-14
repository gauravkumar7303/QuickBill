// src/app/billing/page.js
"use client"; // Ensure that this component can use hooks and client-side features
import React, { useState } from "react";

export default function Billing() {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    ownerName: "",
    phoneNumber: "",
    gstNumber: "",
    email: "",
  });

  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
  });

  const [products, setProducts] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const handleCompanyChange = (e) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleClientChange = (e) => {
    setClientInfo({
      ...clientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    if (product.productName && product.productDescription && product.productPrice) {
      setProducts([...products, product]);
      // Reset product form after adding
      setProduct({ productName: "", productDescription: "", productPrice: "" });
    } else {
      alert("Please fill out all product fields.");
    }
  };

  const handleTnCChange = (e) => {
    setTermsAndConditions(e.target.value);
  };

  const handleBillingSubmit = (e) => {
    e.preventDefault();
    console.log("Billing Information:", {
      companyInfo,
      clientInfo,
      products,
      termsAndConditions,
    });

    // Reset form fields after submission (optional)
    setCompanyInfo({
      companyName: "",
      ownerName: "",
      phoneNumber: "",
      gstNumber: "",
      email: "",
    });
    setClientInfo({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
    });
    setProducts([]);
    setTermsAndConditions("");
  };

  const handlePrintPreview = () => {
    const { clientName, clientEmail, clientPhone } = clientInfo; 
    const { companyName, ownerName, phoneNumber, gstNumber, email } = companyInfo;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; }
            .company-name { text-align: center; font-size: 2.5rem; color: #1a202c; }
            .client-info { float: right; }
            .company-info { float: left; }
            .item-list { margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="company-name">Your Company Name</div>
            <div class="company-info">
              <h3>Company Information</h3>
              <p>Name: ${companyName}</p>
              <p>Owner: ${ownerName}</p>
              <p>Phone: ${phoneNumber}</p>
              <p>GST No.: ${gstNumber}</p>
              <p>Email: ${email}</p>
            </div>
            <div class="client-info">
              <h3>Client Information</h3>
              <p>Name: ${clientName}</p>
              <p>Email: ${clientEmail}</p>
              <p>Phone: ${clientPhone}</p>
            </div>
            <div class="item-list">
              <table>
                <thead>
                  <tr>
                    <th>Serial No</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map((prod, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${prod.productName}</td>
                      <td>${prod.productDescription}</td>
                      <td>${prod.productPrice}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="total">
              <h3>Total: ${calculateTotal()}</h3>
            </div>
          </div>
          <div class="terms">
            <h3>Terms and Conditions</h3>
            <p>${termsAndConditions}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Function to calculate the total price of all products
  const calculateTotal = () => {
    return products.reduce((total, prod) => total + parseFloat(prod.productPrice || 0), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Billing Information</h2>
        
        <form onSubmit={handleBillingSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Info on the left */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Company Information</h3>
              {Object.keys(companyInfo).map((key) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    name={key}
                    value={companyInfo[key]}
                    onChange={handleCompanyChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200 transition duration-200"
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                    required
                  />
                </div>
              ))}
            </div>

            {/* Client Info on the right */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Client Information</h3>
              {Object.keys(clientInfo).map((key) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    name={key}
                    value={clientInfo[key]}
                    onChange={handleClientChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200 transition duration-200"
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Form */}
          <div className="border p-4 mb-4 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Add Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleProductChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200 transition duration-200"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                <input
                  type="text"
                  name="productDescription"
                  value={product.productDescription}
                  onChange={handleProductChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200 transition duration-200"
                  placeholder="Enter product description"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
                <input
                  type="number"
                  name="productPrice"
                  value={product.productPrice}
                  onChange={handleProductChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200 transition duration-200"
                  placeholder="Enter product price"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddProduct}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
              Add Product
            </button>
          </div>

          {/* Product List */}
          {products.length > 0 && (
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Products List</h3>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Product Name</th>
                    <th className="border border-gray-300 p-2">Description</th>
                    <th className="border border-gray-300 p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod, index) => (
                    <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                      <td className="border border-gray-300 p-2">{prod.productName}</td>
                      <td className="border border-gray-300 p-2">{prod.productDescription}</td>
                      <td className="border border-gray-300 p-2">{prod.productPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right font-bold mt-2">Total: ₹{calculateTotal()}</div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Terms and Conditions</h3>
            <textarea
              value={termsAndConditions}
              onChange={handleTnCChange}
              className="mt-2 w-full h-24 px-4 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:text-gray-200 transition duration-200"
              placeholder="Enter terms and conditions"
            />
          </div>

          {/* Submit and Print Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handlePrintPreview}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
              Print Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

