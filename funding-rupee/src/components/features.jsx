import React from 'react';
// import { Users, Target, Globe } from 'lucide-react';
import { Eye, MessageCircle, Shield} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Transparent fees on everything",
      description: "See exactly where your money goes"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Take advantage of tax relief",
      description: "Eligible donations qualify for tax benefits"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fully regulated, safe & secure",
      description: "Your donations are protected and secure"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What we offer?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:bg-green-700 group-hover:shadow-lg transform group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
