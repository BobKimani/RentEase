import React, { useState } from 'react';
import { TenantDetails, TenantProperty, TenantPayment, TenantMessage, TenantActiveTab } from '../types/tenant';
import TenantSidebar from './TenantSidebar';
import Overview from './Overview';
import PaymentHistory from './PaymentHistory';
import MessageList from './MessageList';
import PaymentModal from './PaymentModel';
import useNotifications from '../hooks/useNotifications';
import { mockTenant, mockProperty, mockPayments, mockMessages, mockNotifications } from '../data/mockTenantData';

const TenantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TenantActiveTab>('overview');
  const [tenant] = useState<TenantDetails>(mockTenant);
  const [property] = useState<TenantProperty>(mockProperty);
  const [payments] = useState<TenantPayment[]>(mockPayments);
  const [messages, setMessages] = useState<TenantMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank'>('mpesa');
  const [isLoading, setIsLoading] = useState(false);

  const { notifications } = useNotifications(tenant, mockNotifications);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: TenantMessage = {
        id: Date.now().toString(),
        senderId: tenant.id,
        receiverId: 'admin',
        content: newMessage,
        timestamp: new Date().toISOString(),
        isAdmin: false,
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentMethod === 'mpesa') {
        alert('Please check your phone for the M-Pesa payment prompt');
      } else {
        alert('Please use the following details for bank transfer:\nBank: Co-operative Bank\nAccount: 1234567890\nBranch: Main Branch');
      }
    } finally {
      setIsLoading(false);
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <TenantSidebar
          tenant={tenant}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <Overview
              tenant={tenant}
              property={property}
              notifications={notifications}
              onMakePayment={() => setShowPaymentModal(true)}
              onContactAdmin={() => setActiveTab('messages')}
            />
          )}
          {activeTab === 'payments' && (
            <PaymentHistory payments={payments} />
          )}
          {activeTab === 'messages' && (
            <MessageList
              messages={messages}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={tenant.rentAmount}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        onSubmit={handlePayment}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TenantDashboard;