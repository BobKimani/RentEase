import React, { useState, useEffect } from 'react';
import { 
  Home, 
  MessageSquare, 
  CreditCard, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  Phone,
  Building2,
  Calendar,
  DollarSign,
  Bell
} from 'lucide-react';
import { format, addDays, isBefore } from 'date-fns';

// Types
interface TenantDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  unit: string;
  rentAmount: number;
  moveInDate: string;
  rentDueDay: number;
}

interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  method: 'mpesa' | 'bank';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
}

interface Notification {
  id: string;
  type: 'payment_due' | 'payment_overdue' | 'message';
  content: string;
  date: string;
  read: boolean;
}

// Mock data
const mockTenant: TenantDetails = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+254712345678',
  propertyId: '1',
  unit: '101',
  rentAmount: 15000,
  moveInDate: '2024-01-15',
  rentDueDay: 5,
};

const mockProperty: Property = {
  id: '1',
  name: 'Sunset Apartments',
  address: '123 Main St, City',
  imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
};

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 15000,
    date: '2024-03-01',
    method: 'mpesa',
    status: 'completed',
    reference: 'MPESA123456',
  },
  {
    id: '2',
    amount: 15000,
    date: '2024-02-01',
    method: 'bank',
    status: 'completed',
    reference: 'COOP789012',
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: 'admin',
    content: 'The bathroom tap is leaking.',
    timestamp: '2024-03-10T10:00:00',
    isAdmin: false,
  },
  {
    id: '2',
    senderId: 'admin',
    receiverId: '1',
    content: 'We\'ll send a plumber tomorrow morning.',
    timestamp: '2024-03-10T10:05:00',
    isAdmin: true,
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'payment_due',
    content: 'Rent payment due in 2 days',
    date: '2024-03-03',
    read: false,
  },
  {
    id: '2',
    type: 'message',
    content: 'New message from admin',
    date: '2024-03-02',
    read: true,
  },
];

const TenantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'messages'>('overview');
  const [tenant] = useState<TenantDetails>(mockTenant);
  const [property] = useState<Property>(mockProperty);
  const [payments] = useState<Payment[]>(mockPayments);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [newMessage, setNewMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank'>('mpesa');
  const [isLoading, setIsLoading] = useState(false);

  // Check for upcoming and overdue payments
  useEffect(() => {
    const today = new Date();
    const nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), tenant.rentDueDay);
    
    if (isBefore(nextPaymentDate, today)) {
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }

    const daysBefore = addDays(nextPaymentDate, -1);
    
    if (isBefore(today, nextPaymentDate) && !isBefore(today, daysBefore)) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'payment_due',
        content: 'Rent payment due tomorrow',
        date: format(new Date(), 'yyyy-MM-dd'),
        read: false,
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
  }, [tenant.rentDueDay]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
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
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentMethod === 'mpesa') {
        // Simulate M-Pesa STK push
        alert('Please check your phone for the M-Pesa payment prompt');
      } else {
        // Show bank payment details
        alert('Please use the following details for bank transfer:\nBank: Co-operative Bank\nAccount: 1234567890\nBranch: Main Branch');
      }
    } finally {
      setIsLoading(false);
      setShowPaymentModal(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Property Details */}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowPaymentModal(true)}
          className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-5 h-5" />
          <span>Make Payment</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className="p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Contact Admin</span>
        </button>
      </div>

      {/* Recent Activity */}
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
    </div>
  );

  const renderPayments = () => (
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

  const renderMessages = () => (
    <div className="bg-white rounded-xl shadow-lg h-[calc(100vh-2rem)] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Messages</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isAdmin
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isAdmin ? 'text-gray-500' : 'text-blue-100'
              }`}>
                {format(new Date(message.timestamp), 'MMM dd, h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
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
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'payments'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Payments</span>
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'messages' && renderMessages()}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Make Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-4 rounded-lg border ${
                      paymentMethod === 'mpesa'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <Phone className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm font-medium">M-Pesa</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-lg border ${
                      paymentMethod === 'bank'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm font-medium">Bank Transfer</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={tenant.rentAmount}
                  readOnly
                  className="w-full rounded-lg border-gray-300 bg-gray-50"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Pay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;