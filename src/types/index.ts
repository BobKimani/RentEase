// Common Types
export interface Property {
    id: string;
    name: string;
    address: string;
    units: number;
    image: File | null;
    imageUrl: string;
  }
  
  export interface Tenant {
    id: string;
    propertyId: string;
    name: string;
    email: string;
    unit: string;
    rentAmount: number;
    moveInDate: string;
  }
  
  export interface Payment {
    id: string;
    tenantId: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending';
  }
  
  export interface AdminProfile {
    name: string;
    email: string;
    imageUrl: string | null;
  }
  
  export type ActiveView = 'profile' | 'properties' | 'tenants' | 'history';