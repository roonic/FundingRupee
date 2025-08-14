import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm = ({
  formData,
  onChange,
  onSubmit,
  showPassword,
  togglePassword,
  switchToSignup,
  loading,
  errorMsg,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-gray-900">Funding</span>
          <span className="text-3xl font-bold text-green-600">Rupee</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Sign in to continue making a difference</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3 h-5 w-5 text-gray-400"
              disabled={loading}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className={`w-full bg-green-600 text-white py-3 px-4 rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {errorMsg && (
          <p className="text-red-600 text-center text-sm mt-4">{errorMsg}</p>
        )}

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={switchToSignup}
            className="text-green-600 font-medium"
            disabled={loading}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
