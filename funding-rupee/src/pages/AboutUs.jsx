// src/pages/AboutUs.jsx
import React from "react";
import { Heart, Users, Target, Shield, Globe, Award } from "lucide-react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import CTA from "../components/cta.jsx";

const AboutUs = () => {
  const stats = [
    { number: "10,000+", label: "Lives Impacted", icon: <Heart size={24} /> },
    {
      number: "5,000+",
      label: "Successful Campaigns",
      icon: <Target size={24} />,
    },
    { number: "₹50M+", label: "Funds Raised", icon: <Globe size={24} /> },
    { number: "25,000+", label: "Active Donors", icon: <Users size={24} /> },
  ];

  const values = [
    {
      icon: <Heart size={32} />,
      title: "Compassion",
      description:
        "We believe in the power of human kindness and the impact it can create when channeled towards meaningful causes.",
    },
    {
      icon: <Shield size={32} />,
      title: "Trust & Transparency",
      description:
        "Every donation is tracked, every campaign is verified, and every rupee is accounted for with complete transparency.",
    },
    {
      icon: <Users size={32} />,
      title: "Community",
      description:
        "Building bridges between those who need help and those willing to help, creating a stronger, more connected society.",
    },
    {
      icon: <Award size={32} />,
      title: "Impact",
      description:
        "Measuring success not just in funds raised, but in lives transformed and communities strengthened.",
    },
  ];

  const team = [
    {
      name: "Mubhin Basnet",
      role: "Founder & CEO",
      image: "https://source.unsplash.com/200x200/?businesswoman,indian",
      description:
        "Passionate about social impact with 10+ years in fintech and social ventures.",
    },
    {
      name: "Ronij Joshi",
      role: "Chief Technology Officer",
      image: "https://source.unsplash.com/200x200/?businessman,indian,tech",
      description:
        "Tech innovator focused on building secure, scalable platforms for social good.",
    },
    {
      name: "Aryan Pandey",
      role: "Head of Operations",
      image: "https://source.unsplash.com/200x200/?professional,woman,indian",
      description:
        "Ensuring seamless operations and exceptional experience for all our users.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1
              className="text-5xl font-bold mb-6"
              style={{ color: "#0B4F6C" }}
            >
              <span className="font-bold text-gray-900">Funding</span>
              <span className="font-bold text-green-600">Rupee</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering dreams, one rupee at a time. We're Nepal's trusted
              crowdfunding platform connecting generous hearts with meaningful
              causes across the nation.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <img
              src="https://source.unsplash.com/1200x600/?community,helping,india,charity"
              alt="Community helping each other"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="flex justify-center mb-4"
                  style={{ color: "#0B4F6C" }}
                >
                  {stat.icon}
                </div>
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#0B4F6C" }}
                >
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "#0B4F6C" }}
              >
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At fundingRupee, we believe that every person deserves a chance
                to overcome life's challenges with dignity. Our mission is to
                democratize fundraising in India, making it simple, secure, and
                accessible for everyone.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether it's a medical emergency, educational dreams, social
                causes, or community projects, we provide the platform and tools
                needed to turn compassion into action.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                  <div className="w-10 h-10 rounded-full bg-green-500"></div>
                  <div className="w-10 h-10 rounded-full bg-purple-500"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-500"></div>
                </div>
                <span className="text-gray-600">
                  Join thousands of changemakers
                </span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://source.unsplash.com/600x500/?hands,helping,india,donation"
                alt="Helping hands"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "#0B4F6C" }}
            >
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at fundingRupee
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="flex-shrink-0 p-3 rounded-xl"
                    style={{ backgroundColor: "#0B4F6C20", color: "#0B4F6C" }}
                  >
                    {value.icon}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#0B4F6C" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "#0B4F6C" }}
            >
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate individuals working together to make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#0B4F6C" }}
                >
                  {member.name}
                </h3>
                <p className="text-gray-500 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      <Footer />
    </div>
  );
};

export default AboutUs;
