
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Message } from '@/types/chat';

export function useChat(initialSystemMessage: string, initialPrompt?: string) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: initialSystemMessage,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, []);

  // Get context based on current page
  const getContextPrompt = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') {
      return "The user is viewing their financial dashboard with spending breakdowns, net worth, and investment performance. Provide insights specific to their financial overview.";
    } else if (path === '/credit-analysis') {
      return "The user is viewing their credit analysis page which shows their credit score, factors affecting it, and improvement recommendations. Provide insights related to credit health.";
    } else if (path === '/transactions') {
      return "The user is viewing their transactions history with categorized spending and savings patterns. Help them understand their spending habits.";
    } else if (path === '/chat') {
      return "The user is on the main chat page where they can ask any financial questions. Provide comprehensive assistance about personal finance management.";
    } else {
      return "The user is on the Albert financial management platform. Provide general assistance about personal finance management.";
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const contextPrompt = getContextPrompt();
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': 'AIzaSyDdP1lp5mtes6xJtUe0EDSrTGiG0sxzzsw',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: `You are Albert's friendly AI assistant for a personal finance management platform. ${contextPrompt}\n\nUser question: ${messageText}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.candidates[0].content.parts[0].text || "I'm sorry, I couldn't process that request.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      toast({
        title: "AI Assistant Error",
        description: "There was a problem connecting to the AI service. Please try again.",
        variant: "destructive",
      });
      
      setMessages(prev => [
        ...prev, 
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage: handleSendMessage
  };
}
