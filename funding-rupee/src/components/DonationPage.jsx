import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import esewaLogo from '../images/esewaLogo.png';
import khaltiLogo from '../images/khaltiLogo.png';
import bankLogo from '../images/bankLogo.jpg';
import SmallNavbar from './smallNavbar';

const DonationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const campaign = state?.campaignId;

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('esewa');
  const [message, setMessage] = useState('Wishing you success!');
  const [loading, setLoading] = useState(false);

  const subtotal = parseFloat(amount) || 0;
  const total = subtotal; // No tip added

  const paymentMethods = [
    { id: 'esewa', name: 'eSewa', logo: esewaLogo },
    { id: 'khalti', name: 'Khalti', logo: khaltiLogo },
    { id: 'bank', name: 'Bank Transfer', logo: bankLogo },
  ];

  const handlePayment = async () => {
    if (!campaign) {
      alert('Campaign ID is missing.');
      return;
    }

    if (!amount || subtotal <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (method === 'bank') {
      alert('Please scan the QR and complete the transfer manually.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        '/donations',
        {
          amount: total,
          campaign,
          message,
          paymentMethod: method,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate('/thank-you');
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error('Error while donating:', error);
      alert('Donation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SmallNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-10">
            Make a Donation
          </h2>

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
              disabled={loading}
            />
          </div>

          {/* Tip section hidden */}

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Select Payment Method
            </h3>
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
                  disabled={loading}
                >
                  <img src={pm.logo} alt={pm.name} className="h-8" />
                </button>
              ))}
            </div>
          </div>

          {method === 'bank' ? (
            <div className="mb-10 text-center">
              <p className="text-gray-600 mb-3 font-medium">
                Scan the QR using your banking app:
              </p>
              <img
                src="https://res.cloudinary.com/ddksvqafm/image/upload/v1755190948/WhatsApp_Image_2025-08-14_at_10.39.41_PM_sxoetg.jpg"
                alt="Bank QR Code"
                className="mx-auto w-80 border rounded-lg shadow"
              />
              <p className="text-sm text-gray-500 mt-2">
                Bank: XYZ Bank
                <br />
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

          <div className="text-center mb-6">
            <p className="text-xl text-gray-700">
              Total Amount: <strong>Rs. {total.toFixed(2)}</strong>
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : method === 'bank'
                ? 'Scan & Donate'
                : `Proceed to ${method}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
