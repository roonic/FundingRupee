import React from "react";
import { Shield } from "lucide-react";



const CampaignCard = ({ title, description, image, verified, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {verified && (
          <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-medium">Created by Ronij Pandey</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
