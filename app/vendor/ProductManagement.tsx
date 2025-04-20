"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: "published" | "draft" | "out_of_stock";
  image: string;
  category: string;
  dateAdded: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    stock: 15,
    status: "published",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    category: "Electronics",
    dateAdded: "2023-05-15"
  },
  {
    id: 2,
    name: "Smart Watch with Fitness Tracker",
    price: 149.99,
    stock: 8,
    status: "published",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    category: "Electronics",
    dateAdded: "2023-04-28"
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    stock: 32,
    status: "draft",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    category: "Fashion",
    dateAdded: "2023-04-10"
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    stock: 0,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    category: "Home",
    dateAdded: "2023-03-22"
  }
];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction) return;
    // In a real app, this would update the products
    setSelectedProducts([]);
    setBulkAction("");
  };

  const changeProductStatus = (productId: number, newStatus: Product["status"]) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  const deleteProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Link 
          href="/vendor/products/add" 
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition"
        >
          Add Product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={bulkAction}
              onChange={e => setBulkAction(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Bulk Actions</option>
              <option value="publish">Publish</option>
              <option value="draft">Move to Draft</option>
              <option value="delete">Delete</option>
            </select>
            <button
              onClick={handleBulkAction}
              className="bg-primary-600 text-white px-4 py-1 rounded-md hover:bg-primary-700 transition"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                </td>
                <td className="px-4 py-2 flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                  <span>{product.name}</span>
                </td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2 font-semibold">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">
                  <select
                    value={product.status}
                    onChange={e => changeProductStatus(product.id, e.target.value as Product["status"])}
                    className="border border-gray-300 rounded-md px-2 py-1 text-xs"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </td>
                <td className="px-4 py-2">{product.dateAdded}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    className="text-red-600 hover:underline mr-2"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? "bg-primary-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
