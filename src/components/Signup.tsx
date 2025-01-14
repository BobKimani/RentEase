import React from 'react';
import { Mail, Lock, User, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl mx-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Join us to start managing your properties</p>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="pl-10 w-full h-10 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email address" 
              className="pl-10 w-full h-10 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Company Name (Optional)" 
              className="pl-10 w-full h-10 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Password" 
              className="pl-10 w-full h-10 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="pl-10 w-full h-10 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="terms" 
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <button className="text-blue-600 hover:text-blue-800">Terms of Service</button>
            {' '}and{' '}
            <button className="text-blue-600 hover:text-blue-800">Privacy Policy</button>
          </label>
        </div>
        
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors h-10 font-medium"
        >
          Create Account
        </button>
        
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            <a href="Login">Log in</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;