"use client";
import React, { useState } from "react";
import CategoryCard from "../components/CategoryCard";

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  subcategories: Subcategory[];
}

const CategoryBrowse: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      productCount: 245,
      subcategories: [
        { id: 101, name: "Smartphones", slug: "smartphones", productCount: 78 },
        { id: 102, name: "Laptops", slug: "laptops", productCount: 45 },
        { id: 103, name: "Headphones", slug: "headphones", productCount: 62 },
        { id: 104, name: "Cameras", slug: "cameras", productCount: 35 },
        { id: 105, name: "Smart Watches", slug: "smart-watches", productCount: 25 },
      ],
    },
    {
      id: 2,
      name: "Fashion",
      slug: "fashion",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      productCount: 389,
      subcategories: [
        { id: 201, name: "Men's Clothing", slug: "mens-clothing", productCount: 145 },
        { id: 202, name: "Women's Clothing", slug: "womens-clothing", productCount: 178 },
        { id: 203, name: "Jewelry", slug: "jewelry", productCount: 42 },
        { id: 204, name: "Watches", slug: "watches", productCount: 24 },
      ],
    },
    {
      id: 3,
      name: "Home & Garden",
      slug: "home-garden",
      image:
        "https://images.unsplash.com/photo-1583845112203-4541b01c57a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      productCount: 176,
      subcategories: [
        { id: 301, name: "Furniture", slug: "furniture", productCount: 68 },
        { id: 302, name: "Kitchen", slug: "kitchen", productCount: 45 },
        { id: 303, name: "Bedding", slug: "bedding", productCount: 32 },
        { id: 304, name: "Garden", slug: "garden", productCount: 31 },
      ],
    },
    {
      id: 4,
      name: "Health & Beauty",
      slug: "health-beauty",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      productCount: 132,
      subcategories: [
        { id: 401, name: "Skincare", slug: "skincare", productCount: 56 },
        { id: 402, name: "Haircare", slug: "haircare", productCount: 34 },
        { id: 403, name: "Makeup", slug: "makeup", productCount: 28 },
        { id: 404, name: "Fragrances", slug: "fragrances", productCount: 14 },
      ],
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      image:
        "https://images.unsplash.com/photo-1543357480-c60d400e2ef9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      productCount: 98,
      subcategories: [
        { id: 501, name: "Exercise Equipment", slug: "exercise-equipment", productCount: 32 },
        { id: 502, name: "Outdoor Recreation", slug: "outdoor-recreation", productCount: 28 },
        { id: 503, name: "Team Sports", slug: "team-sports", productCount: 22 },
        { id: 504, name: "Cycling", slug: "cycling", productCount: 16 },
      ],
    },
    {
      id: 6,
      name: "Toys & Games",
      slug: "toys-games",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      productCount: 87,
      subcategories: [
        { id: 601, name: "Action Figures", slug: "action-figures", productCount: 23 },
        { id: 602, name: "Board Games", slug: "board-games", productCount: 18 },
        { id: 603, name: "Dolls", slug: "dolls", productCount: 15 },
        { id: 604, name: "Puzzles", slug: "puzzles", productCount: 11 },
        { id: 605, name: "Educational Toys", slug: "educational-toys", productCount: 20 },
      ],
    },
  ]);

  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Browse Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      {/* Expandable subcategories UI could be implemented here */}
    </div>
  );
};

export default CategoryBrowse;
