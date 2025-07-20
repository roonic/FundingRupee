import React from "react";
import { Shield } from "lucide-react";

// const CampaignCard = ({ campaign }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       <div className="relative">
//         <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover rounded-t-lg" />
//         <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
//           {campaign.category}
//         </div>
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{campaign.title}</h3>
//         <div className="text-sm text-gray-600 flex justify-between mb-1">
//           <span>Raised</span>
//           <span>Rs. {campaign.raised.toLocaleString()}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
//           <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
//         </div>
//         <div className="text-xs text-gray-500 mb-2">
//           <span>{campaign.progress}% funded</span> &middot; <span>Goal: Rs. {campaign.goal.toLocaleString()}</span>
//         </div>
//         <div className="text-xs text-gray-600">Created by {campaign.creator}</div>
//       </div>
//     </div>
//   );
// };

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
