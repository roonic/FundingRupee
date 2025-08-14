import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import api from "../api/axios";

const CLOUDINARY_UPLOAD_PRESET = "direct";
const CLOUDINARY_CLOUD_NAME = "ddksvqafm";

export default function CampaignSetup() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  // Check authentication by calling a protected endpoint on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Assuming /auth/profile is protected with JWT guard
        await api.get("/auth/profile");
        // If success, fetch categories
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Authentication failed or failed to load categories", err);
        navigate("/Auth", {state: { from: location } }); // redirect to login if unauthorized
      }
    };
    checkAuth();
  }, [navigate]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const uploadImagesToCloudinary = async () => {
    const uploadedImageUrls = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        if (!data.secure_url)
          throw new Error("No secure_url returned from Cloudinary");

        uploadedImageUrls.push(data.secure_url);
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        throw err;
      }
    }

    return uploadedImageUrls;
  };

  const handleSubmit = async () => {
    if (
      !selectedCategoryId ||
      !goalAmount ||
      !title.trim() ||
      !story.trim() ||
      !endDate ||
      images.length === 0
    ) {
      alert("Please complete all fields");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // No token needed, cookie sent automatically
      const imageUrls = await uploadImagesToCloudinary();

      const campaignData = {
        category: selectedCategoryId,
        goalAmount: Number(goalAmount),
        title: title.trim(),
        description: story.trim(),
        endDate: new Date(endDate).toISOString(),
        images: imageUrls,
      };

      const res = await api.post("/campaigns", campaignData);

      navigate("/verification", { state: { campaignId: res.data._id } });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        // Unauthorized — user needs to login again
        navigate("/Auth");
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-green-600 text-2xl font-semibold text-center mb-6">
          Start Your Fundraiser
        </h1>

        {/* Category Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">What are you fundraising for?</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategoryId(category._id)}
                className={`p-3 rounded border flex items-center justify-center gap-2 transition ${
                  selectedCategoryId === category._id
                    ? "text-green-600 border-green-600 bg-green-50"
                    : "text-gray-800 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Fundraising Goal (NRP)</label>
          <input
            type="number"
            min="1"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Campaign Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Story */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Your Story</label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="w-full border rounded p-2 h-36"
          />
        </div>

        {/* End Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded p-2"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
          {images.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">{images.length} file(s) selected</p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`w-full py-3 px-6 rounded text-white font-semibold transition ${
            submitting ? "bg-gray-400 cursor-not-allowed" : "bg-teal-800 hover:bg-teal-900"
          }`}
        >
          {submitting ? "Submitting..." : "Continue"}
        </button>

        {submitError && <p className="mt-4 text-red-600">{submitError}</p>}
      </div>
    </>
  );
}
