
import React from 'react';
import Layout from '@/components/Layout';
import DashboardComponent from '@/components/Dashboard';
import TransactionList from '@/components/TransactionList';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="saas-container py-8">
        <h1 className="font-medium mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          View your financial insights and recent transactions at a glance.
        </p>
        
        <DashboardComponent />
        
        <div className="mt-10 border-t border-border/30 pt-8">
          <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
          <TransactionList />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
