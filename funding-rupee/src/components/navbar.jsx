import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Funding</span>
            <span className="text-xl font-bold text-green-600">Rupee</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/fundraisers"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Donate
            </Link>

            <Link
              to="/categories"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Fundraise
            </Link>

            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>

            <Link to="/start-fundraiser">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Start A Fundraiser
              </button>
            </Link>
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
