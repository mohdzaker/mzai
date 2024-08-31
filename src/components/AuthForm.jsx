"use client";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-toastify';

const register = async (formData) => {
  const url = '/api/register';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Function to handle login
const login = async (formData) => {
  const url = '/api/login';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (formFor === 'Signup') {
          setLoading(true)
          const res = await register(formData);
          if (res.status == 200) {
            setLoading(false)
            toast.success(res.message);
          } else {
            setLoading(false)
            toast.error(res.message);
          }
        } else if (formFor === 'Signin') {
          setLoading(true)
          const res = await login(formData);
          if (res.status == 200) {
            setLoading(false)
            toast.success(res.message);
          } else {
            setLoading(false)
            toast.error(res.message);
          }
        }
      } catch (error) {
        console.error('Error during form submission:', error);
      }
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
