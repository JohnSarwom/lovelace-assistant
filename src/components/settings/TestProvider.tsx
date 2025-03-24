
import { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, Bot, UserCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TestProviderProps {
  provider: {
    id: string;
    name: string;
    logo: string;
    description: string;
    apiKey: string;
  };
  onClose: () => void;
}

export default function TestProvider({ provider, onClose }: TestProviderProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm testing the ${provider.name} API connection. How can I assist you?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate API response
    setTimeout(() => {
      let response: string;
      
      if (provider.id === 'openai') {
        response = `This is a simulated OpenAI response to "${input}". In a real implementation, this would use the OpenAI API with the key you provided.`;
      } else if (provider.id === 'anthropic') {
        response = `This is a simulated Anthropic Claude response to "${input}". In a real implementation, this would use the Anthropic API with the key you provided.`;
      } else if (provider.id === 'cohere') {
        response = `This is a simulated Cohere response to "${input}". In a real implementation, this would use the Cohere API with the key you provided.`;
      } else if (provider.id === 'deepseek') {
        response = `This is a simulated DeepSeek response to "${input}". In a real implementation, this would use the DeepSeek API with the key you provided.`;
      } else if (provider.id === 'google') {
        response = `This is a simulated Google Vertex AI response to "${input}". In a real implementation, this would use the Google API with the key you provided.`;
      } else {
        response = `This is a simulated response from ${provider.name} to "${input}". In a real implementation, this would connect to the actual API.`;
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Dialog open={!!provider} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{provider.logo}</span>
            Test {provider.name} Connection
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col flex-1 min-h-[300px] mt-4">
          <ScrollArea className="flex-1 h-[300px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex w-full",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-secondary text-secondary-foreground rounded-tl-none"
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.role === 'assistant' ? (
                        <Bot size={14} className="text-primary" />
                      ) : (
                        <UserCircle size={14} />
                      )}
                      <span className="text-xs font-medium">
                        {message.role === 'assistant' ? provider.name : 'You'}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-[10px] opacity-70 text-right mt-1">
                      {message.timestamp.toLocaleTimeString(undefined, { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot size={14} className="text-primary" />
                      <span className="text-xs font-medium">{provider.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-pulse" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-pulse" style={{ animationDelay: '300ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-pulse" style={{ animationDelay: '600ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 mt-4">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a test message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full"
              disabled={!input.trim() || isTyping}
            >
              {isTyping ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <SendHorizonal size={18} />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
        
        <DialogFooter className="flex justify-between items-center mt-4 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold">API Key:</span> {provider.apiKey.slice(0, 6)}...
          </div>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
