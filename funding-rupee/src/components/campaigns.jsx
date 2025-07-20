import React, { useState } from 'react';
import CampaignCard from './CampaignCard';
import Education from '../images/education.jpg';
import FloodEmergency from '../images/flood.jpeg'; // Replace as needed
import Earthquake from '../images/earthquake.jpg'; // Optional second emergency image

export const campaigns = [
  {
    title: "Support Aditya's Education – Help Him Stay in School",
    description: "Helping a young student continue his education",
    image: Education,
    verified: true,
    category: "Education"
  },
  {
    title: "Empower Children Through Education",
    description: "Educational support for underprivileged children",
    image: Education,
    verified: true,
    category: "Education"
  },
  {
    title: "Equal Learning Opportunity for All",
    description: "Making education accessible for all",
    image: Education,
    verified: true,
    category: "Education"
  }
];

// Emergency banners (can add more)
const emergencyBanners = [
  {
    image: FloodEmergency,
    title: "🚨 Emergency: Nepal Flood Relief Fund",
    description:
      "Monsoon floods have displaced thousands in Nepal. Urgent support is needed for food, clean water, and shelter. Help communities recover and rebuild."
  },
  {
    image: Earthquake,
    title: "🆘 Emergency: Nepal Earthquake Response",
    description:
      "A recent earthquake has devastated villages across Nepal. Families urgently need tents, medical aid, and reconstruction support."
  }
];

const FeaturedCampaigns = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % emergencyBanners.length);
  };

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + emergencyBanners.length) % emergencyBanners.length);
  };

  const banner = emergencyBanners[currentBanner];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Banner */}
        <div className="relative flex h-[350px] rounded-lg overflow-visible mb-12 shadow-lg">
          {/* Left Image */}
          <div className="w-1/2 h-full relative">
            <img
              src={banner.image}
              alt="Emergency"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="w-1/2 bg-red-700 text-white p-8 flex flex-col justify-center relative">
            <h3 className="text-2xl font-bold mb-3">{banner.title}</h3>
            <p className="mb-5 text-base leading-relaxed">{banner.description}</p>
            <button className="bg-white text-red-600 px-6 py-2 rounded-md hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 font-semibold self-start transition-all duration-300">
              Donate Now →
            </button>
          </div>

          {/* Attractive Left Arrow */}
          {emergencyBanners.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md text-red-600 hover:bg-red-100 hover:scale-110 transform transition-all rounded-full w-10 h-10 flex items-center justify-center z-10"
              aria-label="Previous"
            >
              <span className="text-xl font-bold">←</span>
            </button>
          )}

          {/* Attractive Right Arrow */}
          {emergencyBanners.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md text-red-600 hover:bg-red-100 hover:scale-110 transform transition-all rounded-full w-10 h-10 flex items-center justify-center z-10"
              aria-label="Next"
            >
              <span className="text-xl font-bold">→</span>
            </button>
          )}
        </div>

        {/* Featured Campaigns */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Campaigns</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} {...campaign} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
