"use client"
import { useState } from 'react';
import Link from 'next/link';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
    } else if (!validateEmail(email)) {
      setError('Email address is invalid');
    } else {
      // Simulate a password reset request
      setError('');
      setSuccess('Password reset link has been sent to your email address.');
      setEmail('');
    }
  };

  return (
    <main className="w-full min-h-screen bg-black flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <form
        className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-black mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
          {success && <p className="text-green-500 text-xs italic mt-1">{success}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200 mb-4"
        >
          Send Reset Link
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Remembered your password?{' '}
            <Link href="/signin" className="text-black font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default ForgotPasswordForm;
