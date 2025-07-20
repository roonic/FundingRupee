import React from "react";
import { User } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import wildFire from "../images/wildfire.jpg";

const FundraiserDetailsBody = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Main Section */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Help Animal Sanctuary Rebuild After Fire
          </h1>

          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <p>
              <strong className="text-gray-800">Aryan Pandey</strong> has
              initiated this fundraiser{" "}
              <span className="text-green-600">21 h ago</span>
            </p>
          </div>

          <img
            src={wildFire}
            alt="Fire Damage"
            className="rounded-lg w-full object-cover"
          />

          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
              expedita non maxime totam aspernatur quaerat recusandae illum
              dignissimos sint at pariatur voluptate asperiores fugit aut
              consequatur, aperiam magni quos facere.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              molestiae autem enim corrupti cupiditate iusto repellat officiis,
              quia est doloribus a unde perspiciatis et, obcaecati consequuntur
              vero officia ipsam aut?
            </p>
            <button className="text-blue-600 font-medium hover:underline">
              Read more
            </button>
          </div>

          {/* Organizer Section */}
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Organizer</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                A
              </div>
              <div>
                <p className="font-semibold text-gray-800">Aryan Pandey</p>
                <p className="text-sm text-gray-500">Baneshwor, Kathmandu</p>
              </div>
            </div>
            <button className="mt-4 border border-gray-300 rounded px-4 py-2 text-sm text-gray-600 hover:border-gray-500 transition">
              Contact
            </button>
          </div>

          {/* Additional Actions */}
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600">
              If something isn't right, we will work with you to ensure no
              misuse occurs.
            </p>
            <button className="text-blue-500 text-sm hover:underline">
              Report this Campaign
            </button>
            <p className="text-sm text-gray-600">
              Have a question or need assistance?{" "}
              <button className="text-blue-500 hover:underline">
                Contact Us
              </button>
            </p>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Rs. 29,831 raised
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Rs. 35K goal · 1.8K donations
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: "89%" }}
              />
            </div>
            <p className="text-sm text-green-600 font-medium">89%</p>
            <div className="mt-4 space-y-3">
              <button className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded hover:bg-blue-200 transition">
                Share
              </button>
              <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
                Donate Now
              </button>
            </div>
          </div>

          {/* Donors Preview */}
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
            {Array(3)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>Anonymous</span>
                  <span>Rs. 685 · via eSewa</span>
                </div>
              ))}
            <div className="flex justify-between items-center mt-4">
              <button className="text-sm text-blue-600 hover:underline">
                See All
              </button>
              <button className="text-sm text-gray-600 hover:underline">
                Top Donors
              </button>
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
      <Footer />
    </>
  );
};

export default FundraiserDetailsBody;
