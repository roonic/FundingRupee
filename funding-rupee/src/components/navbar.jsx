import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../images/mainLogo.png";
import { User } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="FundingRupee" className="block h-16 w-auto md:hidden" />
            <div className="hidden md:flex items-center">
              <span className="text-xl font-bold text-gray-900">Funding</span>
              <span className="text-xl font-bold text-green-600">Rupee</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/fundraisers" className="text-gray-600 hover:text-gray-900">
              Donate
            </Link>
            <Link to="/start-fundraiser" className="text-gray-600 hover:text-gray-900">
              Fundraise
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center space-x-2 text-gray-800 font-medium px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <div className="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                    {getInitials(user.name)}
                  </div>
                  <span>{user.name}</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-10">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                  LogIn/SignUp
                </button>
              </Link>
            )}
          </nav>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-600"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden flex flex-col space-y-4 pb-4">
            <Link to="/fundraisers" className="text-gray-600 hover:text-gray-900">
              Donate
            </Link>
            <Link to="/start-fundraiser" className="text-gray-600 hover:text-gray-900">
              Fundraise
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  LogIn/SignUp
                </button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
