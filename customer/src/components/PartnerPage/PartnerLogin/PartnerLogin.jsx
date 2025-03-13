import React, { useState } from 'react';

const PartnerLogin = () => {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', credentials);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header Section */}
        <div className="bg-emerald-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Partner login</h1>
          <p className="text-sm opacity-90">
            Please login to manage your properties or register your services to be listed under mayi farms
          </p>
        </div>

        {/* Farm Image Section */}
        <div className="relative h-48">
          <div className="absolute inset-0 bg-emerald-500">
            <img
              src="/api/placeholder/800/400"
              alt="Farm landscape"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold">mayi</h2>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <input
              type="text"
              name="userId"
              placeholder="User Id (email / phone)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={credentials.userId}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <div className="text-sm text-gray-600">
            <span>Not registered yet?</span>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition duration-200"
          >
            Sign up
          </button>

          <div className="text-right text-sm text-emerald-600">
            Let's Work Together
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerLogin;