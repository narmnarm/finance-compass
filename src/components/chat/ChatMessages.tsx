
import React, { useRef, useEffect } from 'react';
import { Loader2, Bot } from 'lucide-react';
import MessageItem from './MessageItem';
import { Message } from '@/types/chat';

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div className="flex gap-3">
          <div className="h-8 w-8 rounded-full bg-albert-700 flex items-center justify-center">
            <Bot size={16} className="text-albert-300" />
          </div>
          <div className="max-w-[75%] p-3 rounded-lg bg-secondary text-foreground">
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <p className="text-sm">Albert is thinking...</p>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
