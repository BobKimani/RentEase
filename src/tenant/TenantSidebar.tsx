import React from 'react';
import { Home, CreditCard, MessageSquare } from 'lucide-react';
import { TenantDetails, TenantActiveTab } from '../types/tenant';

interface TenantSidebarProps {
  tenant: TenantDetails;
  activeTab: TenantActiveTab;
  onTabChange: (tab: TenantActiveTab) => void;
}

const TenantSidebar: React.FC<TenantSidebarProps> = ({ tenant, activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-white min-h-screen shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Portal</h1>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {tenant.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="font-semibold">{tenant.name}</h2>
            <p className="text-sm text-gray-500">{tenant.email}</p>
          </div>
        </div>
        <nav className="space-y-2">
          {[
            { id: 'overview', icon: Home, label: 'Overview' },
            { id: 'payments', icon: CreditCard, label: 'Payments' },
            { id: 'messages', icon: MessageSquare, label: 'Messages' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id as TenantActiveTab)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default TenantSidebar;