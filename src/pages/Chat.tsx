
import React from 'react';
import Layout from '@/components/Layout';
import Chat from '@/components/Chat';

const ChatPage: React.FC = () => {
  return (
    <Layout>
      <div className="saas-container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-medium mb-2">AI Financial Assistant</h1>
          <p className="text-muted-foreground mb-6">
            Ask me anything about personal finance, investments, budgeting, or any financial concerns you have.
          </p>
          
          <div className="saas-card bg-card/50 border border-border/30 p-0 overflow-hidden">
            <Chat className="h-[600px]" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
