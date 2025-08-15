import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from './CampaignCard';
import FloodEmergency from '../images/flood.JPG';
import Earthquake from '../images/earthquake.jpg';
import api from '../api/axios';

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
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedCampaigns = async () => {
      try {
        const response = await api.get('/campaigns'); // Adjust if needed
        const allCampaigns = response.data;

        const featured = allCampaigns
          .filter((campaign) => campaign.isFeatured)
          .slice(0, 3);

        setFeaturedCampaigns(featured);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchFeaturedCampaigns();
  }, []);

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % emergencyBanners.length);
  };

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + emergencyBanners.length) % emergencyBanners.length);
  };

  const banner = emergencyBanners[currentBanner];

  const handleCardClick = (campaign) => {
    navigate('/fundraiser-details', {
      state: {
        campaign,
        campaignId: campaign.id || campaign._id,
        campaignTitle: campaign.title,
        campaignGoal: campaign.goalAmount,
        campaignRaised: campaign.currentAmount,
        campaignCreator: campaign.creator,
        campaignCategory: campaign.category,
        campaignImage: campaign.images?.[0],
      },
    });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Banner */}
        <div className="relative flex flex-col md:flex-row h-auto md:h-[350px] rounded-lg overflow-hidden mb-8 sm:mb-12 shadow-lg">
          <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full relative">
            <img
              src={banner.image}
              alt="Emergency"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 bg-red-700 text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 leading-tight">
              {banner.title}
            </h3>
            <p className="mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed">
              {banner.description}
            </p>
            <button className="bg-white text-red-600 px-4 sm:px-6 py-2 rounded-md hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 font-semibold self-start transition-all duration-300 text-sm sm:text-base">
              Donate Now →
            </button>
          </div>

          {/* Navigation Arrows */}
          {emergencyBanners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md text-red-600 hover:bg-red-100 hover:scale-110 transform transition-all rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-10 hidden sm:flex"
                aria-label="Previous"
              >
                <span className="text-lg sm:text-xl font-bold">←</span>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md text-red-600 hover:bg-red-100 hover:scale-110 transform transition-all rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-10 hidden sm:flex"
                aria-label="Next"
              >
                <span className="text-lg sm:text-xl font-bold">→</span>
              </button>
            </>
          )}

          {/* Mobile Navigation Dots */}
          {emergencyBanners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 sm:hidden z-10">
              {emergencyBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentBanner
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Featured Campaigns */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Featured Campaigns
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredCampaigns.map((campaign) => (
            <div
              key={campaign._id}
              onClick={() => handleCardClick(campaign)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCardClick(campaign);
              }}
            >
              <CampaignCard
                title={campaign.title}
                image={campaign.images?.[0]}
                category={campaign.category}
                verified={campaign.isApproved}
                description={`Rs. ${campaign.currentAmount.toLocaleString()} raised of Rs. ${campaign.goalAmount.toLocaleString()}`}
                creator={campaign.creator}
		progress={Math.min(
                                (campaign.currentAmount / campaign.goalAmount) * 100,
                                100
                              )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
