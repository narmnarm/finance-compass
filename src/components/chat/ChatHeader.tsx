
import React from 'react';
import { Bot } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/30 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-albert-700/50 flex items-center justify-center">
          <Bot size={16} className="text-albert-300" />
        </div>
        <div>
          <h3 className="font-medium">Albert Assistant</h3>
          <p className="text-xs text-muted-foreground">Powered by Gemini AI</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
