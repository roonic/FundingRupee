import React from 'react';


const SmallNavbar = () => {
  return (
  <div className="bg-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <div className="hidden md:flex items-center">
            <span className="text-2xl font-bold text-gray-800">Funding</span>
            <span className="text-2xl font-bold text-green-600">Rupee</span>
          </div>
    <a href="/" className="text-sm text-gray-600 hover:text-green-600 font-medium">
      ← Back to Home
    </a>
  </div>
</div>
  )
};

export default SmallNavbar;
