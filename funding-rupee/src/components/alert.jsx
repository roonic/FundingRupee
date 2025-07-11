import React from 'react';
import { ArrowRight } from 'lucide-react';
import wildfire from '../images/wildfire.jpg';

const WildfireAlert = () => {
  return (
    <section className="py-8 bg-green-500 border-l-4 border-red-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src={wildfire}
              alt="Kathmandu Wildfire"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="bg-green-500 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">How to Help: Kathmandu Wildfire Relief</h3>
            <p className="text-lg mb-6 opacity-90">
              Massive wildfires are polluting Kathmandu's air and displacing families. Many are in urgent 
              need of medical care, clean air, and basic supplies. Support verified fundraisers working 
              on the ground.
            </p>
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
              Donate Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WildfireAlert;
