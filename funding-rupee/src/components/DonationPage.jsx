// components/DonationPage.jsx
import React, { useState } from 'react';
import esewaLogo from '../images/esewaLogo.png';
import khaltiLogo from '../images/khaltiLogo.png';
import bankLogo from '../images/bankLogo.jpg';
import SmallNavbar from './smallNavbar';

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [tip, setTip] = useState(false);
  const [method, setMethod] = useState('esewa');

  const subtotal = parseFloat(amount) || 0;
  const tipAmount = tip ? subtotal * 0.1 : 0;
  const total = subtotal + tipAmount;

  const paymentMethods = [
    { id: 'esewa', name: 'eSewa', logo: esewaLogo },
    { id: 'khalti', name: 'Khalti', logo: khaltiLogo },
    { id: 'bank', name: 'Bank Transfer', logo: bankLogo }
  ];

  const handlePayment = () => {
    if (!amount || subtotal <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (method === 'bank') {
      alert("Please scan the QR code using your bank app to complete the payment.");
    } else {
      // Simulated redirect for now – replace this with API call or redirect
      alert(`Redirecting to ${method} for Rs. ${total.toFixed(2)}...`);
      // Example: window.location.href = `/api/pay/${method}?amount=${total}`;
    }
  };

  return (
  <>
  {/* Navbar */}
  {/* <div className="bg-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">Funding</span>
            <span className="text-2xl font-bold text-green-600">Rupee</span>
          </div>
    <a href="/" className="text-sm text-gray-600 hover:text-green-600 font-medium">
      ← Back to Home
    </a>
  </div>
</div> */}

<SmallNavbar />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-10">
          Make a Donation
        </h2>

        {/* Amount Input */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Enter Amount (Rs.)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 500"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tip Option */}
        <div className="mb-8 flex items-center justify-between">
          <label className="text-gray-700 font-medium">Support our platform (Add 10% tip)</label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tip}
              onChange={() => setTip(!tip)}
              className="form-checkbox text-green-600 w-5 h-5"
            />
            <span className="ml-2 text-gray-700">{tip ? 'Yes' : 'No'}</span>
          </label>
        </div>

        {/* Payment Methods */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-3 gap-4">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setMethod(pm.id)}
                className={`flex items-center justify-center border rounded-lg px-4 py-3 transition duration-200 ${
                  method === pm.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                <img src={pm.logo} alt={pm.name} className="h-8" />
              </button>
            ))}
          </div>
        </div>

        {/* Conditional UI */}
        {method === 'bank' ? (
          <div className="mb-10 text-center">
            <p className="text-gray-600 mb-3 font-medium">
              Scan the QR below using your <strong>Banking App</strong>
            </p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/QR_code_icon.svg/1024px-QR_code_icon.svg.png"
              alt="Bank QR Code"
              className="mx-auto w-40 border rounded-lg shadow"
            />
            <p className="text-sm text-gray-500 mt-2">
              Bank: XYZ Bank<br />
              Acc No: 123456789
            </p>
          </div>
        ) : (
          <div className="mb-10 text-center">
            <p className="text-gray-700 font-medium">
              You’ll be redirected to <strong>{method.toUpperCase()}</strong> to complete your donation.
            </p>
          </div>
        )}

        {/* Summary and Button */}
        <div className="text-center mb-6">
          <p className="text-xl text-gray-700">
            Total Amount: <strong>Rs. {total.toFixed(2)}</strong>
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {method === 'bank' ? 'Scan & Donate' : `Proceed to ${method}`}
          </button>
        </div>
      </div>
    </div>
    </>
  );

};

export default DonationPage;
