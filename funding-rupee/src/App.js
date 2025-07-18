// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FundingRupeeLanding from './components/FundingRupeeLanding';
import DonationPage from './components/DonationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FundingRupeeLanding />} />
        <Route path="/donate" element={<DonationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
