import React from "react";
import { Shield } from "lucide-react";

const CircularProgress = ({ progress }) => {
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-[96px] h-[96px]">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#22c55e"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-green-600">
        {`${Math.round(progress)}%`}
      </div>
    </div>
  );
};

const CampaignCard = ({ title, description, image, verified, category, progress = 0 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-4">
      {/* Image */}
      <div className="h-48 bg-gray-200 relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {verified && (
          <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}
      </div>

      {/* Text + Progress */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <CircularProgress progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
