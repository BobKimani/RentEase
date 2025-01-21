import React from 'react';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl mx-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Log in</h1>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email address" 
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
            <button 
              className="absolute right-3 top-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot?
            </button>
          </div>
        </div>
        
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors h-10 font-medium"
        >
          Login to your account
        </button>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="remember" 
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600">Remember me</label>
          </div>
          
          <div className="text-gray-600">
            New here?{''} 
            <button 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              <a href="/Signup">Sign up!</a>       
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;