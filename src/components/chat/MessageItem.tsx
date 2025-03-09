
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '@/types/chat';

type MessageItemProps = {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div
      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
    >
      {message.role === 'assistant' && (
        <div className="h-8 w-8 rounded-full bg-albert-700 flex-shrink-0 flex items-center justify-center">
          <Bot size={16} className="text-albert-300" />
        </div>
      )}
      
      <div className={`max-w-[75%] p-3 rounded-lg ${
        message.role === 'user'
          ? 'bg-accent/20 text-white ml-auto'
          : message.role === 'system'
          ? 'bg-secondary/80 text-foreground'
          : 'bg-secondary text-foreground'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-[10px] text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {message.role === 'user' && (
        <div className="h-8 w-8 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
