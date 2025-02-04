import { Property, Tenant, Payment } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Main St, City',
    units: 24,
    image: null,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Ocean View Complex',
    address: '456 Beach Rd, Coast City',
    units: 16,
    image: null,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
];

export const mockTenants: Tenant[] = [
  {
    id: '1',
    propertyId: '1',
    name: 'John Doe',
    email: 'john@example.com',
    unit: '101',
    rentAmount: 15000,
    moveInDate: '2024-01-15',
  },
  {
    id: '2',
    propertyId: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    unit: '102',
    rentAmount: 18000,
    moveInDate: '2024-02-01',
  },
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    amount: 15000,
    date: '2025-01-01',
    status: 'completed',
  },
  {
    id: '2',
    tenantId: '2',
    amount: 18000,
    date: '2025-01-01',
    status: 'pending',
  },
];