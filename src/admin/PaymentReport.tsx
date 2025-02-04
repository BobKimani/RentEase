import React from 'react';
import { format } from 'date-fns';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Payment, Tenant, Property } from '../types';

interface PaymentReportProps {
  payments: Payment[];
  tenants: Tenant[];
  properties: Property[];
}

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

const PaymentReport: React.FC<PaymentReportProps> = ({ payments, tenants, properties }) => {
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
                  <Text style={styles.tableCell}>
                    {format(new Date(payment.date), 'MMM dd, yyyy')}
                  </Text>
                  <Text style={[styles.tableCell, styles[payment.status]]}>
                    {payment.status.toUpperCase()}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.totalRevenue}>
            Total Revenue: KSH {Object.values(propertyRevenue).reduce((a, b) => a + b, 0)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentReport;