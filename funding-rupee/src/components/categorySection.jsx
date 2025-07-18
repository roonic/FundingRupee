// src/components/CategorySection.jsx

import React from "react";
import CampaignCard from "/FundingRupee/funding-rupee/src/components/CampaignCard.jsx";
import { ArrowRight } from "lucide-react";

const CategorySection = ({ title, campaigns }) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title} Campaigns</h2>
        <ArrowRight className="w-5 h-5 text-gray-500" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
