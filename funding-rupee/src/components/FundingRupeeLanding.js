import React, { useState } from 'react';
import Navbar from '/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/navbar.jsx';
import Footer from "/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/footer.jsx";
import WildfireAlert from "/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/alert.jsx"
import Features from "/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/features.jsx"
import Hero from "/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/hero.jsx"
import CTA from "/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/cta.jsx"
import FeaturedCampaigns from "/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/campaigns.jsx"
import { campaigns } from '/Users/mubhinbasnet/Desktop/FundingRupee/funding-rupee/src/components/campaigns.jsx';


const FundingRupeeLanding = () => {
  const [activeCard, setActiveCard] = useState(null);
  return (
    
     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar /> 
      {/* Hero Section */}
      <Hero />
      
      {/* WildfireAlert */}
      <WildfireAlert />
      
      {/* Features Section */}
      <Features />
     
      {/* Featured Campaigns */}
      {/* <FeaturedCampaigns /> */}
      <FeaturedCampaigns 
        campaigns={campaigns} 
        setActiveCard={setActiveCard} 
         activeCard={activeCard} 
/>

      {/* CTA Section */}
      <CTA />
     
      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default FundingRupeeLanding;