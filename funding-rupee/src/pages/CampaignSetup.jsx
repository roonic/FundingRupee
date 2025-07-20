import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function CampaignSetup() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Education", "Medical", "Non Profit", "Animal", "Emergency"];
  const navigate = useNavigate();

  const handleContinue = () => {
    
    navigate("/verification");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        {/* Title */}
        <h1 className="text-green-600 text-2xl font-semibold text-center mb-6">
          Start Your Fundraiser
        </h1>

        {/* Step 1: Category Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">What are you fundraising for?</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-3 rounded border flex items-center justify-center gap-2 transition 
                  ${
                    selectedCategory === category
                      ? "text-green-600 border-green-600 bg-green-50"
                      : "text-gray-800 bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Fundraising Goal */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Fundraising Goal (NRP)
          </label>
          <input
            type="number"
            className="w-full border rounded p-2"
            placeholder="Enter target amount"
          />
        </div>

        {/* Step 3: Campaign Details */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Title of Your Campaign
          </label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Short, clear, emotional headline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="City, District"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Share Your Story</label>
          <textarea
            className="w-full border rounded p-2 h-36"
            placeholder="What happened, why it matters, how funds will be used..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
            onClick={handleContinue}
            className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-900"
          >
            Continue
          </button>
      </div>
    </>
  );
}
