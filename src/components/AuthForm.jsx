"use client";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

const AuthForm = ({ formFor }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (formFor === 'Signup') {
      if (!formData.name) newErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formFor === 'Signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed with form submission
    }
  };

  return (
    <main className="w-full min-h-screen bg-black flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <form
        className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-black mb-2">
            {formFor === 'Signup' ? 'Create Your Account' : 'Sign In to Your Account'}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {formFor === 'Signup'
              ? 'Join us and start your journey with Mz AI!'
              : 'Welcome back! Please log in to continue.'}
          </p>
        </div>

        {formFor === 'Signup' && (
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 border rounded outline-none text-gray-800 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded outline-none text-gray-800 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className={`w-full px-4 py-2 border rounded outline-none text-gray-800 pr-12 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 mt-6"
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </button>
          {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
        </div>

        {formFor === 'Signup' && (
          <div className="mb-6 relative">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 border rounded outline-none text-gray-800 pr-12 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 mt-6"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
          </div>
        )}

        {formFor === 'Signin' && (
          <div className="mb-6">
            <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm block text-right mb-4">
              Forgot Password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200 mb-4"
        >
          {formFor === 'Signup' ? 'Sign Up' : 'Log In'}
        </button>

        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm sm:text-base mb-4">Or</p>
          <Link
            href="#"
            className="flex items-center justify-center border border-gray-300 rounded px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2"
              aria-labelledby="google-signin-title google-signin-desc"
              role="img"
            >
              <title id="google-signin-title">Sign in with Google</title>
              <desc id="google-signin-desc">Google G Logo</desc>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                className="fill-[#4285F4]"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                className="fill-[#34A853]"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                className="fill-[#FBBC05]"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                className="fill-[#EA4335]"
              ></path>
            </svg>
            Sign in with Google
          </Link>
        </div>

        <div className="mt-6 text-center">
          {formFor === 'Signup' ? (
            <p className="text-gray-600 text-sm sm:text-base">
              Already have an account?{' '}
              <Link href="/signin" className="text-black font-bold hover:underline">
                Sign In
              </Link>
            </p>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-black font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default AuthForm;
