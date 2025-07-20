// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FundingRupeeApp from './pages/FundingRupeeLanding';
import FundraiserDetailsBody from './components/FundraiserDetailsBody';
import AboutUs from './pages/AboutUs';
import DonationPage from './components/DonationPage';
import ThankYouPage from './components/ThankYouPage';
import FundraiserByCategory from './components/FundRaiserbyCategory';
import CampaignSetup from './pages/CampaignSetup';
import VerificationSetup from './pages/VerificationSetup';
function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<FundingRupeeApp />} />

        {/* All Campaigns by Category */}
        <Route path="/fundraisers" element={<FundraiserByCategory />} />

        {/* Campaign Details Page */}
        <Route path="/fundraiser-details" element={<FundraiserDetailsBody />} />

    
         {/* Donation Form Page */}
        <Route path="/Donation" element={<DonationPage />} />


        {/* After Donation Thank You Animation */}
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* Optional: About Page if you add */}
        <Route path="/about" element={<AboutUs />} />

        < Route path='/start-fundraiser' element={<CampaignSetup />}/>
        {/* Verification after start-fundraiser */}
        <Route path="/verification" element={<VerificationSetup />} />
      </Routes>
    </Router>
  );
}

export default App;
