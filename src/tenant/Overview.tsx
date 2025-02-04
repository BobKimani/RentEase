import React from 'react';
import { Home, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { TenantDetails, TenantProperty, TenantNotification } from '../types/tenant';
import NotificationList from './NotificationList';

interface OverviewProps {
  tenant: TenantDetails;
  property: TenantProperty;
  notifications: TenantNotification[];
  onMakePayment: () => void;
  onContactAdmin: () => void;
}

const Overview: React.FC<OverviewProps> = ({
  tenant,
  property,
  notifications,
  onMakePayment,
  onContactAdmin,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-48">
          <img
            src={property.imageUrl}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold">{property.name}</h3>
            <p className="text-sm opacity-90">{property.address}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Home className="w-4 h-4 mr-2" />
                <span>Unit {tenant.unit}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Moved in: {format(new Date(tenant.moveInDate), 'MMM dd, yyyy')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>Rent: KSH {tenant.rentAmount}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Due Date: {tenant.rentDueDay}th of every month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onMakePayment}
          className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <DollarSign className="w-5 h-5" />
          <span>Make Payment</span>
        </button>
        <button
          onClick={onContactAdmin}
          className="p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Contact Admin</span>
        </button>
      </div>

      <NotificationList notifications={notifications} />
    </div>
  );
};

export default Overview;