"use client"
import React, { useState } from 'react';

interface CardDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentMethodProps {
  onSelect: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<'creditCard' | 'paypal' | 'bankTransfer'>('creditCard');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleMethodChange = (method: 'creditCard' | 'paypal' | 'bankTransfer') => {
    setSelectedMethod(method);
    onSelect(method);
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleMethodChange('creditCard')}
            className={`p-4 border rounded-md flex items-center justify-center transition ${selectedMethod === 'creditCard' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-300'}`}
          >
            <div className="flex items-center">
              <i className={`far fa-credit-card text-xl mr-2 ${selectedMethod === 'creditCard' ? 'text-primary-600' : 'text-gray-500'}`}></i>
              <span>Credit Card</span>
            </div>
          </button>
          
          <button
            onClick={() => handleMethodChange('paypal')}
            className={`p-4 border rounded-md flex items-center justify-center transition ${selectedMethod === 'paypal' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-300'}`}
          >
            <div className="flex items-center">
              <i className={`fab fa-paypal text-xl mr-2 ${selectedMethod === 'paypal' ? 'text-primary-600' : 'text-gray-500'}`}></i>
              <span>PayPal</span>
            </div>
          </button>
          
          <button
            onClick={() => handleMethodChange('bankTransfer')}
            className={`p-4 border rounded-md flex items-center justify-center transition ${selectedMethod === 'bankTransfer' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-300'}`}
          >
            <div className="flex items-center">
              <i className={`fas fa-university text-xl mr-2 ${selectedMethod === 'bankTransfer' ? 'text-primary-600' : 'text-gray-500'}`}></i>
              <span>Bank Transfer</span>
            </div>
          </button>
        </div>
      </div>
      
      {selectedMethod === 'creditCard' && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-md font-medium mb-4">Credit Card Details</h4>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleCardChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <i className="fas fa-lock mr-2"></i>
            <span>Your payment information is processed securely. We do not store your credit card details.</span>
          </div>
        </div>
      )}
      
      {selectedMethod === 'paypal' && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
          <i className="fab fa-paypal text-4xl text-blue-500 mb-4"></i>
          <p className="mb-4">You will be redirected to PayPal to complete your payment securely.</p>
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
            Continue to PayPal
          </button>
        </div>
      )}
      
      {selectedMethod === 'bankTransfer' && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-md font-medium mb-2">Bank Transfer Details</h4>
          <p className="mb-4 text-gray-600">Please use the following details for your bank transfer:</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="w-32 font-medium">Bank Name:</span>
              <span>MarketHub Bank</span>
            </div>
            <div className="flex">
              <span className="w-32 font-medium">Account Name:</span>
              <span>MarketHub Inc.</span>
            </div>
            <div className="flex">
              <span className="w-32 font-medium">Account Number:</span>
              <span>1234567890</span>
            </div>
            <div className="flex">
              <span className="w-32 font-medium">SWIFT/BIC:</span>
              <span>MHUBUS33</span>
            </div>
            <div className="flex">
              <span className="w-32 font-medium">Reference:</span>
              <span>Your Order #</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Please include your order number in the reference field. Your order will be processed once the payment is received.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
