import React from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';

const SignupForm = ({
  formData,
  onChange,
  onSubmit,
  showPassword,
  showConfirmPassword,
  togglePassword,
  toggleConfirmPassword,
  switchToLogin
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Join the FundingRupee community</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              className="w-full pl-10 py-3 border rounded-lg"
              placeholder="Your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className="w-full pl-10 py-3 border rounded-lg"
              placeholder="Your phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full pl-10 py-3 border rounded-lg"
              placeholder="Your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full pl-10 pr-12 py-3 border rounded-lg"
              placeholder="Password"
              required
            />
            <button type="button" onClick={togglePassword} className="absolute right-3 top-3">
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              className="w-full pl-10 pr-12 py-3 border rounded-lg"
              placeholder="Confirm your password"
              required
            />
            <button type="button" onClick={toggleConfirmPassword} className="absolute right-3 top-3">
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={switchToLogin} className="text-green-600 font-medium">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
