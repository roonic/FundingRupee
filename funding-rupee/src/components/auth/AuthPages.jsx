import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SmallNavbar from '../smallNavbar';
import api from '../../api/axios';

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

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    setErrorMsg(null);

    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter email and password.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/login', {
        email: formData.email.trim(),
        password: formData.password,
      });

      // Redirect to the original page before login
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setErrorMsg(null);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone
    ) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        profileImageUrl: '',
        location: {
          district: '',
          country: '',
        },
        phone: formData.phone.trim(),
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
      setErrorMsg(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SmallNavbar />
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
