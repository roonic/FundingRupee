// src/components/Hero.jsx

import React from 'react';
import { Heart, Users } from 'lucide-react';
import happyChildren from '../images/happychilldren.jpeg';

const Hero = () => {
  return (
    <section className="py-40 lg:py-70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
  );
};

export default Hero;
