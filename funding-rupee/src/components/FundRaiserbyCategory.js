// src/pages/FundraiserByCategory.jsx

import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import CategorySection from "../components/categorySection.jsx";

const mockCampaigns = [
  {
    id: 1,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 25000,
    goal: 50000,
    progress: 50,
    creator: "Rohit Joshi",
    image: "https://source.unsplash.com/featured/?hospital",
    category: "Medical",
  },
  {
    id: 2,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 25000,
    goal: 50000,
    progress: 50,
    creator: "Rohit Joshi",
    image: "https://source.unsplash.com/featured/?child,education",
    category: "Education",
  },
  {
    id: 3,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 25000,
    goal: 50000,
    progress: 50,
    creator: "Rohit Joshi",
    image: "https://source.unsplash.com/featured/?animal,help",
    category: "Animal",
  },
  {
    id: 4,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 25000,
    goal: 50000,
    progress: 50,
    creator: "Rohit Joshi",
    image: "https://source.unsplash.com/featured/?volunteer",
    category: "Nonprofit",
  },
];

const groupByCategory = (campaigns) => {
  return campaigns.reduce((acc, campaign) => {
    if (!acc[campaign.category]) acc[campaign.category] = [];
    acc[campaign.category].push(campaign);
    return acc;
  }, {});
};

const FundraiserByCategory = () => {
  const groupedCampaigns = groupByCategory([
    ...mockCampaigns,
    ...mockCampaigns,
    ...mockCampaigns,
  ]);

  const categories = Object.entries(groupedCampaigns);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-green-700 mb-2">Fundraiser By Category</h1>
        <p className="text-gray-600 mb-10">
          Explore different categories and find the causes you care about.
        </p>

        {/* Category Filters (not functional, UI only) */}
        <div className="flex flex-wrap gap-4 mb-12">
          {["Medical", "Education", "Animal", "Non Profit", "Emergency"].map((cat) => (
            <div
              key={cat}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:shadow-sm cursor-pointer"
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Category Sections */}
        {categories.map(([category, campaignList]) => (
          <CategorySection
            key={category}
            title={category}
            campaigns={campaignList.slice(0, 3)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FundraiserByCategory;
