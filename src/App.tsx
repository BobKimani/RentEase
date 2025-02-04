import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {Building2, Users, CreditCard, Bell, ArrowRight} from 'lucide-react';
import { AuthProvider } from './components/contexts/AuthContext';
import Login from './components/Auth/Login';
import Adminlogin from './components/Auth/Adminlogin';
import Signup from './components/Auth/Signup';
import Admin from './components/Admin';
import Tenant from './components/Tenant';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-white" />
              <span className="ml-2 text-2xl font-bold text-white">RentEase</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-white hover:text-blue-200">Features</a>
              <a href="#how-it-works" className="text-white hover:text-blue-200">How it Works</a>
              <a href="#pricing" className="text-white hover:text-blue-200">Pricing</a>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-blue-600 bg-white rounded-lg hover:bg-blue-50"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600"
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Simplify Your Rental Management
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                The all-in-one platform for landlords and tenants. Manage properties, payments, and communications in one place.
              </p>
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold flex items-center hover:bg-blue-50">
                Get Started <ArrowRight className="ml-2" />
              </button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Modern apartment building"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Everything You Need in One Platform
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Users className="h-8 w-8 text-blue-600" />}
              title="User Management"
              description="Separate portals for landlords and tenants with secure authentication and profile management."
            />
            <FeatureCard
              icon={<CreditCard className="h-8 w-8 text-blue-600" />}
              title="Direct Payments"
              description="Integrated payment system for hassle-free rent collection and automatic payment tracking."
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-blue-600" />}
              title="Smart Notifications"
              description="Automated reminders for rent dues and instant payment confirmations."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20" id="how-it-works">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Step number="1" title="Create Your Account" description="Sign up as a landlord or tenant and complete your profile." />
              <Step number="2" title="Connect Properties" description="Add your properties or connect with your landlord." />
              <Step number="3" title="Manage Payments" description="Set up automatic payments or pay rent directly through the platform." />
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Person using laptop"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Streamline Your Rental Management?
          </h2>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6" />
                <span className="ml-2 text-xl font-bold">RentEase</span>
              </div>
              <p className="text-gray-400">
                Simplifying property management for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RentEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface StepProps {
  number: string;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tenant" element={<Tenant />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
