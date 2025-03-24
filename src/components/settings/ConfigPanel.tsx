
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Key, 
  Shield, 
  Clock, 
  Sliders, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Palette,
  Save
} from 'lucide-react';

const providers = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '🤖',
    description: 'GPT-4o, GPT-4 Turbo, etc.',
    isConnected: true,
    isActive: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logo: '🧠',
    description: 'Claude 3 Opus, Sonnet, etc.',
    isConnected: false,
    isActive: false
  },
  {
    id: 'google',
    name: 'Google Vertex AI',
    logo: '🌐',
    description: 'Gemini Pro, Ultra, etc.',
    isConnected: false,
    isActive: false
  },
  {
    id: 'cohere',
    name: 'Cohere',
    logo: '🔄',
    description: 'Command, Embed, etc.',
    isConnected: true,
    isActive: true
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    logo: '🤗',
    description: 'Open source models',
    isConnected: false,
    isActive: false
  }
];

export default function ConfigPanel() {
  const [activeTab, setActiveTab] = useState('providers');
  const [apiKey, setApiKey] = useState('');
  const [aiProviders, setAiProviders] = useState(providers);
  const [customizations, setCustomizations] = useState({
    darkMode: false,
    primaryColor: '#3B82F6',
    accentColor: '#8B5CF6',
    responseStyle: 'balanced',
    embeddedMode: false,
    autoSuggest: true
  });
  
  const toggleProviderConnection = (id: string) => {
    setAiProviders(prev => 
      prev.map(provider => 
        provider.id === id 
          ? { ...provider, isConnected: !provider.isConnected } 
          : provider
      )
    );
  };
  
  const toggleProviderActive = (id: string) => {
    setAiProviders(prev => 
      prev.map(provider => 
        provider.id === id 
          ? { ...provider, isActive: !provider.isActive } 
          : provider
      )
    );
  };
  
  const handleAPIKeySave = () => {
    // Simulate API key saving
    console.log('API key saved:', apiKey);
    setApiKey('');
  };
  
  const updateCustomization = (key: string, value: any) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  return (
    <div className="container mx-auto px-4 py-6 animate-in">
      <Card className="glass-card w-full max-w-5xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Settings className="text-primary" size={20} />
                Configuration
              </CardTitle>
              <CardDescription className="mt-2">
                Manage your AI providers, API keys, and appearance settings
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-1">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="providers" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="providers" className="flex items-center justify-center gap-1">
                <Key size={14} />
                <span>AI Providers</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center justify-center gap-1">
                <Palette size={14} />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="integration" className="flex items-center justify-center gap-1">
                <ExternalLink size={14} />
                <span>Integration</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="providers" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Shield size={18} className="mr-2 text-primary" />
                  API Key Management
                </h3>
                <div className="grid gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Enter API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="provider">Provider</Label>
                      <select 
                        id="provider" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="google">Google Vertex AI</option>
                        <option value="cohere">Cohere</option>
                        <option value="huggingface">Hugging Face</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={handleAPIKeySave}
                        disabled={!apiKey}
                        className="mb-[1px]"
                      >
                        Add Key
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Sliders size={18} className="mr-2 text-primary" />
                  Active Providers
                </h3>
                <div className="space-y-4">
                  {aiProviders.map((provider) => (
                    <div 
                      key={provider.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{provider.logo}</div>
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-muted-foreground">{provider.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end gap-1">
                          <Badge 
                            variant={provider.isConnected ? "default" : "outline"}
                            className="mr-2"
                          >
                            {provider.isConnected 
                              ? <CheckCircle size={12} className="mr-1" /> 
                              : <XCircle size={12} className="mr-1" />}
                            {provider.isConnected ? 'Connected' : 'Not Connected'}
                          </Badge>
                          
                          <div className="flex items-center gap-1">
                            <button 
                              className="text-xs text-primary hover:underline"
                              onClick={() => toggleProviderConnection(provider.id)}
                            >
                              {provider.isConnected ? 'Disconnect' : 'Connect'}
                            </button>
                            <span className="text-muted-foreground">•</span>
                            <button 
                              className="text-xs text-primary hover:underline"
                              onClick={() => {}}
                            >
                              Test
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`active-${provider.id}`} className="text-sm">
                            Active
                          </Label>
                          <Switch
                            id={`active-${provider.id}`}
                            checked={provider.isActive}
                            onCheckedChange={() => toggleProviderActive(provider.id)}
                            disabled={!provider.isConnected}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <RefreshCw size={18} className="mr-2 text-primary" />
                  Fallback Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Auto Fallback</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically fall back to alternative providers if the primary one fails
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Cost Optimization</Label>
                      <p className="text-sm text-muted-foreground">
                        Route requests to the most cost-effective provider based on query complexity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Health Monitoring</Label>
                      <p className="text-sm text-muted-foreground">
                        Monitor provider health and automatically adjust routing
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Palette size={18} className="mr-2 text-primary" />
                  Visual Customization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Theme Mode</Label>
                      <div className="flex gap-4 mt-2">
                        <div 
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer flex-1 text-center",
                            !customizations.darkMode 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-muted-foreground"
                          )}
                          onClick={() => updateCustomization('darkMode', false)}
                        >
                          Light
                        </div>
                        <div 
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer flex-1 text-center",
                            customizations.darkMode 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-muted-foreground"
                          )}
                          onClick={() => updateCustomization('darkMode', true)}
                        >
                          Dark
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="primary-color"
                          type="color"
                          value={customizations.primaryColor}
                          onChange={(e) => updateCustomization('primaryColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={customizations.primaryColor}
                          onChange={(e) => updateCustomization('primaryColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="accent-color"
                          type="color"
                          value={customizations.accentColor}
                          onChange={(e) => updateCustomization('accentColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={customizations.accentColor}
                          onChange={(e) => updateCustomization('accentColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Response Style</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {['concise', 'balanced', 'detailed'].map(style => (
                          <div 
                            key={style}
                            className={cn(
                              "border rounded-lg p-3 cursor-pointer text-center capitalize",
                              customizations.responseStyle === style 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-muted-foreground"
                            )}
                            onClick={() => updateCustomization('responseStyle', style)}
                          >
                            {style}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <Label className="text-base">Embedded Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Optimized for embedding in websites
                        </p>
                      </div>
                      <Switch
                        checked={customizations.embeddedMode}
                        onCheckedChange={(value) => updateCustomization('embeddedMode', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <Label className="text-base">Auto-Suggest</Label>
                        <p className="text-sm text-muted-foreground">
                          Show suggested queries as you type
                        </p>
                      </div>
                      <Switch
                        checked={customizations.autoSuggest}
                        onCheckedChange={(value) => updateCustomization('autoSuggest', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <MessageSquare size={18} className="mr-2 text-primary" />
                  Chat Interface Preview
                </h3>
                <div className="border border-border rounded-lg h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Preview coming soon</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <ExternalLink size={18} className="mr-2 text-primary" />
                  Website Integration
                </h3>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg bg-secondary/50">
                    <Label className="text-base">Embed Code</Label>
                    <div className="mt-2 relative">
                      <pre className="p-3 bg-background rounded-md overflow-x-auto text-xs font-mono">
                        {`<script src="https://lovelace-ai.com/js/embed.js"></script>
<div id="lovelace-assistant" data-api-key="YOUR_PUBLIC_KEY"></div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    LovelaceAI.init({
      element: '#lovelace-assistant',
      theme: 'light',
      position: 'bottom-right'
    });
  });
</script>`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => {}}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Clock size={18} className="mr-2 text-primary" />
                  Usage Limits
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Daily Query Limit</Label>
                      <p className="text-sm text-muted-foreground">
                        Maximum number of queries per day
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="1000" className="w-24" />
                      <Button variant="outline" size="sm">Set</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit requests per minute per user
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="10" className="w-24" />
                      <Button variant="outline" size="sm">Set</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border pt-4">
          <Button variant="ghost">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
