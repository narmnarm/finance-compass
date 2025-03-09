
import React from 'react';
import Layout from '@/components/Layout';
import Chat from '@/components/Chat';

const ChatPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AI Financial Assistant</h1>
          <p className="text-muted-foreground mb-6">
            Ask me anything about personal finance, investments, budgeting, or any financial concerns you have.
          </p>
          
          <Chat className="h-[600px]" />
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
