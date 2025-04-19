import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from 'frontend/src/components/CartItem';
import OrderSummary from 'frontend/src/components/OrderSummary';

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const shippingFee = 5.99;
  const tax = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * 0.08), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
          <Link 
            to="/" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 pb-4 mb-4">
                <div className="col-span-6 font-medium text-gray-700">Product</div>
                <div className="col-span-2 font-medium text-gray-700">Price</div>
                <div className="col-span-2 font-medium text-gray-700">Quantity</div>
                <div className="col-span-2 font-medium text-gray-700">Total</div>
              </div>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    updateQuantity={updateQuantity} 
                    removeItem={removeItem} 
                  />
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <Link 
                  to="/" 
                  className="text-primary-600 hover:text-primary-700 transition flex items-center"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Continue Shopping
                </Link>
                <button 
                  onClick={() => setCartItems([])}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <i className="fas fa-trash mr-2"></i> Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <OrderSummary 
              items={cartItems} 
              shippingFee={shippingFee} 
              tax={tax} 
            />
            
            <Link 
              to="/checkout" 
              className="mt-4 block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md transition"
            >
              Proceed to Checkout
            </Link>
            
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-md p-4">
              <div className="flex items-start">
                <i className="fas fa-truck text-blue-500 mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Free Shipping on Orders Over $50</h4>
                  <p className="text-blue-600 text-sm">
                    Add ${(50 - cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)} more to qualify
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;