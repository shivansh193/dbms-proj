import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddressForm from 'frontend/src/components/AddressForm';
import PaymentMethod from 'frontend/src/components/PaymentMethod';
import OrderSummary from 'frontend/src/components/OrderSummary';

const Checkout = ({ cartItems, setCartItems }) => {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingFee = 5.99;
  const tax = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * 0.08), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + shippingFee + tax;

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    // In a real app, this would send the order to the backend
    setOrderPlaced(true);
    setCartItems([]);
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-green-500 text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
            <h4 className="font-medium mb-2">Order Summary</h4>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Items:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Shipping:</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 mt-2 border-t border-gray-200 font-medium">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link 
            to="/account/orders" 
            className="block bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md transition mb-3"
          >
            View Order Details
          </Link>
          <Link 
            to="/" 
            className="block bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-md transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/cart" className="text-primary-600 hover:text-primary-700 transition">
            Back to Cart
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* Checkout Steps */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-8">
              <div className={`flex-1 text-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${step >= 1 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                  {step > 1 ? <i className="fas fa-check"></i> : '1'}
                </div>
                <span className="text-sm font-medium">Shipping</span>
              </div>
              
              <div className="flex-1 border-t-2 border-gray-200 mx-2"></div>
              
              <div className={`flex-1 text-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${step >= 2 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                  {step > 2 ? <i className="fas fa-check"></i> : '2'}
                </div>
                <span className="text-sm font-medium">Payment</span>
              </div>
              
              <div className="flex-1 border-t-2 border-gray-200 mx-2"></div>
              
              <div className={`flex-1 text-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${step >= 3 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                  3
                </div>
                <span className="text-sm font-medium">Review</span>
              </div>
            </div>

            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                <AddressForm onSubmit={handleAddressSubmit} />
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <PaymentMethod onSelect={handlePaymentSelect} />
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(3)}
                    disabled={!paymentMethod}
                    className={`px-6 py-2 rounded-md transition ${paymentMethod ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                    <p>{shippingAddress.address}</p>
                    {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                    <p>{shippingAddress.country}</p>
                    <p className="mt-2">Phone: {shippingAddress.phone}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {paymentMethod === 'creditCard' && (
                      <p>Credit Card ending in •••• 4242</p>
                    )}
                    {paymentMethod === 'paypal' && (
                      <div className="flex items-center">
                        <i className="fab fa-paypal text-2xl text-blue-500 mr-2"></i>
                        <span>PayPal</span>
                      </div>
                    )}
                    {paymentMethod === 'bankTransfer' && (
                      <p>Bank Transfer</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Order Items</h3>
                  <div className="border border-gray-200 rounded-md">
                    {cartItems.map(item => (
                      <div key={item.id} className="p-4 border-b border-gray-200 last:border-0 flex justify-between">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p>${item.price.toFixed(2)} × {item.quantity}</p>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <OrderSummary 
            items={cartItems} 
            shippingFee={shippingFee} 
            tax={tax} 
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;