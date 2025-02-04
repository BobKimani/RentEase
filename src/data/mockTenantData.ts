import {
    TenantDetails,
    TenantProperty,
    TenantPayment,
    TenantMessage,
    TenantNotification
  } from '../types/tenant';
  
  export const mockTenant: TenantDetails = {
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
  
  export const mockProperty: TenantProperty = {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Main St, City',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  };
  
  export const mockPayments: TenantPayment[] = [
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
  
  export const mockMessages: TenantMessage[] = [
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
  
  export const mockNotifications: TenantNotification[] = [
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