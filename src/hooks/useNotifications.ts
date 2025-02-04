import { useState, useEffect } from 'react';
import { format, addDays, isBefore } from 'date-fns';
import { TenantDetails, TenantNotification } from '../types/tenant';

export const useNotifications = (
  tenant: TenantDetails,
  initialNotifications: TenantNotification[]
) => {
  const [notifications, setNotifications] = useState<TenantNotification[]>(initialNotifications);

  useEffect(() => {
    const today = new Date();
    const nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), tenant.rentDueDay);
    
    if (isBefore(nextPaymentDate, today)) {
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }

    const daysBefore = addDays(nextPaymentDate, -1);
    
    if (isBefore(today, nextPaymentDate) && !isBefore(today, daysBefore)) {
      const newNotification: TenantNotification = {
        id: Date.now().toString(),
        type: 'payment_due',
        content: 'Rent payment due tomorrow',
        date: format(new Date(), 'yyyy-MM-dd'),
        read: false,
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
  }, [tenant.rentDueDay]);

  return {
    notifications,
    setNotifications,
  };
};

export default useNotifications;