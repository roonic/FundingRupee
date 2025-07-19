
import React, { useState } from 'react';
import { Play, Eye, MessageCircle, Shield, ChevronRight } from 'lucide-react';

// Header Component
const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Funding</span>
            <span className="text-xl font-bold text-green-600">Rupee</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Donate</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Fundraise</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Start a Fundraiser
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Funding For Nepal
            </h1>
            <h2 className="text-4xl lg:text-5xl font-bold text-green-600 mb-8">
              Nepal's Platform for Change,<br />
              Powered by You.
            </h2>
            <p className="text-gray-600 mb-10 text-xl leading-relaxed">
              Crowdfunding Nepal's Hopes, One Rupee Closer.
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-8 py-4 text-lg rounded-md hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Donate Now
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 text-lg rounded-md hover:bg-green-50 hover:shadow-md transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-96 h-96 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="text-white text-7xl">👨‍👩‍👧‍👦</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Campaign Card Component
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
          <span className="text-green-600 font-medium">Created by Amod Aade</span>
        </div>
      </div>
    </div>
  );
};

// Featured Campaigns Component
const FeaturedCampaigns = () => {
  const campaigns = [
    {
      title: "Support Aditya Education - His Right Drug Out Without Your Help.",
      description: "Helping a young student continue his education",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      verified: true,
      category: "Education"
    },
    {
      title: "Support Aditya Education - His Right Drug Out Without Your Help.",
      description: "Educational support for underprivileged children",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      verified: true,
      category: "Education"
    },
    {
      title: "Support Aditya Education - His Right Drug Out Without Your Help.",
      description: "Making education accessible for all",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      verified: true,
      category: "Education"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-lg mb-8 overflow-hidden flex">
            <div className="w-1/2 h-64 bg-red-600 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"></div>
              <div className="relative z-10 text-center text-white">
                <div className="text-4xl mb-2">🏔️</div>
                <div className="text-2xl mb-1">🌊</div>
                <div className="text-sm opacity-80">Nepal Mountains</div>
                <div className="text-sm opacity-80">Flood Emergency</div>
              </div>
            </div>
            <div className="w-1/2 text-white p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">🚨 Emergency: Nepal Flood Relief Fund</h3>
              <p className="mb-6 leading-relaxed">
                Devastating monsoon floods have affected thousands of families across Nepal. Many have lost their homes and need immediate assistance with shelter, food, clean water, and medical supplies. Support verified relief efforts helping communities rebuild.
              </p>
              <button className="bg-white text-red-600 px-6 py-3 rounded-md hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 font-semibold self-start transition-all duration-300">
                Donate Now →
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Campaigns</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} {...campaign} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Component
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

// Featured Stories Component
const FeaturedStories = () => {
  const stories = [
    {
      title: "RADIATING HOPE: A successful campaign.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=500&fit=crop",
      category: "Education"
    },
    {
      title: "RADIATING HOPE: A successful campaign.",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=500&fit=crop",
      category: "Healthcare"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="h-96 bg-gray-900 rounded-lg overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">{story.title}</h3>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">Funding</span>
              <span className="text-xl font-bold text-green-600">Rupee</span>
            </div>
            <p className="text-gray-400 mb-4">Crowdfunding Nepal's Hopes, One Rupee Closer.</p>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Donate</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Categories</a></li>
              <li><a href="#" className="hover:text-white">Top Campaigns</a></li>
              <li><a href="#" className="hover:text-white">Tax Benefits</a></li>
              <li><a href="#" className="hover:text-white">Donate</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Fundraise</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Start a Campaign</a></li>
              <li><a href="#" className="hover:text-white">Fundraising Categories</a></li>
              <li><a href="#" className="hover:text-white">Signup As A Charity</a></li>
              <li><a href="#" className="hover:text-white">Fundraising Tips</a></li>
              <li><a href="#" className="hover:text-white">Beneficiary Fundraising</a></li>
              <li><a href="#" className="hover:text-white">Charity Fundraising</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Transparency Report</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-gray-400 text-center">© 2024 FundingRupee</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const FundingRupeeApp = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedCampaigns />
      <Features />
      <FeaturedStories />
      <Footer />
    </div>
  );
};

export default FundingRupeeApp;