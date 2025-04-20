import React, { useState } from 'react';
import ProductCard from 'frontend/src/components/ProductCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5,
      numReviews: 128,
      vendorId: 1,
      vendorName: 'TechGadgets'
    },
    {
      id: 2,
      name: 'Smart Watch with Fitness Tracker',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.2,
      numReviews: 86,
      vendorId: 2,
      vendorName: 'WearableTech'
    },
    {
      id: 3,
      name: 'Organic Cotton T-Shirt',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
      numReviews: 215,
      vendorId: 3,
      vendorName: 'EcoFashion'
    }
  ]);

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const moveToCart = (product) => {
    // In a real app, this would add the product to cart
    console.log('Moving to cart:', product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Wishlist</h1>
        <span className="text-gray-600">{wishlist.length} items</span>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} addToCart={() => moveToCart(product)} />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                aria-label="Remove from wishlist"
              >
                <i className="fas fa-times text-gray-500"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="far fa-heart text-4xl text-gray-300 mb-4"></i>
          <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you love for easy access later</p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition">
            Continue Shopping
          </button>
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition">
            Add All to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;