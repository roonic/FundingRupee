import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Facebook, Instagram, MessageCircle } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import api from "../api/axios";

const FundraiserDetailsBody = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const campaign = state?.campaign;

  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [errorDonations, setErrorDonations] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const [shareOpen, setShareOpen] = useState(false); // NEW STATE FOR SHARE MENU

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await api.get(`/donations/campaign/${campaign._id}`);
        setDonations(res.data);
      } catch (err) {
        console.error(err);
        setErrorDonations("Error fetching donations");
      } finally {
        setLoadingDonations(false);
      }
    };
    if (campaign?._id) {
      fetchDonations();
    }
  }, [campaign]);

  if (!campaign) {
    return (
      <p className="text-center py-10 text-red-600">
        Campaign data not available.
      </p>
    );
  }

  const createdDate = new Date(campaign.createdAt);
  const hoursAgo = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60)
  );
  const progress = Math.round(
    (campaign.currentAmount / campaign.goalAmount) * 100
  );

  const topDonations = [...donations]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
  const recentDonations = donations.slice(0, 3);
  const donationsToShow = modalType === "top" ? topDonations : donations;

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const images = campaign.images?.length
    ? campaign.images
    : ["https://via.placeholder.com/600x400"];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {campaign.title}
          </h1>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <p>
              <strong className="text-gray-800">
                {campaign.creator?.name || "Organizer"}
              </strong>{" "}
              has initiated this fundraiser{" "}
              <span className="text-green-600">{hoursAgo} h ago</span>
            </p>
          </div>

          {/* Image Gallery */}
          <div className="space-y-4">
            <img
              src={images[selectedImage]}
              alt={`Campaign Image ${selectedImage + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  className={`w-24 h-16 object-cover rounded cursor-pointer border-2 ${
                    index === selectedImage
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            <p>{campaign.description}</p>
            <button className="text-blue-600 font-medium hover:underline">
              Read more
            </button>
          </div>

          {/* Organizer Section */}
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Organizer</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                {campaign.creator?.name?.charAt(0) || "O"}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {campaign.creator?.name || "Organizer"}
                </p>
                <p className="text-sm text-gray-500">Unknown location</p>
              </div>
            </div>
            <button className="mt-4 border border-gray-300 rounded px-4 py-2 text-sm text-gray-600 hover:border-gray-500 transition">
              Contact
            </button>
          </div>

          {/* Additional Info */}
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

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Rs. {campaign.currentAmount?.toLocaleString() || "0"} raised
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Rs. {campaign.goalAmount?.toLocaleString() || "0"} goal
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${progress > 100 ? 100 : progress}%` }}
              />
            </div>
            <p className="text-sm text-green-600 font-medium">{progress}%</p>

            {/* Share & Donate Buttons */}
            <div className="mt-4 space-y-3">
              {/* Share Button with Click Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen((prev) => !prev)}
                  className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded hover:bg-blue-200 transition flex items-center justify-center gap-2"
                >
                  Share
                </button>
                {shareOpen && (
                  <div className="absolute left-0 right-0 mt-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">
                        Share on Facebook
                      </span>
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
                    >
                      <Instagram className="w-5 h-5 text-pink-500" />
                      <span className="text-sm text-gray-700">
                        Share on Instagram
                      </span>
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `Check out this fundraiser: ${window.location.href}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
                    >
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">
                        Share on WhatsApp
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* Donate Button */}
              <button
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: "#0B4F6C" }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#094A63")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "#0B4F6C")
                }
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/donation", {
                    state: {
                      campaign,
                      campaignId: campaign._id,
                      campaignTitle: campaign.title,
                      campaignGoal: campaign.goalAmount,
                      campaignRaised: campaign.currentAmount,
                      campaignCreator: campaign.creator,
                      campaignCategory: campaign.category,
                      campaignImage: campaign.images?.[0],
                    },
                  });
                }}
              >
                Donate Now
              </button>
            </div>
          </div>

          {/* Donors */}
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Recent Donations
            </h3>
            {loadingDonations && <p>Loading donations...</p>}
            {errorDonations && (
              <p className="text-red-600">{errorDonations}</p>
            )}
            {!loadingDonations && recentDonations.length === 0 && (
              <p className="text-gray-600">No donations yet. Be the first!</p>
            )}
            {!loadingDonations &&
              recentDonations.map((donation) => (
                <div
                  key={donation._id}
                  className="flex flex-col space-y-1 text-sm text-gray-700 border-b border-gray-100 pb-2"
                >
                  <div className="flex justify-between font-semibold">
                    <span>
                      {donation.anonymous
                        ? "Anonymous"
                        : donation.donor?.name || "Anonymous"}
                    </span>
                    <span>Rs. {donation.amount.toLocaleString()}</span>
                  </div>
                  {donation.message && (
                    <p className="text-xs italic text-gray-500">
                      "{donation.message}"
                    </p>
                  )}
                  <div className="text-xs text-gray-400">
                    {new Date(donation.donatedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => {
                  setModalType("all");
                  setModalOpen(true);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                See All
              </button>
              <button
                onClick={() => {
                  setModalType("top");
                  setModalOpen(true);
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Top Donors
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {modalType === "top" ? "Top Donations" : "All Donations"}
            </h2>
            {loadingDonations && <p>Loading donations...</p>}
            {errorDonations && (
              <p className="text-red-600">{errorDonations}</p>
            )}
            {!loadingDonations && donationsToShow.length === 0 && (
              <p className="text-gray-600">No donations yet. Be the first!</p>
            )}
            {!loadingDonations &&
              donationsToShow.map((donation) => (
                <div
                  key={donation._id}
                  className="flex flex-col space-y-1 text-sm text-gray-700 border-b border-gray-100 pb-2"
                >
                  <div className="flex justify-between font-semibold">
                    <span>
                      {donation.anonymous
                        ? "Anonymous"
                        : donation.donor?.name || "Anonymous"}
                    </span>
                    <span>Rs. {donation.amount.toLocaleString()}</span>
                  </div>
                  {donation.message && (
                    <p className="text-xs italic text-gray-500">
                      "{donation.message}"
                    </p>
                  )}
                  <div className="text-xs text-gray-400">
                    {new Date(donation.donatedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FundraiserDetailsBody;
