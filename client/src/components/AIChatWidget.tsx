import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onRecommendations?: (recommendations: any) => void;
}

export default function AIChatWidget({ isOpen, onClose, onRecommendations }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your Swervy AI assistant. I'm here to help you find the perfect self-care kit! 💖 What's your name?"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (messages: ChatMessage[]) => {
      const response = await apiRequest('POST', '/api/chat', { messages });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    },
    onError: () => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble connecting right now. Let me know what you'd like in your self-care kit!" 
      }]);
    }
  });

  const recommendationsMutation = useMutation({
    mutationFn: async (chatHistory: ChatMessage[]) => {
      const response = await apiRequest('POST', '/api/recommendations', { chatHistory });
      return response.json();
    },
    onSuccess: (recommendations) => {
      const recommendationMessage = `
        Based on our chat, here are my personalized recommendations for you: ✨

        💄 **Lip Shade:** ${recommendations.lipShade}
        🌸 **Scent:** ${recommendations.scent}
        👁️ **Lashes:** ${recommendations.lashes}
        💧 **Lip Oil:** ${recommendations.oil}

        **Special Extras:** ${recommendations.additionalItems.join(', ')}

        ${recommendations.reasoning}

        Ready to request your kit?
      `;
      
      setMessages(prev => [...prev, { role: 'assistant', content: recommendationMessage }]);
      onRecommendations?.(recommendations);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const newMessages = [...messages, userMessage];
    chatMutation.mutate(newMessages);

    // Check if we should generate recommendations (after a few exchanges)
    if (newMessages.length >= 8) {
      setTimeout(() => {
        recommendationsMutation.mutate(newMessages);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <CardHeader className="bg-gradient-to-r from-swervy-pink to-pink-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-swervy-pink font-bold text-sm">AI</span>
              </div>
              <div>
                <h3 className="font-bold">Swervy AI Assistant</h3>
                <p className="text-sm opacity-90">Let's find your perfect kit!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-gray-200 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        {/* Chat Messages */}
        <CardContent className="p-0">
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-swervy-pink to-pink-500 text-white rounded-br-sm'
                      : 'bg-gradient-to-r from-swervy-turquoise to-teal-500 text-white rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-swervy-turquoise to-teal-500 text-white px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your style preferences..."
                className="flex-1 border-gray-300 focus:border-swervy-pink"
                disabled={chatMutation.isPending}
              />
              <Button
                onClick={handleSend}
                disabled={chatMutation.isPending || !input.trim()}
                className="bg-swervy-pink hover:bg-pink-500"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
