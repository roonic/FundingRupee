
import React from 'react';

// import Navbar from '../components/navbar.jsx';
// import Footer from "../components/footer.jsx";
// import WildfireAlert from "../components/alert.jsx"
import FeaturedStories from '../components/FeaturedStories.jsx';
import Features from "../components/features.jsx"
import Hero from "../components/hero.jsx"
// import CampaignCard from '../components/CampaignCard.jsx';
import FeaturedCampaigns from '../components/campaigns.jsx';
// import CTA from "../components/cta.jsx"
// import FeaturedCampaigns from "../components/campaigns.jsx"
// import { campaigns } from '../components/campaigns.jsx';
// // Header Component

import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
// Hero Section Component


// Campaign Card Component


// Featured Campaigns Component
// const FeaturedCampaigns = () => {
//   const campaigns = [
//     {
//       title: "Support Aditya Education - His Right Drug Out Without Your Help.",
//       description: "Helping a young student continue his education",
//       image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
//       verified: true,
//       category: "Education"
//     },
//     {
//       title: "Support Aditya Education - His Right Drug Out Without Your Help.",
//       description: "Educational support for underprivileged children",
//       image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
//       verified: true,
//       category: "Education"
//     },
//     {
//       title: "Support Aditya Education - His Right Drug Out Without Your Help.",
//       description: "Making education accessible for all",
//       image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
//       verified: true,
//       category: "Education"
//     }
//   ];

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-12">
//           <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-lg mb-8 overflow-hidden flex">
//             <div className="w-1/2 h-64 bg-red-600 flex items-center justify-center relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"></div>
//               <div className="relative z-10 text-center text-white">
//                 <div className="text-4xl mb-2">🏔️</div>
//                 <div className="text-2xl mb-1">🌊</div>
//                 <div className="text-sm opacity-80">Nepal Mountains</div>
//                 <div className="text-sm opacity-80">Flood Emergency</div>
//               </div>
//             </div>
//             <div className="w-1/2 text-white p-8 flex flex-col justify-center">
//               <h3 className="text-2xl font-bold mb-4">🚨 Emergency: Nepal Flood Relief Fund</h3>
//               <p className="mb-6 leading-relaxed">
//                 Devastating monsoon floods have affected thousands of families across Nepal. Many have lost their homes and need immediate assistance with shelter, food, clean water, and medical supplies. Support verified relief efforts helping communities rebuild.
//               </p>
//               <button className="bg-white text-red-600 px-6 py-3 rounded-md hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 font-semibold self-start transition-all duration-300">
//                 Donate Now →
//               </button>
//             </div>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Campaigns</h2>
//         </div>
//         <div className="grid md:grid-cols-3 gap-6">
//           {campaigns.map((campaign, index) => (
//             <CampaignCard key={index} {...campaign} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// Features Component


// Featured Stories Component


// Footer Component


// Main App Component
const FundingRupeeApp = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedCampaigns/>
      <Features />
      <FeaturedStories />
      <Footer />
    </div>
  );
};

export default FundingRupeeApp;