// src/pages/FundraiserByCategory.jsx
import React, { useState, useEffect } from "react";
import {
  Heart,
  GraduationCap,
  Stethoscope,
  HandHeart,
  AlertTriangle,
  Shield,
  AlertCircle
} from "lucide-react";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const FundraiserByCategory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryIcons = {
    Medical: <Stethoscope size={24} className="text-current" />,
    Emergency: <AlertTriangle size={24} className="text-current" />,
    Education: <GraduationCap size={24} className="text-current" />,
    Animal: <Heart size={24} className="text-current" />,
    "Non-Profit": <HandHeart size={24} className="text-current" />,
  };

  const getCategoryIcon = (categoryName) => {
    return categoryIcons[categoryName] || <HandHeart size={24} className="text-current" />;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        try {
          const categoriesResponse = await api.get("/categories");
          setCategories(categoriesResponse.data);
        } catch {
          setCategories([
            { _id: "1", name: "Medical" },
            { _id: "2", name: "Education" },
            { _id: "3", name: "Animal" },
          ]);
        }

        try {
          const campaignResponse = await api.get("/campaigns");
          setCampaigns(campaignResponse.data);
        } catch {
          setCampaigns([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setLoading(true);
      try {
        const allCampaigns = await api.get("/campaigns");
        setCampaigns(allCampaigns.data);
      } catch {
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveCategory(categoryId);
      setLoading(true);
      try {
        const response = await api.get(`/categories/${categoryId}/campaigns`);
        setCampaigns(response.data);
      } catch {
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const groupByCategory = (campaigns) => {
    return campaigns.reduce((acc, campaign) => {
      const category = categories.find((cat) => cat._id === campaign.category);
      const name = category ? category.name : "Uncategorized";
      if (!acc[name]) acc[name] = [];
      acc[name].push(campaign);
      return acc;
    }, {});
  };

  const groupedCampaigns = groupByCategory(campaigns);

  if (loading) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading categories and campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-50 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-[#0B4F6C]">
            Fundraiser By Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore different categories and find the causes you care about.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="flex gap-6 flex-wrap">
            {categories.map((category) => (
              <div
                key={category._id}
                className={`flex flex-col items-center justify-center
                  w-28 h-28 rounded-2xl cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${activeCategory === category._id
                    ? 'text-white shadow-lg transform scale-105 bg-[#0B4F6C]'
                    : 'bg-gray-200 text-gray-700 hover:text-white hover:shadow-md hover:transform hover:scale-105'
                  }`}
                onClick={() => handleCategoryClick(category._id)}
              >
                <div className="mb-2">{getCategoryIcon(category.name)}</div>
                <span className="text-sm font-semibold text-center leading-tight">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {categories.map((category) => {
            if (activeCategory && activeCategory !== category._id) return null;

            const campaignList = groupedCampaigns[category.name] || [];
            if (campaignList.length === 0) return null;

            return (
              <div key={category._id}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    {category.name} Campaigns
                    <svg className="w-6 h-6 ml-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {campaignList.slice(0, 3).map((campaign) => {
                    const percent = campaign.goalAmount > 0
                      ? Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100))
                      : 0;

                    return (
                      <div
                        key={campaign._id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        onClick={() =>
                          navigate("/fundraiser-details", {
                            state: {
                              campaign,
                              campaignId: campaign._id,
                              campaignTitle: campaign.title,
                              campaignGoal: campaign.goalAmount,
                              campaignRaised: campaign.currentAmount,
                              campaignCreator: campaign.creator,
                              campaignCategory: campaign.category,
                              campaignImage: campaign.images?.[0],
                            },
                          })
                        }
                      >
                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={campaign.images?.[0] || 'https://via.placeholder.com/400x200'}
                            alt={campaign.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x200';
                            }}
                          />
                          {campaign.isApproved ? (
                            <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </div>
                          ) : (
                            <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Unverified
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 leading-snug">
                            {campaign.title}
                          </h3>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-sm font-medium text-gray-900">Raised</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-gray-900">
                              Rs. {(campaign.currentAmount || 0).toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-600">
                              {campaign.creator?.name || 'Anonymous'}
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>

                          <button
                            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
                            style={{ backgroundColor: '#0B4F6C' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#094A63'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#0B4F6C'}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/donation', {
                                state: {
                                  campaign,
                                  campaignId: campaign._id,
                                  campaignTitle: campaign.title,
                                  campaignGoal: campaign.goalAmount,
                                  campaignRaised: campaign.currentAmount,
                                  campaignCreator: campaign.creator,
                                  campaignCategory: campaign.category,
                                  campaignImage: campaign.images?.[0]
                                }
                              });
                            }}
                          >
                            Donate Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(groupedCampaigns).length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No campaigns found</h3>
            <p className="text-gray-600">Check back later for new fundraising campaigns.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FundraiserByCategory;
