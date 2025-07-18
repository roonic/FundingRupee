import React from "react";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {campaign.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{campaign.title}</h3>
        <div className="text-sm text-gray-600 flex justify-between mb-1">
          <span>Raised</span>
          <span>Rs. {campaign.raised.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
        </div>
        <div className="text-xs text-gray-500 mb-2">
          <span>{campaign.progress}% funded</span> &middot; <span>Goal: Rs. {campaign.goal.toLocaleString()}</span>
        </div>
        <div className="text-xs text-gray-600">Created by {campaign.creator}</div>
      </div>
    </div>
  );
};

export default CampaignCard;
