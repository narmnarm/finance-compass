
import React from 'react';
import { ChatProps } from '@/types/chat';
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import ChatInput from './chat/ChatInput';
import { useChat } from '@/hooks/useChat';

const Chat: React.FC<ChatProps> = ({ 
  initialPrompt,
  initialSystemMessage = "Hello! I'm Albert's AI assistant. How can I help you with your financial journey today?",
  className = "" 
}) => {
  const { messages, isLoading, sendMessage } = useChat(initialSystemMessage, initialPrompt);

  return (
    <div className={`flex flex-col ${className} bg-background/80 backdrop-blur-md rounded-lg border border-border shadow-xl`}>
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} initialPrompt={initialPrompt} />
    </div>
  );
};

export default Chat;
