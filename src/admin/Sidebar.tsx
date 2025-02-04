import React from 'react';
import { User, Building2, Users, History } from 'lucide-react';
import { ActiveView } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="w-64 bg-white min-h-screen shadow-lg">
      <div className="p-6 border-b border-blue-100">
        <h1 className="text-2xl font-bold text-blue-900">Admin Panel</h1>
      </div>
      <nav className="p-4 space-y-2">
        <button
          onClick={() => onViewChange('profile')}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            activeView === 'profile' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <button
          onClick={() => onViewChange('properties')}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            activeView === 'properties' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span>Properties</span>
        </button>
        <button
          onClick={() => onViewChange('tenants')}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            activeView === 'tenants' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Tenants</span>
        </button>
        <button
          onClick={() => onViewChange('history')}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            activeView === 'history' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
          }`}
        >
          <History className="w-5 h-5" />
          <span>Payment History</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;