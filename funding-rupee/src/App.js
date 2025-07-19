// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FundingRupeeLanding from './components/FundingRupeeLanding';
import DonationPage from './components/DonationPage';
// import ThankYouPage from './components/ThankYouPage';
import FundRaiserbyCategory from './components/FundRaiserbyCategory';
import FundraiserDetailsBody from './components/FundraiserDetailsBody';
// import Features from './components/features';
// import CategorySection from './components/categorySection';
import FundingRupeeApp from './pages/FundingRupeeLanding';

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<FundingRupeeApp />} />

        {/* All Campaigns by Category */}
        <Route path="/fundraisers" element={<FundRaiserbyCategory />} />

        {/* Campaign Details Page */}
        <Route path="/fundraisers/:id" element={<FundraiserDetailsBody />} />

        {/* Donation Form Page */}
        <Route path="/donate" element={<FundRaiserbyCategory />} />

        {/* After Donation Thank You Animation */}
        {/* <Route path="/thank-you" element={<ThankYouPage />} /> */}

        {/* Optional: About Page if you add */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
