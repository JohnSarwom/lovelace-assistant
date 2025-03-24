
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatInterface from '@/components/chat/ChatInterface';
import { MessageSquare, Database, Settings, ArrowRight } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('chat');
  
  // Smooth appearance animation for the page
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'knowledge') {
      navigate('/knowledge');
    } else if (value === 'config') {
      navigate('/config');
    }
  };
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 animate-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent pb-2">
              Lovelace AI
            </h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
              Multi-API intelligent assistant with knowledge base integration
            </p>
          </div>
          
          <Tabs defaultValue="chat" value={activeTab} onValueChange={handleTabChange} className="w-full animate-in">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare size={14} />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center gap-1">
                <Database size={14} />
                <span>Knowledge</span>
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center gap-1">
                <Settings size={14} />
                <span>Config</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="w-full mt-8">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="knowledge" className="w-full">
              {/* Empty since we'll navigate to the actual page */}
            </TabsContent>
            
            <TabsContent value="config" className="w-full">
              {/* Empty since we'll navigate to the actual page */}
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-in" style={{ animationDelay: '300ms' }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary" />
                  Multi-API Intelligence
                </CardTitle>
                <CardDescription>
                  Connect with multiple AI providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Intelligently route queries to the most suitable AI provider based on content type, ensuring optimal responses every time.
                </p>
                <Button variant="link" className="p-0 h-auto mt-4" onClick={() => navigate('/config')}>
                  Configure Providers <ArrowRight size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database size={18} className="text-primary" />
                  Knowledge Base
                </CardTitle>
                <CardDescription>
                  Train your AI with custom data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Upload documents and connect data sources to create a custom knowledge base for your assistant with context-aware responses.
                </p>
                <Button variant="link" className="p-0 h-auto mt-4" onClick={() => navigate('/knowledge')}>
                  Manage Knowledge <ArrowRight size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings size={18} className="text-primary" />
                  Website Integration
                </CardTitle>
                <CardDescription>
                  Seamlessly embed in your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add Lovelace AI to any website with a simple embed code. Customize appearance to match your brand seamlessly.
                </p>
                <Button variant="link" className="p-0 h-auto mt-4" onClick={() => navigate('/config')}>
                  Integration Options <ArrowRight size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
