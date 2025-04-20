"use client";
import React, { useState } from "react";
import Rating from "../../app/components/Rating";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    user: "Alice",
    rating: 5,
    comment: "Great product! Highly recommended.",
    date: "2023-08-01",
  },
  {
    id: 2,
    user: "Bob",
    rating: 4,
    comment: "Good value for money.",
    date: "2023-07-25",
  },
];

const Reviews: React.FC = () => {
  const [reviews] = useState<Review[]>(mockReviews);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Product Reviews</h1>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-2">
              <span className="font-bold mr-2">{review.user}</span>
              <Rating value={review.rating} />
              <span className="ml-2 text-gray-500 text-sm">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
