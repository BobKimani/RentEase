export interface TenantDetails {
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
  
  export interface TenantProperty {
    id: string;
    name: string;
    address: string;
    imageUrl: string;
  }
  
  export interface TenantPayment {
    id: string;
    amount: number;
    date: string;
    method: 'mpesa' | 'bank';
    status: 'completed' | 'pending' | 'failed';
    reference: string;
  }
  
  export interface TenantMessage {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
    isAdmin: boolean;
  }
  
  export interface TenantNotification {
    id: string;
    type: 'payment_due' | 'payment_overdue' | 'message';
    content: string;
    date: string;
    read: boolean;
  }
  
  export type TenantActiveTab = 'overview' | 'payments' | 'messages';