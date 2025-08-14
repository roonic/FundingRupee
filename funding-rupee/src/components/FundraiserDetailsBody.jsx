import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, X, Copy, Check, Share2, MessageCircle } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import api from "../api/axios";
import { QRCodeCanvas } from "qrcode.react";

const FundraiserDetailsBody = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const campaign = state?.campaign;
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [errorDonations, setErrorDonations] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/campaigns/${campaign?._id}`;

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
    return <p className="text-center py-10 text-red-600">Campaign data not available.</p>;
  }

  const createdDate = new Date(campaign.createdAt);
  const hoursAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60));
  const progress = Math.round((campaign.currentAmount / campaign.goalAmount) * 100);
  const topDonations = [...donations].sort((a, b) => b.amount - a.amount).slice(0, 3);
  const recentDonations = donations.slice(0, 3);
  const donationsToShow = modalType === "top" ? topDonations : donations;
  const images = campaign.images?.length ? campaign.images : ["https://via.placeholder.com/600x400"];

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy the link.");
    }
  };

  const openSocial = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(`Help support: ${campaign.title}`);
    const encodedDescription = encodeURIComponent(campaign.description?.substring(0, 100) + "...");
    
    const socialLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=Check out this fundraiser: ${encodedUrl}`,
    };
    
    if (socialLinks[platform]) {
      window.open(socialLinks[platform], "_blank", "width=600,height=400");
    }
  };

  // Social Media Icons Components
  const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  const TelegramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
    </svg>
  );

  const ShareModal = () => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-8">
          <button
            onClick={() => setShareModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <Share2 className="w-6 h-6" />
            <h2 className="text-xl font-bold">Share this fundraiser</h2>
          </div>
          <p className="text-blue-100 text-sm mt-2">Help spread the word and reach more supporters</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Copy Link Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Campaign Link</label>
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
              />
              <button
                onClick={copyLink}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  copied
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Share on social media</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => openSocial("facebook")}
                className="flex items-center justify-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FacebookIcon />
                <span className="font-medium">Facebook</span>
              </button>
              
              <button
                onClick={() => openSocial("whatsapp")}
                className="flex items-center justify-center space-x-3 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <WhatsAppIcon />
                <span className="font-medium">WhatsApp</span>
              </button>
              
              <button
                onClick={() => openSocial("twitter")}
                className="flex items-center justify-center space-x-3 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <TwitterIcon />
                <span className="font-medium">X (Twitter)</span>
              </button>
              
              <button
                onClick={() => openSocial("linkedin")}
                className="flex items-center justify-center space-x-3 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <LinkedInIcon />
                <span className="font-medium">LinkedIn</span>
              </button>
              
              <button
                onClick={() => openSocial("telegram")}
                className="flex items-center justify-center space-x-3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <TelegramIcon />
                <span className="font-medium">Telegram</span>
              </button>
              
              <button
                onClick={() => openSocial("email")}
                className="flex items-center justify-center space-x-3 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <EmailIcon />
                <span className="font-medium">Email</span>
              </button>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-50 rounded-lg p-4 text-center space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Scan QR Code to Share</h4>
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <QRCodeCanvas 
                  value={shareUrl} 
                  size={120}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Scan with your phone camera to quickly access this fundraiser
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <p>
              <strong className="text-gray-800">{campaign.creator?.name || "Organizer"}</strong> has
              initiated this fundraiser <span className="text-green-600">{hoursAgo} h ago</span>
            </p>
          </div>
          <div className="space-y-4">
            <img
              src={images[selectedImage]}
              alt={`Campaign Image ${selectedImage + 1}`}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                      index === selectedImage ? "border-blue-500 shadow-md" : "border-transparent hover:border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            <p>{campaign.description}</p>
            <button className="text-blue-600 font-medium hover:underline">Read more</button>
          </div>
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Organizer</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white">
                {campaign.creator?.name?.charAt(0) || "O"}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{campaign.creator?.name || "Organizer"}</p>
                <p className="text-sm text-gray-500">Unknown location</p>
              </div>
            </div>
            <button className="mt-4 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:border-gray-500 hover:bg-gray-50 transition">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Contact
            </button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Rs. {campaign.currentAmount?.toLocaleString() || "0"} raised
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              of Rs. {campaign.goalAmount?.toLocaleString() || "0"} goal
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress > 100 ? 100 : progress}%` }}
              />
            </div>
            <p className="text-sm text-green-600 font-semibold">{progress}% funded</p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShareModalOpen(true)}
                className="w-full bg-blue-50 text-blue-700 font-semibold py-3 rounded-lg hover:bg-blue-100 transition flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Campaign</span>
              </button>
              <button
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-green-600 to-green-700"
                onClick={() =>
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
                  })
                }
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {shareModalOpen && <ShareModal />}
      <Footer />
    </>
  );
};

export default FundraiserDetailsBody;
