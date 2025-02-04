import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handle email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/tenant"); // Redirect to the tenant dashboard after login
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
      console.error("Login Error:", err);
    }
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await loginWithGoogle();
      navigate("/tenant"); // Redirect after Google sign-in to tenant dashboard
    } catch (err: any) {
      setError(err.message || "Google Sign-In failed. Try again later.");
      console.error("Google Sign-In Error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl mx-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Log in</h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 w-full h-10 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 w-full h-10 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link to="/forgot-password" className="absolute right-3 top-2 text-sm text-blue-600 hover:text-blue-800">
              Forgot?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors h-10 font-medium"
          >
            Login
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors h-10 font-medium"
        >
          Sign in with Google
        </button>

        {/* Signup Link */}
        <div className="text-gray-600 text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up!
          </Link>
        </div>

        {/* Admin Login Link */}
        <div className="text-center">
          <Link to="/adminlogin" className="text-blue-600 hover:text-blue-800 font-medium">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
