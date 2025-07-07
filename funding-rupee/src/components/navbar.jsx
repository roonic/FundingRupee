
import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">Funding</span>
            <span className="text-2xl font-bold text-green-600">Rupee</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/donate.html" className="text-gray-600 hover:text-gray-900 transition-colors">Donate</a>
            <a href="/fundraise.html" className="text-gray-600 hover:text-gray-900 transition-colors">Fundraise</a>
            <a href="/about.html" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
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
  );
};

export default Navbar;
