import React from 'react';
import { Users, Target, Globe } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description: "Join thousands of supporters making a difference"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Transparent Goals",
    description: "Clear funding targets and progress tracking"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Local Impact",
    description: "Supporting communities across Nepal"
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FundingRupee?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nepal's most trusted crowdfunding platform, connecting donors with verified causes that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <div className="text-green-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
