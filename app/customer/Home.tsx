"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import VendorCard from "../components/VendorCard";
import CategoryCard from "../components/CategoryCard";

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
}

interface Vendor {
  id: number;
  name: string;
  bannerImage: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  deliveryTime: string;
  productCount: number;
  joinedDate: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [popularVendors, setPopularVendors] = useState<Vendor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          price: 99.99,
          originalPrice: 129.99,
          discount: 23,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          rating: 4.5,
          numReviews: 128,
          vendorId: 1,
          vendorName: "TechGadgets"
        },
        {
          id: 2,
          name: "Smart Watch with Fitness Tracker",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          rating: 4.2,
          numReviews: 86,
          vendorId: 2,
          vendorName: "WearableTech"
        },
        {
          id: 3,
          name: "Organic Cotton T-Shirt",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          rating: 4.7,
          numReviews: 215,
          vendorId: 3,
          vendorName: "EcoFashion"
        },
        {
          id: 4,
          name: "Stainless Steel Water Bottle",
          price: 19.99,
          originalPrice: 24.99,
          discount: 20,
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          rating: 4.3,
          numReviews: 92,
          vendorId: 4,
          vendorName: "HomeEssentials"
        }
      ];
      const mockVendors: Vendor[] = [
        {
          id: 1,
          name: "TechGadgets",
          bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          rating: 4.5,
          reviews: 342,
          location: "San Francisco, CA",
          category: "Electronics",
          deliveryTime: "2-3 days",
          productCount: 78,
          joinedDate: "2020"
        },
        {
          id: 2,
          name: "FashionHub",
          bannerImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          logo: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          rating: 4.7,
          reviews: 512,
          location: "New York, NY",
          category: "Fashion",
          deliveryTime: "1-2 days",
          productCount: 145,
          joinedDate: "2019"
        }
      ];
      const mockCategories: Category[] = [
        {
          id: 1,
          name: "Electronics",
          slug: "electronics",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          productCount: 245
        },
        {
          id: 2,
          name: "Fashion",
          slug: "fashion",
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          productCount: 389
        }
      ];
      setFeaturedProducts(mockProducts);
      setPopularVendors(mockVendors);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to MarketHub</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Vendors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
