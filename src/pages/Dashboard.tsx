
import React from 'react';
import Layout from '@/components/Layout';
import DashboardComponent from '@/components/Dashboard';
import TransactionList from '@/components/TransactionList';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6">
        <DashboardComponent />
        
        <div className="mt-8">
          <TransactionList />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
