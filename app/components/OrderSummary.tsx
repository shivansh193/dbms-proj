import React from 'react';

interface Item {
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: Item[];
  shippingFee: number;
  tax: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, shippingFee, tax }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + shippingFee + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shippingFee.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md transition">
        Proceed to Checkout
      </button>
      
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <i className="fas fa-lock mr-2"></i>
        <span>Secure checkout</span>
      </div>
    </div>
  );
};

export default OrderSummary;
