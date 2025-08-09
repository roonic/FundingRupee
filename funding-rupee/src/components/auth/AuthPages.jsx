import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SmallNavbar from '../smallNavbar';
const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = () => {
    // TODO: Call login API here
    console.log('Login with', formData);
  };

  const handleSignup = () => {
    // TODO: Call signup API here
    console.log('Signup with', formData);
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
          switchToSignup={() => setIsLogin(false)}
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
          switchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
    </>
  );
};

export default AuthPages;
