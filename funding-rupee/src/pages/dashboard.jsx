import React, { useState, useEffect } from 'react';
import { PlusCircle, Shield, MessageSquare, Award, Eye, Download, Upload, Phone, FileText, X, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import api from '../api/axios';

const OrgDashboard = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalRaised: 0,
    verificationStatus: 'pending',
    withdrawableBalance: 0
  });
  const [campaigns, setCampaigns] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        try {
          // Fetch campaigns
          const campaignsResponse = await api.get('/users/campaigns');
          const campaignsData = campaignsResponse.data || [];

          // Map API fields to component's expected fields
          const mappedCampaigns = campaignsData.map(campaign => ({
            id: campaign._id,
            title: campaign.title || 'Untitled Campaign',
            image: campaign.images?.[0] || 'https://via.placeholder.com/300x200',
            goal: campaign.goalAmount || 0,
            raised: campaign.currentAmount || 0,
            progress: Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100)) || 0,
            status: campaign.endDate && new Date(campaign.endDate) > new Date() ? 'active' : 'completed',
            createdDate: campaign.createdAt ? new Date(campaign.createdAt).toISOString().split('T')[0] : 'Unknown',
            updates: campaign.updates || 0, // Assuming updates might be added later
            verificationStatus: campaign.isApproved ? 'verified' : 'pending'
          }));
          setCampaigns(mappedCampaigns);

          // Fetch donations for all campaigns
          const donationPromises = mappedCampaigns.map(campaign =>
            api.get(`/donations/campaign/${campaign.id}`)
          );
          const donationsResponses = await Promise.all(donationPromises);
          const allDonations = donationsResponses
            .flatMap(response => response.data || [])
            .map(donation => ({
              ...donation,
              campaignTitle: mappedCampaigns.find(c => c.id === donation.campaign)?.title || 'Unknown'
            }));
          setRecentDonations(allDonations);

          // Calculate dashboard stats
          const totalRaised = mappedCampaigns.reduce((sum, campaign) => sum + (Number(campaign.raised) || 0), 0);
          const activeCampaigns = mappedCampaigns.filter(c => c.status === 'active').length;
          const withdrawableBalance = totalRaised * 0.9; // Assuming 90% is withdrawable

          setDashboardStats({
            totalCampaigns: mappedCampaigns.length,
            activeCampaigns,
            totalRaised,
            verificationStatus: mappedCampaigns.every(c => c.verificationStatus === 'verified') ? 'verified' : 'pending',
            withdrawableBalance
          });

          // Fallback withdrawal history (no API endpoint provided)
          setWithdrawalHistory([
            { amount: 50000, date: "2024-08-01", status: "completed" },
            { amount: 75000, date: "2024-07-15", status: "completed" },
            { amount: 30000, date: "2024-07-01", status: "pending" }
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Fallback data
          setCampaigns([]);
          setRecentDonations([]);
          setDashboardStats({
            totalCampaigns: 0,
            activeCampaigns: 0,
            totalRaised: 0,
            verificationStatus: 'pending',
            withdrawableBalance: 0
          });
          setWithdrawalHistory([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAmount = (amount) => {
    // Handle undefined, null, or non-numeric values
    const formattedAmount = Number(amount) || 0;
    return `Rs.${formattedAmount.toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    api
      .get("/auth/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800 border-green-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    
    return `px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || statusStyles.pending}`;
  };

  const SuccessStoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upload Success Story</h3>
          <button onClick={() => setShowSuccessModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter story title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image/Video</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Story Description</label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Share your success story and impact created..."
            ></textarea>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowSuccessModal(false);
                alert('Success story uploaded for admin review!');
              }}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Upload Story
            </button>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UpdateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Post Campaign Update</h3>
          <button onClick={() => setShowUpdateModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Update Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Progress update title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Progress Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload progress photos</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Update Description</label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe the current progress and what has been accomplished..."
            ></textarea>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowUpdateModal(false);
                alert('Update posted successfully!');
              }}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Post Update
            </button>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 mt-6">
        <div className="min-h-screen">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{getInitials(user.name)}</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Organization Dashboard</h1>
                    <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-xs font-bold">3</span>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalCampaigns}</p>
                    <p className="text-xs text-green-600 mt-1">+2 from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeCampaigns}</p>
                    <p className="text-xs text-green-600 mt-1">Currently running</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount Raised</p>
                    <p className="text-2xl font-bold text-gray-900">{formatAmount(dashboardStats.totalRaised)}</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">₹</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Verification Status</p>
                    <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {dashboardStats.verificationStatus.charAt(0).toUpperCase() + dashboardStats.verificationStatus.slice(1)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">All documents approved</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Campaign Cards */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">My Campaigns</h2>
                      <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                        {campaigns.filter(c => c.status === 'pending').length} Pending
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {campaigns.map((campaign) => (
                        <div key={campaign.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }}
                          />
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Raised: {formatAmount(campaign.raised)}</span>
                              <span>Goal: {formatAmount(campaign.goal)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full transition-all"
                                style={{ width: `${campaign.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {campaign.progress.toFixed(1)}% completed
                            </p>
                          </div>

                          <div className="flex justify-between items-center mb-3">
                            <span className={getStatusBadge(campaign.status)}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">{campaign.updates} updates</span>
                          </div>

                          <div className="flex gap-2">
                            {campaign.verificationStatus === 'verified' ? (
                              <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm hover:bg-green-200 transition-colors flex items-center justify-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </button>
                            ) : (
                              <button className="flex-1 bg-orange-100 text-orange-700 py-2 px-3 rounded-lg text-sm hover:bg-orange-200 transition-colors flex items-center justify-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Verify
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedCampaign(campaign);
                                setShowUpdateModal(true);
                              }}
                              className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Update
                            </button>
                            {campaign.status === 'completed' && (
                              <button
                                onClick={() => {
                                  setSelectedCampaign(campaign);
                                  setShowSuccessModal(true);
                                }}
                                className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm hover:bg-green-200 transition-colors flex items-center justify-center gap-1"
                              >
                                <PlusCircle className="w-3 h-3" />
                                Success Story
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {campaigns.length === 0 && (
                      <div className="text-center py-8">
                        <h3 className="text-xl font-bold text-gray-400 mb-2">No campaigns found</h3>
                        <p className="text-gray-600">Create a new campaign to get started.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Withdrawal History */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal History</h2>
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {withdrawalHistory.map((withdrawal, idx) => (
                      <div
                        key={idx}
                        className={`flex justify-between items-center p-3 rounded-lg border ${
                          withdrawal.status === 'completed' ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'
                        }`}
                      >
                        <span>{formatAmount(withdrawal.amount)}</span>
                        <span className="text-xs text-gray-600">{withdrawal.date}</span>
                        <span
                          className={`text-xs font-semibold ${
                            withdrawal.status === 'completed' ? 'text-green-700' : 'text-yellow-700'
                          }`}
                        >
                          {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                        </span>
                      </div>
                    ))}
                    {withdrawalHistory.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-gray-600">No withdrawal history available.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Withdrawable Balance Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center">
                  <p className="text-sm text-gray-600 mb-2">Withdrawable Balance</p>
                  <p className="text-3xl font-bold text-green-700 mb-4">{formatAmount(dashboardStats.withdrawableBalance)}</p>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Withdraw
                  </button>
                </div>

                {/* Recent Donations */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Donations</h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recentDonations.map((donation, idx) => (
                      <div key={donation._id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{donation.donor?.name || 'Anonymous'}</p>
                          <p className="text-xs text-gray-500">
                            {donation.donatedAt ? new Date(donation.donatedAt).toLocaleDateString() : 'Unknown'} • {donation.paymentMethod || 'Unknown'}
                          </p>
                          <p className="text-xs text-gray-600 italic">Campaign: {donation.campaignTitle}</p>
                        </div>
                        <p className="font-semibold text-green-700">{formatAmount(donation.amount)}</p>
                      </div>
                    ))}
                    {recentDonations.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-gray-600">No recent donations available.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showSuccessModal && <SuccessStoryModal />}
          {showUpdateModal && <UpdateModal />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrgDashboard;
