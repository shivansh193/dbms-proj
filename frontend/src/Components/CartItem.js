import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-gray-800 font-medium">{item.name}</h3>
          <span className="text-gray-900 font-semibold">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-2">Sold by: {item.vendor}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <i className="fas fa-trash"></i> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;