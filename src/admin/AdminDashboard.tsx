import React, { useState } from 'react';
import { format } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Plus, MessageSquare, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { Property, Tenant, Payment, AdminProfile, ActiveView } from '../types';
import Sidebar from './Sidebar';
import Profile from './Profile';
import PropertyCard from './PropertyCard';
import PaymentReport from './PaymentReport';
import usePayments from '../hooks/usePayments';
import { mockProperties, mockTenants, mockPayments } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('profile');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(2025, 0));
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState<string>('all');
  const [profile, setProfile] = useState<AdminProfile>({
    name: 'Admin User',
    email: 'admin@example.com',
    imageUrl: null,
  });

  const { filteredPayments, totalRevenue } = usePayments(
    payments,
    selectedMonth,
    selectedPropertyFilter,
    tenants
  );

  // ... Rest of your handlers (handleAddProperty, handleAddTenant, etc.)

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return (
          <Profile
            profile={profile}
            onUpdateProfile={setProfile}
            propertiesCount={properties.length}
            totalRevenue={totalRevenue}
          />
        );

      case 'properties':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-900">Properties</h2>
              <button
                onClick={() => setShowAddProperty(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSelected={selectedProperty?.id === property.id}
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          </div>
        );

      // ... Rest of your view renders (tenants, history)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
      {/* ... Your modals */}
    </div>
  );
};

export default AdminDashboard;