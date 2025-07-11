import React from 'react';
export const campaigns = [
    {
      id: 1,
      title: "Support Ashu's Education - He Might Drop Out Without Your Help.",
      raised: 25000,
      goal: 50000,
      progress: 50,
      creator: "Rohit Joshi",
      image: "/api/placeholder/300/200",
      category: "Education"
    },
    {
      id: 2,
      title: "Support Ashu's Education - He Might Drop Out Without Your Help.",
      raised: 25000,
      goal: 50000,
      progress: 50,
      creator: "Rohit Joshi",
      image: "/api/placeholder/300/200",
      category: "Education"
    },
    {
      id: 3,
      title: "Support Ashu's Education - He Might Drop Out Without Your Help.",
      raised: 25000,
      goal: 50000,
      progress: 50,
      creator: "Rohit Joshi",
      image: "/api/placeholder/300/200",
      category: "Education"
    }
  ];

const FeaturedCampaigns = ({ campaigns, setActiveCard, activeCard }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Campaigns</h2>
          <p className="text-lg text-gray-600">
            Support these urgent causes making a real difference in Nepal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onMouseEnter={() => setActiveCard(campaign.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  {campaign.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {campaign.title}
                </h3>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Raised</span>
                    <span>Rs. {campaign.raised.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{campaign.progress}% funded</span>
                    <span>Goal: Rs. {campaign.goal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {campaign.creator.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">Created by {campaign.creator}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
