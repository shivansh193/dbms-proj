import React from 'react';
import { Link } from 'next/link';
import Rating from './Rating';

interface Product {
  id: string;
  name: string;
  image: string;
  discount?: number;
  rating: number;
  numReviews: number;
  originalPrice?: number;
  price: number;
  vendorId: string;
  vendorName: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <Link href={`/product/${product.id}`} passHref>
        <a className="block">
          <div className="relative pb-3/4 h-48">
            <img
              src={product.image}
              alt={product.name}
              className="absolute h-full w-full object-cover"
            />
            {product.discount && (
              <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </a>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`} passHref>
          <a className="block">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition mb-1 truncate">
              {product.name}
            </h3>
            <div className="flex items-center mb-2">
              <Rating value={product.rating} />
              <span className="text-gray-500 text-sm ml-1">({product.numReviews})</span>
            </div>
          </a>
        </Link>

        <div className="flex justify-between items-center mt-3">
          <div>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition"
            aria-label="Add to cart"
          >
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>

        <div className="mt-2 flex items-center text-sm text-gray-500">
          <i className="fas fa-store mr-1"></i>
          <Link href={`/vendor/${product.vendorId}`} passHref>
            <a className="hover:text-primary-600 transition">
              {product.vendorName}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
