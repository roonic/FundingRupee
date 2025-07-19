
// src/pages/FundraiserByCategory.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, GraduationCap, Stethoscope, HandHeart, AlertTriangle } from "lucide-react";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";


const mockCampaigns = [
  {
    id: 1,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 25000,
    goal: 50000,
    progress: 50,
    creator: "Ronij Joshi",
    image: "https://source.unsplash.com/featured/?hospital,medical",
    category: "Medical",
  },
  {
    id: 2,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 25000,
    goal: 50000,
    progress: 50,
    creator: "Ronij Joshi",
    image: "https://source.unsplash.com/featured/?child,education",
    category: "Education",
  },
  {
    id: 3,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 25000,
    goal: 50000,
    progress: 50,
    creator: "Ronij Joshi",
    image: "https://source.unsplash.com/featured/?animal,help",
    category: "Animal",
  },
  {
    id: 4,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 35000,
    goal: 50000,
    progress: 70,
    creator: "Ronij Joshi",
    image: "https://source.unsplash.com/featured/?volunteer",
    category: "Non Profit",
  },
  {
    id: 5,
    title: "Support Ashu's Education – He Might Drop Out Without Your Help.",
    raised: 35000,
    goal: 50000,
    progress: 70,
    creator: "Ronij Joshi",
    image: "https://source.unsplash.com/featured/?emergency",
    category: "Emergency",
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
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  
  const groupedCampaigns = groupByCategory([
    ...mockCampaigns,
    ...mockCampaigns.map(c => ({ ...c, id: c.id + 10 })),
    ...mockCampaigns.map(c => ({ ...c, id: c.id + 20 })),
  ]);

  const categories = Object.entries(groupedCampaigns);

  // Category icons mapping
  const categoryIcons = {
    Medical: <Stethoscope size={24} />,
    Education: <GraduationCap size={24} />, 
    Animal: <Heart size={24} />,
    "Non Profit": <HandHeart size={24} />,
    Emergency: <AlertTriangle size={24} />
  };

  return (
    <div className="min-h-screen bg-grey-50" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#0B4F6C' }}>
            Fundraiser By Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore different categories and find the causes you care about.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-6">
            {["Medical", "Education", "Animal", "Non Profit", "Emergency"].map((cat) => (
              <div
                key={cat}
                className={`
                  flex flex-col items-center justify-center
                  w-28 h-28 rounded-2xl cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${activeCategory === cat 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-700 hover:text-white hover:shadow-md hover:transform hover:scale-105'
                  }
                `}
                style={{
                  backgroundColor: activeCategory === cat ? '#0B4F6C' : undefined
                }}
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                onMouseOver={(e) => {
                  if (activeCategory !== cat) {
                    e.target.closest('div').style.backgroundColor = '#0B4F6C';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeCategory !== cat) {
                    e.target.closest('div').style.backgroundColor = '';
                  }
                }}
                // onMouseEnter={() => setActiveCategory(cat)}
                // onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="mb-2">
                  {categoryIcons[cat]}
                </div>
                <span className="text-sm font-semibold text-center leading-tight">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-16">
          {categories.map(([category, campaignList]) => (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  {category} Campaigns
                  <svg 
                    className="w-6 h-6 ml-3 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </h2>
              </div>

              {/* Campaign Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaignList.slice(0, 3).map((campaign) => (
                  <div 
                    key={campaign.id} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => {
                      // Navigate to FundraiserDetailsBody with campaign data
                      navigate('/fundraiser-details', { 
                        state: { 
                          campaign: campaign,
                          campaignId: campaign.id,
                          campaignTitle: campaign.title,
                          campaignGoal: campaign.goal,
                          campaignRaised: campaign.raised,
                          campaignCreator: campaign.creator,
                          campaignCategory: campaign.category,
                          campaignImage: campaign.image
                        } 
                      });
                    }}
                  >
                    {/* Campaign Image */}
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Campaign Content */}
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 leading-snug">
                        {campaign.title}
                      </h3>
                      
                      {/* Progress Info */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm font-medium text-gray-900">
                            Raised
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">
                            Created by
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-gray-900">
                          Rs. {campaign.raised.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600">
                          {campaign.creator}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>

                      {/* Donate Button */}
                      <button 
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"
                        style={{ 
                          backgroundColor: '#0B4F6C',
                          ':hover': { backgroundColor: '#094A63' }
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#094A63'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#0B4F6C'}
                        onClick={(e) => {
                          // Stop propagation to prevent card click navigation
                          e.stopPropagation();
                          // Navigate to DonationPage with campaign data
                          navigate('/donation', { 
                            state: { 
                              campaign: campaign,
                              campaignId: campaign.id,
                              campaignTitle: campaign.title,
                              campaignGoal: campaign.goal,
                              campaignRaised: campaign.raised,
                              campaignCreator: campaign.creator,
                              campaignCategory: campaign.category,
                              campaignImage: campaign.image
                            } 
                          });
                        }}
                      >
                        Donate Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FundraiserByCategory;