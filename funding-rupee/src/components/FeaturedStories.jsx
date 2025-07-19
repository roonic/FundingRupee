import React from "react";
import { ChevronRight } from "lucide-react";
import { Play } from "lucide-react";

const FeaturedStories = () => {
  const stories = [
    {
      title: "RADIATING HOPE: A successful campaign.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=500&fit=crop",
      category: "Education"
    },
    {
      title: "RADIATING HOPE: A successful campaign.",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=500&fit=crop",
      category: "Healthcare"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="h-96 bg-gray-900 rounded-lg overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">{story.title}</h3>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;