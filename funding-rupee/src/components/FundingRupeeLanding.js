import React, { useState } from 'react';
import { Heart, ArrowRight, Users, Target, Globe, Check } from 'lucide-react';
import happyChildren from '/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/images/happychilldren.jpeg';
import wildfire from '/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/images/wildfire.jpg';
const FundingRupeeLanding = () => {
  const [activeCard, setActiveCard] = useState(null);

  const campaigns = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">Funding</span>
              <span className="text-2xl font-bold text-green-600">Rupee</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href='asdasd.html'>Donate</a>
              <a href="adsda.html" className="text-gray-600 hover:text-gray-900 transition-colors">Fundraise</a>
              <a href="asda.html" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Start A Fundraiser
              </button>
            </nav>
            <button className="md:hidden p-2">
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
                <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
                <span className="w-4 h-0.5 bg-gray-600"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-40 lg:py-70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-8">
            <h1 className="text-sm font-medium text-gray-600 mb-4">Funding For Nepal</h1>
          </div> */}
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-green-600">Nepal's Platform for Change,</span>
                <br />
                <span className="text-gray-800">Powered by You.</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Crowdfunding Nepal's Hopes, One Rupee Closer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center">
                  Donate Now
                  <Heart className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={happyChildren}
                  alt="Happy children"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">10,000+</p>
                    <p className="text-gray-600">Lives Impacted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaign Alert */}
      <section className="py-8 bg-green-500 border-l-4 border-red-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={wildfire}
                alt="Kathmandu Wildfire"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-green-500 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">How to Help: Kathmandu Wildfire Relief</h3>
              <p className="text-lg mb-6 opacity-90">
                Massive wildfires are polluting Kathmandu's air and displacing families. Many are in urgent 
                need of medical care, clean air, and basic supplies. Support verified fundraisers working 
                on the ground.
              </p>
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                  <div className="text-green-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
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
                          {campaign.creator.split(' ').map(n => n[0]).join('')}
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nepalis who are already making positive change happen, one rupee at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Campaign
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Browse Campaigns
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold">Funding</span>
                <span className="text-2xl font-bold text-green-500">Rupee</span>
              </div>
              <p className="text-gray-400">
                Nepal's platform for change, powered by you.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust & safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FundingRupee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FundingRupeeLanding;