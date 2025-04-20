"use client";
import React, { useState } from "react";
import AddressForm from "../components/AddressForm";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const Checkout: React.FC<Partial<CheckoutProps>> = ({ cartItems = [], setCartItems }) => {
  const [step, setStep] = useState<number>(1);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const shippingFee = 5.99;
  const tax = cartItems.reduce((sum, item) => sum + item.price * item.quantity * 0.08, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee + tax;

  const handleAddressSubmit = (address: any) => {
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentSelect = (method: any) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setCartItems && setCartItems([]);
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
          <Link href="/account/orders" className="block bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md transition mb-3">
            View Order Details
          </Link>
          <Link href="/" className="block bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-md transition">
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
          <Link href="/cart" className="text-primary-600 hover:text-primary-700 transition">
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
              <div className={`flex-1 text-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${step >= 2 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                  {step > 2 ? <i className="fas fa-check"></i> : '2'}
                </div>
                <span className="text-sm font-medium">Payment</span>
              </div>
              <div className={`flex-1 text-center ${step === 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${step === 3 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                  {step === 3 ? <i className="fas fa-check"></i> : '3'}
                </div>
                <span className="text-sm font-medium">Review</span>
              </div>
            </div>
            {step === 1 && <AddressForm onSubmit={handleAddressSubmit} />}
            {step === 2 && <PaymentMethod onSelect={handlePaymentSelect} onNext={() => setStep(3)} />}
            {step === 3 && (
              <OrderSummary
                cartItems={cartItems}
                shippingFee={shippingFee}
                tax={tax}
                total={total}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </div>
        </div>
        <div className="lg:w-1/3">
          <OrderSummary
            cartItems={cartItems}
            shippingFee={shippingFee}
            tax={tax}
            total={total}
            hideActions
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
