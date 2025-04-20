"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";

const LocationPicker: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Select Your Location</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <label className="block text-gray-700 font-medium mb-2">Enter your city or zip code</label>
        <input
          type="text"
          value={location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
          placeholder="e.g. New York, 10001"
        />
        <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-md w-full">Submit</button>
      </form>
      {submitted && (
        <div className="mt-6 text-green-600 font-medium text-center">
          Location set to: {location}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
