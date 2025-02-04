import { useMemo } from 'react';
import { Payment, Tenant } from '../types';

export const usePayments = (
  payments: Payment[],
  selectedMonth: Date,
  selectedPropertyFilter: string,
  tenants: Tenant[]
) => {
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      const matchesMonth = paymentDate.getMonth() === selectedMonth.getMonth() &&
                          paymentDate.getFullYear() === selectedMonth.getFullYear();
      
      if (selectedPropertyFilter === 'all') {
        return matchesMonth;
      }

      const tenant = tenants.find(t => t.id === payment.tenantId);
      return matchesMonth && tenant?.propertyId === selectedPropertyFilter;
    });
  }, [payments, selectedMonth, selectedPropertyFilter, tenants]);

  const totalRevenue = useMemo(() => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  }, [payments]);

  return {
    filteredPayments,
    totalRevenue,
  };
};

export default usePayments;