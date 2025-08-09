
// src/pages/FundraiserByCategory.jsx
import React, { useState, useEffect } from "react";
import { Heart, GraduationCap, Stethoscope, HandHeart, AlertTriangle } from "lucide-react";
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

  // Category icons mapping - updated to match your exact backend data
  const categoryIcons = {
    "Medical": <Stethoscope size={24} className="text-current" />,
    "Emergency": <AlertTriangle size={24} className="text-current" />,
    "Education": <GraduationCap size={24} className="text-current" />, 
    "Animal": <Heart size={24} className="text-current" />,
    "Non-Profit": <HandHeart size={24} className="text-current" />
  };

  // Function to get category icon
  const getCategoryIcon = (categoryName) => {
    return categoryIcons[categoryName] || <HandHeart size={24} className="text-current" />;
  };

  // Fetch both categories and campaigns
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories from your backend
        try {
          const categoriesResponse = await api.get("/categories");
          // All categories from your response are active, so we can use them directly
          setCategories(categoriesResponse.data);
          console.log('Categories loaded:', categoriesResponse.data);
        } catch (error) {
          console.error('Failed to load categories:', error);
          // Use fallback categories for testing
          setCategories([
            { "_id": "1", "name": "Medical", "slug": "medical", "isActive": true },
            { "_id": "2", "name": "Education", "slug": "education", "isActive": true },
            { "_id": "3", "name": "Animal", "slug": "animal", "isActive": true }
          ]);
        }
        
        // Fetch campaigns
        try {
          const campaignResponse = await api.get("/campaigns");
          setCampaigns(campaignResponse.data);
          console.log('Campaigns loaded:', campaignResponse.data);
        } catch (error) {
          console.error('Failed to load campaigns:', error);
          setCampaigns([]); // Empty array for now
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group campaigns by category - handle both exact name matches and slug matches
  const groupByCategory = (campaigns) => {
    return campaigns.reduce((acc, campaign) => {
      // Try to match campaign category with backend category names or slugs
      let categoryKey = campaign.category;
      
      // Find matching category from backend
      const matchingCategory = categories.find(cat => 
        cat.name === campaign.category || 
        cat.slug === campaign.category ||
        cat.name.toLowerCase() === campaign.category.toLowerCase()
      );
      
      if (matchingCategory) {
        categoryKey = matchingCategory.name;
      }
      
      if (!acc[categoryKey]) acc[categoryKey] = [];
      acc[categoryKey].push(campaign);
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

        {/* Dynamic Category Filters */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-6 flex-wrap">
            {console.log(categories)}
            {categories.map((category) => (
              <div
                key={category._id}
                className={`
                  flex flex-col items-center justify-center
                  w-28 h-28 rounded-2xl cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${activeCategory === category.name 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-700 hover:text-white hover:shadow-md hover:transform hover:scale-105'
                  }
                `}
                style={{
                  backgroundColor: activeCategory === category.name ? '#0B4F6C' : undefined
                }}
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
                onMouseOver={(e) => {
                  if (activeCategory !== category.name) {
                    e.target.closest('div').style.backgroundColor = '#0B4F6C';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeCategory !== category.name) {
                    e.target.closest('div').style.backgroundColor = '';
                  }
                }}
              >
                <div className="mb-2">
                  {getCategoryIcon(category.name)}
                </div>
                <span className="text-sm font-semibold text-center leading-tight">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-16">
          {categories.map((category) => {
            const campaignList = groupedCampaigns[category.name] || [];
            
            // Skip categories with no campaigns
            if (campaignList.length === 0) return null;

            return (
              <div key={category._id}>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    {category.name} Campaigns
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
                      key={campaign.id || campaign._id} 
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                      onClick={() => {
                        navigate('/fundraiser-details', { 
                          state: { 
                            campaign: campaign,
                            campaignId: campaign.id || campaign._id,
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
                          src={campaign.image || 'https://via.placeholder.com/400x200'} 
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200';
                          }}
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
                            Rs. {(campaign.currentAmount || 0).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-600">
                            {campaign.creator?.name || 'Anonymous'}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(
                                (campaign.currentAmount / campaign.goalAmount) * 100,
                                100
                              )}%` 
                            }}
                          ></div>
                        </div>



                      


                        {/* Donate Button */}
                        <button 
                          className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"
                          style={{ 
                            backgroundColor: '#0B4F6C',
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#094A63'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#0B4F6C'}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/donation', { 
                              state: { 
                                campaign: campaign,
                                campaignId: campaign.id || campaign._id,
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
            );
          })}
        </div>

        {/* No campaigns message */}
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

