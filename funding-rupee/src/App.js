// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import ThankYouPage from './components/ThankYouPage';
// import FundRaiserbyCategory from '../src/pages/FundRaiserbyCategory';
// import FundraiserDetailsBody from '../src/pages/FundraiserDetailsBody';
// // import Features from './components/features';
// // import CategorySection from './components/categorySection';
// import FundingRupeeApp from '../src/pages/FundingRupeeLanding';
// import AboutUs from '../src/pages/AboutUs';
// import DonationPage from '../src/components/DonationPage'
import FundingRupeeApp from './pages/FundingRupeeLanding';
// import FundraiserByCategory from './pages/FundRaiserbyCategory';
import FundraiserDetailsBody from './components/FundraiserDetailsBody';
import AboutUs from './pages/AboutUs';
import DonationPage from './components/DonationPage';
// import FundraiserByCategory from './pages/FundRaiserbyCategory';
import FundraiserByCategory from './components/FundRaiserbyCategory';
import CampaignSetup from './pages/CampaignSetup';
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
        {/* <Route path="/donate" element={<FundRaiserbyCategory />} /> */}

         {/* Donation Form Page */}
        <Route path="/DonationPage" element={<DonationPage />} />


        {/* After Donation Thank You Animation */}
        {/* <Route path="/thank-you" element={<ThankYouPage />} /> */}

        {/* Optional: About Page if you add */}
        <Route path="/about" element={<AboutUs />} />

        < Route path='/start-fundraiser' element={<CampaignSetup />}/>
      </Routes>
    </Router>
  );
}

export default App;
