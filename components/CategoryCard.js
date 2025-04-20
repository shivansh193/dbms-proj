import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/products/${category.slug}`} 
      className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative pb-3/4 h-48">
        <img 
          src={category.image} 
          alt={category.name} 
          className="absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-bold">{category.name}</h3>
          <p className="text-gray-200 text-sm">{category.productCount} products</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;