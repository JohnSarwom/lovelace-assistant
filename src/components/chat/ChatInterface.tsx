
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, Bot, UserCircle, Mic, X, Expand, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  source?: string;
  provider?: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Lovelace AI, your intelligent assistant. How can I help you today?',
      timestamp: new Date(),
      provider: 'Default'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleSendMessage = async (e?: React.FormEvent) => {
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
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm a simulated response to "${input}". In the future, I'll connect to various AI providers like OpenAI, Anthropic, and others to give you real answers.`,
        timestamp: new Date(),
        provider: 'Simulated'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div 
      className={cn(
        "flex flex-col rounded-xl glass-card relative overflow-hidden transition-all duration-500",
        isFullscreen 
          ? "fixed inset-0 z-50 rounded-none" 
          : "w-full max-w-4xl mx-auto h-[70vh] my-6"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 bg-primary/20">
            <Bot size={16} className="text-primary" />
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">Lovelace AI</h3>
            <p className="text-xs text-muted-foreground">Multi-API Assistant</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={toggleFullscreen}
        >
          <Expand size={16} />
        </Button>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex w-full animate-in",
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
                    {message.role === 'assistant' ? 'Lovelace AI' : 'You'}
                  </span>
                  {message.provider && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-auto rounded-sm">
                      {message.provider}
                    </Badge>
                  )}
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
            <div className="flex justify-start animate-in">
              <div className="bg-secondary text-secondary-foreground rounded-lg rounded-tl-none p-3 max-w-[80%]">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot size={14} className="text-primary" />
                  <span className="text-xs font-medium">Lovelace AI</span>
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
      
      {/* Input Area */}
      <div className="p-4 border-t border-border/40">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full shrink-0"
          >
            <Mic size={18} />
            <span className="sr-only">Voice input</span>
          </Button>
          
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pr-10 py-6 bg-secondary/50"
            />
            {input && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
                onClick={() => setInput('')}
              >
                <X size={14} />
                <span className="sr-only">Clear input</span>
              </Button>
            )}
          </div>
          
          <Button
            type="submit"
            size="icon"
            className="rounded-full shrink-0"
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
    </div>
  );
}
