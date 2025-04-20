"use client";
import React from "react";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  method: string;
}

const payments: Payment[] = [
  { id: "P-1001", date: "2023-05-14", amount: 150.0, status: "completed", method: "Credit Card" },
  { id: "P-1002", date: "2023-05-13", amount: 89.99, status: "pending", method: "PayPal" },
  { id: "P-1003", date: "2023-05-12", amount: 215.47, status: "completed", method: "Bank Transfer" },
  { id: "P-1004", date: "2023-05-10", amount: 59.99, status: "failed", method: "Credit Card" },
];

const getStatusColor = (status: Payment["status"]): string => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const PaymentHistory: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono">{payment.id}</td>
                <td className="px-4 py-2">{payment.date}</td>
                <td className="px-4 py-2 font-semibold">${payment.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{payment.method}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(payment.status)}`}>{payment.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
