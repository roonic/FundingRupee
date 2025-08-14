import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SmallNavbar from '../smallNavbar';
import api from '../../api/axios';

// Validation helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const showErrorToast = (message) => {
    setErrorMsg(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    setErrorMsg(null);

    const { email, password } = formData;

    if (!email || !password) {
      showErrorToast('Please enter email and password.');
      return;
    }

    if (!validateEmail(email)) {
      showErrorToast('Please enter a valid email.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/login', {
        email: email.trim(),
        password,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      showErrorToast(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setErrorMsg(null);
    const { fullName, email, password, confirmPassword, phone } = formData;

    if (!fullName || !email || !password || !confirmPassword || !phone) {
      showErrorToast('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      showErrorToast('Invalid email format.');
      return;
    }

    if (!validatePhone(phone)) {
      showErrorToast('Phone number must be 10 digits.');
      return;
    }

    if (password.length < 6) {
      showErrorToast('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        password,
        profileImageUrl: '',
        location: { district: '', country: '' },
        phone: phone.trim(),
      };

      const response = await api.post('/auth/register', payload);

      alert(response.data.message || 'Registered successfully. Please login.');
      setIsLogin(true);
      setFormData((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error(error);
      showErrorToast(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SmallNavbar />

      {/* Error Toast Popup */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md z-50 animate-fade-in-down">
          {errorMsg}
        </div>
      )}

      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        {isLogin ? (
          <LoginForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleLogin}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            switchToSignup={() => {
              setErrorMsg(null);
              setIsLogin(false);
            }}
            loading={loading}
            errorMsg={errorMsg}
          />
        ) : (
          <SignupForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSignup}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            toggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            switchToLogin={() => {
              setErrorMsg(null);
              setIsLogin(true);
            }}
            loading={loading}
            errorMsg={errorMsg}
          />
        )}
      </div>
    </>
  );
};

export default AuthPages;
