
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from 'lucide-react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  initialPrompt?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, initialPrompt = '' }) => {
  const [input, setInput] = useState(initialPrompt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about your finances..."
        className="flex-1"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !input.trim()} 
        className="bg-albert-600 text-white hover:bg-albert-700"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default ChatInput;
