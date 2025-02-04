import React from 'react';
import { Phone, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { TenantPayment } from '../types/tenant';

interface PaymentHistoryProps {
  payments: TenantPayment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
        <div className="space-y-4">
          {payments.map(payment => (
            <div
              key={payment.id}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {payment.method === 'mpesa' ? (
                  <Phone className="w-5 h-5 text-green-600" />
                ) : (
                  <CreditCard className="w-5 h-5 text-blue-600" />
                )}
                <div>
                  <p className="font-medium">
                    KSH {payment.amount}
                    <span className="ml-2 text-sm text-gray-500">
                      via {payment.method === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(payment.date), 'MMMM dd, yyyy')}
                  </p>
                  <p className="text-sm text-gray-500">Ref: {payment.reference}</p>
                </div>
              </div>
              <div className={`flex items-center ${
                payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {payment.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;