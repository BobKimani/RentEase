import React from 'react';
import { Clock, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { TenantNotification } from '../types/tenant';

interface NotificationListProps {
  notifications: TenantNotification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg flex items-start space-x-3 ${
              notification.type === 'payment_due'
                ? 'bg-yellow-50 text-yellow-800'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            {notification.type === 'payment_due' ? (
              <Clock className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Bell className="w-5 h-5 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">{notification.content}</p>
              <p className="text-sm opacity-75">
                {format(new Date(notification.date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;