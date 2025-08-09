// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { User } from "lucide-react";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import api from "../api/axios";

// const FundraiserDetailsBody = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [campaign, setCampaign] = useState(location.state?.campaign || null);
//   const [loading, setLoading] = useState(!campaign); // if no campaign passed in state, loading true
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // If no campaign in state (e.g. user visits directly), fetch from backend by id
//     if (!campaign && id) {
//       const fetchCampaign = async () => {
//         try {
//           setLoading(true);
//           const res = await api.get("/campaigns");
//           const foundCampaign = res.data.find((c) => c._id === id);
//           if (!foundCampaign) {
//             setError("Campaign not found");
//           } else {
//             setCampaign(foundCampaign);
//           }
//         } catch (err) {
//           setError("Error fetching campaign data");
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchCampaign();
//     }
//   }, [campaign, id]);

//   if (loading) return <p className="text-center py-10">Loading campaign...</p>;
//   if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
//   if (!campaign) return null;

//   const createdDate = new Date(campaign.createdAt);
//   const hoursAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60));

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
//         {/* Main Section */}
//         <div className="md:col-span-2 space-y-6">
//           <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>

//           <div className="text-sm text-gray-500 flex items-center space-x-2">
//             <User className="w-4 h-4" />
//             <p>
//               <strong className="text-gray-800">{campaign.creator?.name || "Organizer"}</strong> has
//               initiated this fundraiser <span className="text-green-600">{hoursAgo} h ago</span>
//             </p>
//           </div>

//           {campaign.images && campaign.images.length > 0 ? (
//             <img
//               src={campaign.images[0]}
//               alt={campaign.title}
//               className="rounded-lg w-full object-cover"
//             />
//           ) : (
//             <img
//               src={campaign.image || "https://via.placeholder.com/600x400"}
//               alt={campaign.title}
//               className="rounded-lg w-full object-cover"
//             />
//           )}

//           <div className="text-gray-700 text-base leading-relaxed space-y-4">
//             <p>{campaign.description}</p>
//             <button className="text-blue-600 font-medium hover:underline">Read more</button>
//           </div>

//           {/* Organizer Section */}
//           <div className="mt-10 border-t pt-6">
//             <h2 className="text-xl font-semibold mb-4">Organizer</h2>
//             <div className="flex items-center space-x-4">
//               <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
//                 {campaign.creator?.name ? campaign.creator.name.charAt(0) : "O"}
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800">{campaign.creator?.name || "Organizer"}</p>
//                 <p className="text-sm text-gray-500">Unknown location</p>
//               </div>
//             </div>
//             <button className="mt-4 border border-gray-300 rounded px-4 py-2 text-sm text-gray-600 hover:border-gray-500 transition">
//               Contact
//             </button>
//           </div>

//           {/* Additional Actions */}
//           <div className="mt-6 space-y-3">
//             <p className="text-sm text-gray-600">
//               If something isn't right, we will work with you to ensure no misuse occurs.
//             </p>
//             <button className="text-blue-500 text-sm hover:underline">Report this Campaign</button>
//             <p className="text-sm text-gray-600">
//               Have a question or need assistance?{" "}
//               <button className="text-blue-500 hover:underline">Contact Us</button>
//             </p>
//           </div>
//         </div>

//         {/* Sidebar Section */}
//         <div className="space-y-6">
//           <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-2">
//               Rs. {campaign.currentAmount?.toLocaleString() || "0"} raised
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               Rs. {campaign.goalAmount?.toLocaleString() || "0"} goal
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
//               <div
//                 className="bg-green-500 h-3 rounded-full"
//                 style={{ width: `${campaign.progress || 0}%` }}
//               />
//             </div>
//             <p className="text-sm text-green-600 font-medium">{campaign.progress || 0}%</p>
//             <div className="mt-4 space-y-3">
//               <button className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded hover:bg-blue-200 transition">
//                 Share
//               </button>
//               <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
//                 Donate Now
//               </button>
//             </div>
//           </div>

//           {/* Donors Preview (static placeholder) */}
//           <div className="border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
//             {Array(3)
//               .fill()
//               .map((_, i) => (
//                 <div key={i} className="flex justify-between text-sm text-gray-700">
//                   <span>Anonymous</span>
//                   <span>Rs. 685 · via eSewa</span>
//                 </div>
//               ))}
//             <div className="flex justify-between items-center mt-4">
//               <button className="text-sm text-blue-600 hover:underline">See All</button>
//               <button className="text-sm text-gray-600 hover:underline">Top Donors</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default FundraiserDetailsBody;

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { User } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import api from "../api/axios";

const FundraiserDetailsBody = () => {
  const location = useLocation();
  const { id } = useParams();

  const [campaign, setCampaign] = useState(location.state?.campaign || null);
  const [loadingCampaign, setLoadingCampaign] = useState(!campaign);
  const [errorCampaign, setErrorCampaign] = useState(null);

  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [errorDonations, setErrorDonations] = useState(null);

  // Fetch campaign if not passed via state
  useEffect(() => {
    if (!campaign && id) {
      const fetchCampaign = async () => {
        try {
          setLoadingCampaign(true);
          const res = await api.get("/campaigns");
          const foundCampaign = res.data.find((c) => c._id === id);
          if (!foundCampaign) {
            setErrorCampaign("Campaign not found");
          } else {
            setCampaign(foundCampaign);
          }
        } catch (err) {
          setErrorCampaign("Error fetching campaign data");
          console.error(err);
        } finally {
          setLoadingCampaign(false);
        }
      };
      fetchCampaign();
    } else {
      setLoadingCampaign(false);
    }
  }, [campaign, id]);

  // Fetch donations for this campaign
  useEffect(() => {
    if (!campaign?._id) return;

    const fetchDonations = async () => {
      try {
        setLoadingDonations(true);
        const res = await api.get(`/donations/campaign/${campaign._id}`);
        setDonations(res.data); // expecting an array of donations
      } catch (err) {
        setErrorDonations("Error fetching donations");
        console.error(err);
      } finally {
        setLoadingDonations(false);
      }
    };
    fetchDonations();
  }, [campaign]);

  if (loadingCampaign) return <p className="text-center py-10">Loading campaign...</p>;
  if (errorCampaign) return <p className="text-center py-10 text-red-600">{errorCampaign}</p>;
  if (!campaign) return null;

  const createdDate = new Date(campaign.createdAt);
  const hoursAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60));

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Main Section */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>

          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <p>
              <strong className="text-gray-800">{campaign.creator?.name || "Organizer"}</strong> has
              initiated this fundraiser <span className="text-green-600">{hoursAgo} h ago</span>
            </p>
          </div>

          {campaign.images && campaign.images.length > 0 ? (
            <img
              src={campaign.images[0]}
              alt={campaign.title}
              className="rounded-lg w-full object-cover"
            />
          ) : (
            <img
              src={campaign.image || "https://via.placeholder.com/600x400"}
              alt={campaign.title}
              className="rounded-lg w-full object-cover"
            />
          )}

          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            <p>{campaign.description}</p>
            <button className="text-blue-600 font-medium hover:underline">Read more</button>
          </div>

          {/* Organizer Section */}
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Organizer</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                {campaign.creator?.name ? campaign.creator.name.charAt(0) : "O"}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{campaign.creator?.name || "Organizer"}</p>
                <p className="text-sm text-gray-500">Unknown location</p>
              </div>
            </div>
            <button className="mt-4 border border-gray-300 rounded px-4 py-2 text-sm text-gray-600 hover:border-gray-500 transition">
              Contact
            </button>
          </div>

          {/* Additional Actions */}
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600">
              If something isn't right, we will work with you to ensure no misuse occurs.
            </p>
            <button className="text-blue-500 text-sm hover:underline">Report this Campaign</button>
            <p className="text-sm text-gray-600">
              Have a question or need assistance?{" "}
              <button className="text-blue-500 hover:underline">Contact Us</button>
            </p>
          </div>
        </div>

        {/* Sidebar Section */}
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
                style={{ width: `${campaign.progress || 0}%` }}
              />
            </div>
            <p className="text-sm text-green-600 font-medium">{campaign.progress || 0}%</p>
            <div className="mt-4 space-y-3">
              <button className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded hover:bg-blue-200 transition">
                Share
              </button>
              <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
                Donate Now
              </button>
            </div>
          </div>

          {/* Donors Preview - dynamically fetched */}
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Donations</h3>

            {loadingDonations && <p>Loading donations...</p>}
            {errorDonations && <p className="text-red-600">{errorDonations}</p>}

            {!loadingDonations && donations.length === 0 && (
              <p className="text-gray-600">No donations yet. Be the first!</p>
            )}

            {!loadingDonations && donations.length > 0 && donations.map((donation) => (
              <div
                key={donation._id}
                className="flex flex-col space-y-1 text-sm text-gray-700 border-b border-gray-100 pb-2"
              >
                <div className="flex justify-between">
                  <span>{donation.anonymous ? "Anonymous" : donation.donor || "Anonymous"}</span>
                  <span>
                    Rs. {donation.amount.toLocaleString()} · via {donation.paymentMethod || "N/A"}
                  </span>
                </div>
                {donation.message && (
                  <p className="text-xs italic text-gray-500">"{donation.message}"</p>
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
              <button className="text-sm text-blue-600 hover:underline">See All</button>
              <button className="text-sm text-gray-600 hover:underline">Top Donors</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FundraiserDetailsBody;
