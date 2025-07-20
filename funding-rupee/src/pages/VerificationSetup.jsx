import React from "react";
import Navbar from "../components/navbar";

export default function VerificationSetup() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-bold text-green-600 mb-6">
          Verification & Withdrawal Setup
        </h2>

        {/* Identity Verification Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            🪪 Identity Verification
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Government ID <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Profile Photo
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Proof of Cause (e.g. receipts, reports)
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            💳 Bank or Mobile Wallet Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Account Number
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Account Number
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Wallet Number (optional)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-8">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
            Submit & Finish
          </button>
        </div>
      </div>
    </>
  );
}
