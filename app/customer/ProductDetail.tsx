"use client";
import React, { useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import Rating from "@/app/components/Rating";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  numReviews: number;
  vendorId: number;
  vendorName: string;
  description?: string;
}

const mockProduct: Product = {
  id: 1,
  name: "Wireless Bluetooth Headphones",
  price: 99.99,
  originalPrice: 129.99,
  discount: 23,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  rating: 4.5,
  numReviews: 128,
  vendorId: 1,
  vendorName: "TechGadgets",
  description: "High-quality wireless headphones with noise cancellation.",
};

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    alert("Added to cart!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={mockProduct.image} alt={mockProduct.name} className="w-full rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>
          <div className="flex items-center mb-4">
            <Rating value={mockProduct.rating} />
            <span className="text-gray-600 ml-2">({mockProduct.numReviews} reviews)</span>
          </div>
          <div className="mb-4">
            <span className="text-2xl font-bold text-primary-600 mr-2">${mockProduct.price.toFixed(2)}</span>
            {mockProduct.originalPrice && (
              <span className="text-gray-400 line-through mr-2">${mockProduct.originalPrice.toFixed(2)}</span>
            )}
            {mockProduct.discount && (
              <span className="text-green-600 font-semibold">-{mockProduct.discount}%</span>
            )}
          </div>
          <p className="mb-6 text-gray-700">{mockProduct.description}</p>
          <div className="flex items-center mb-6">
            <label className="mr-2 font-medium">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button onClick={handleAddToCart} className="bg-primary-600 text-white px-6 py-2 rounded-md font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[mockProduct, mockProduct, mockProduct].map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
