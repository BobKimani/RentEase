import React, { useState, useMemo } from 'react';
import { Building2, Users, MessageSquare, FileText, Plus, Search, Download, CheckCircle2, Clock, AlertCircle, Trash2, Home, User, History, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Types remain the same
interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  image: File | null;
  imageUrl: string;
}

interface Tenant {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  unit: string;
  rentAmount: number;
  moveInDate: string;
}

interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

interface AdminProfile {
  name: string;
  email: string;
  imageUrl: string | null;
}

// Updated PDF Document Component with property details and total revenue
const PaymentReport = ({ payments, tenants, properties }: { 
  payments: Payment[], 
  tenants: Tenant[],
  properties: Property[] 
}) => {
  // Calculate total revenue per property
  const propertyRevenue = payments.reduce((acc, payment) => {
    const tenant = tenants.find(t => t.id === payment.tenantId);
    if (tenant) {
      const propertyId = tenant.propertyId;
      acc[propertyId] = (acc[propertyId] || 0) + payment.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Report</Text>
          <Text style={styles.date}>{format(new Date(), 'MMMM dd, yyyy')}</Text>
        </View>

        {/* Property Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Summary</Text>
          {Object.entries(propertyRevenue).map(([propertyId, revenue]) => {
            const property = properties.find(p => p.id === propertyId);
            return (
              <View key={propertyId} style={styles.propertySummary}>
                <Text style={styles.propertyName}>{property?.name}</Text>
                <Text style={styles.propertyRevenue}>Total Revenue: KSH {revenue}</Text>
              </View>
            );
          })}
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Tenant</Text>
              <Text style={styles.tableCell}>Property</Text>
              <Text style={styles.tableCell}>Unit</Text>
              <Text style={styles.tableCell}>Amount</Text>
              <Text style={styles.tableCell}>Date</Text>
              <Text style={styles.tableCell}>Status</Text>
            </View>
            {payments.map((payment) => {
              const tenant = tenants.find(t => t.id === payment.tenantId);
              const property = properties.find(p => p.id === tenant?.propertyId);
              return (
                <View key={payment.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{tenant?.name}</Text>
                  <Text style={styles.tableCell}>{property?.name}</Text>
                  <Text style={styles.tableCell}>{tenant?.unit}</Text>
                  <Text style={styles.tableCell}>KSH {payment.amount}</Text>
                  <Text style={styles.tableCell}>{format(new Date(payment.date), 'MMM dd, yyyy')}</Text>
                  <Text style={[styles.tableCell, styles[payment.status]]}>
                    {payment.status.toUpperCase()}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Total Revenue */}
        <View style={styles.footer}>
          <Text style={styles.totalRevenue}>
            Total Revenue: KSH {Object.values(propertyRevenue).reduce((a, b) => a + b, 0)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  propertySummary: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  propertyName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  propertyRevenue: {
    fontSize: 12,
    color: '#666',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#bfbfbf',
  },
  totalRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completed: {
    color: '#10b981',
  },
  pending: {
    color: '#f59e0b',
  },
});

// Mock data remains the same
const mockProperties: Property[] = [
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

const mockTenants: Tenant[] = [
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

const mockPayments: Payment[] = [
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

type ActiveView = 'profile' | 'properties' | 'tenants' | 'history';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('profile');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(2025, 0));
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState<string>('all');
  const [profile, setProfile] = useState<AdminProfile>({
    name: 'Admin User',
    email: 'admin@example.com',
    imageUrl: null,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    units: 0,
    image: null as File | null,
    imageUrl: '',
  });

  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    unit: '',
    rentAmount: 0,
    moveInDate: '',
  });

  const totalRevenue = useMemo(() => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  }, [payments]);

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

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, imageUrl }));
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProperty({
        ...newProperty,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const newPropertyData: Property = {
      id: String(properties.length + 1),
      ...newProperty,
    };
    setProperties([...properties, newPropertyData]);
    setShowAddProperty(false);
    setNewProperty({ name: '', address: '', units: 0, image: null, imageUrl: '' });
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProperty) {
      const newTenantData: Tenant = {
        id: String(tenants.length + 1),
        propertyId: selectedProperty.id,
        ...newTenant,
      };
      setTenants([...tenants, newTenantData]);
      setShowAddTenant(false);
      setNewTenant({ name: '', email: '', unit: '', rentAmount: 0, moveInDate: '' });
    }
  };

  const handleDeleteTenant = (tenantId: string) => {
    setTenants(tenants.filter(tenant => tenant.id !== tenantId));
  };

  const handleSendMessage = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant && messageText.trim()) {
      alert(`Message sent to ${tenant.name}: ${messageText}`);
      setMessageText('');
    }
  };

  const getTenantsForProperty = (propertyId: string) => {
    return tenants.filter(tenant => tenant.propertyId === propertyId);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {isEditingProfile ? (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full overflow-hidden">
                      {profile.imageUrl ? (
                        <img 
                          src={profile.imageUrl} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                          <User className="h-10 w-10 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="block w-full rounded-lg border-blue-200 mb-2"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="block w-full rounded-lg border-blue-200"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-semibold text-blue-900">Profile</h2>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden">
                    {profile.imageUrl ? (
                      <img 
                        src={profile.imageUrl} 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900">{profile.name}</h3>
                    <p className="text-blue-600">{profile.email}</p>
                  </div>
                </div>
              </>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Properties Managed</h4>
                <p className="text-2xl font-bold text-blue-600">{properties.length}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Total Revenue</h4>
                <p className="text-2xl font-bold text-blue-600">KSH {totalRevenue}</p>
              </div>
            </div>
          </div>
        );

      case 'properties':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-900">Properties</h2>
              <button
                onClick={() => setShowAddProperty(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => setSelectedProperty(property)}
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                    selectedProperty?.id === property.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="relative h-48">
                    <img
                      src={property.imageUrl}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">{property.name}</h3>
                      <p className="text-sm opacity-90">{property.address}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center text-blue-800">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">{property.units} units</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tenants':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-900">Tenants</h2>
              {selectedProperty && (
                <button
                  onClick={() => setShowAddTenant(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tenant
                </button>
              )}
            </div>
            {!selectedProperty ? (
              <div className="text-center py-8 text-blue-500">
                Please select a property to manage its tenants
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-blue-100">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Rent Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Move In Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-50">
                    {getTenantsForProperty(selectedProperty.id).map((tenant) => (
                      <tr
                        key={tenant.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {tenant.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-blue-900">
                                {tenant.name}
                              </div>
                              <div className="text-sm text-blue-500">{tenant.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">
                          {tenant.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            KSH {tenant.rentAmount}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">
                          {format(new Date(tenant.moveInDate), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                          <button
                            onClick={() => {
                              const message = prompt(`Send message to ${tenant.name}:`);
                              if (message) {
                                setMessageText(message);
                                handleSendMessage(tenant.id);
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                          >
                            <MessageSquare className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTenant(tenant.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-150"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-900">Payment History</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedPropertyFilter}
                  onChange={(e) => setSelectedPropertyFilter(e.target.value)}
                  className="rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Properties</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>{property.name}</option>
                  ))}
                </select>
                <input
                  type="month"
                  defaultValue="2025-01"
                  onChange={(e) => {
                    const [year, month] = e.target.value.split('-');
                    setSelectedMonth(new Date(parseInt(year), parseInt(month) - 1));
                  }}
                  className="rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <PDFDownloadLink
                  document={<PaymentReport payments={filteredPayments} tenants={tenants} properties={properties} />}
                  fileName={`payment-report-${format(selectedMonth, 'MMM-yyyy')}.pdf`}
                >
                  {({ loading }) => (
                    <button
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                      disabled={loading}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
            <div className="space-y-4">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => {
                  const tenant = tenants.find(t => t.id === payment.tenantId);
                  const property = properties.find(p => p.id === tenant?.propertyId);
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100 shadow-sm"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900">{tenant?.name}</p>
                        <p className="text-sm text-blue-600">
                          {property?.name} - Unit {tenant?.unit}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900">KSH {payment.amount}</p>
                        <p className="text-sm text-blue-600">
                          {format(new Date(payment.date), 'MMMM dd, yyyy')}
                        </p>
                      </div>
                      <div className={`flex items-center ${
                        payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {payment.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                        ) : (
                          <Clock className="w-5 h-5 mr-2" />
                        )}
                        <span className="capitalize font-medium">{payment.status}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-blue-500">
                  No payments found for {format(selectedMonth, 'MMMM yyyy')}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen shadow-lg">
          <div className="p-6 border-b border-blue-100">
            <h1 className="text-2xl font-bold text-blue-900">Admin Panel</h1>
          </div>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveView('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeView === 'profile' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveView('properties')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeView === 'properties' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Properties</span>
            </button>
            <button
              onClick={() => setActiveView('tenants')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeView === 'tenants' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
              }`}
            >
              <Users className="w -5 h-5" />
              <span>Tenants</span>
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeView === 'history' ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-50'
              }`}
            >
              <History className="w-5 h-5" />
              <span>Payment History</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 bg-blue-900/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Add New Property</h3>
            <form onSubmit={handleAddProperty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800">Name</label>
                <input
                  type="text"
                  value={newProperty.name}
                  onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Address</label>
                <input
                  type="text"
                  value={newProperty.address}
                  onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Units</label>
                <input
                  type="number"
                  value={newProperty.units}
                  onChange={(e) => setNewProperty({ ...newProperty, units: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Property Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-blue-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddProperty(false)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {showAddTenant && selectedProperty && (
        <div className="fixed inset-0 bg-blue-900/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">
              Add New Tenant to {selectedProperty.name}
            </h3>
            <form onSubmit={handleAddTenant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800">Name</label>
                <input
                  type="text"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Email</label>
                <input
                  type="email"
                  value={newTenant.email}
                  onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Unit</label>
                <input
                  type="text"
                  value={newTenant.unit}
                  onChange={(e) => setNewTenant({ ...newTenant, unit: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Rent Amount (KSH)</label>
                <input
                  type="number"
                  value={newTenant.rentAmount}
                  onChange={(e) => setNewTenant({ ...newTenant, rentAmount: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800">Move In Date</label>
                <input
                  type="date"
                  value={newTenant.moveInDate}
                  onChange={(e) => setNewTenant({ ...newTenant, moveInDate: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddTenant(false)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;