"use client";
import React, { useState } from "react";
import ProductCard from "../../app/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  numReviews: number;
  vendorId: string;
  vendorName: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    numReviews: 128,
    vendorId: "1",
    vendorName: "TechGadgets"
  },
  {
    id: "2",
    name: "Smart Watch with Fitness Tracker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.2,
    numReviews: 86,
    vendorId: "2",
    vendorName: "WearableTech"
  }
];

const ProductListing: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const handleAddToCart = () => {};
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} addToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
