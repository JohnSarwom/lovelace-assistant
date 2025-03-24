
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Github, 
  Code2, 
  Database, 
  Link,
  ExternalLink,
  Copy,
  CheckCircle,
  Settings,
  RefreshCw,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function IntegrationPanel() {
  const [activeTab, setActiveTab] = useState('github');
  const [githubRepo, setGithubRepo] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [embedOptions, setEmbedOptions] = useState({
    position: 'bottom-right',
    theme: 'light',
    autoOpen: false,
    width: '380px',
    height: '600px'
  });
  const [integrationStatus, setIntegrationStatus] = useState({
    github: false,
    supabase: false
  });

  // Generate embed code based on current options
  const generateEmbedCode = () => {
    return `<script src="https://lovelace-ai.com/js/embed.js"></script>
<div id="lovelace-assistant" 
  data-api-key="YOUR_PUBLIC_KEY"
  data-position="${embedOptions.position}"
  data-theme="${embedOptions.theme}"
  data-auto-open="${embedOptions.autoOpen}"
  data-width="${embedOptions.width}"
  data-height="${embedOptions.height}">
</div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    LovelaceAI.init();
  });
</script>`;
  };

  // Handle GitHub integration
  const connectGitHub = () => {
    if (!githubRepo || !githubToken) {
      toast.error("Please enter both repository URL and access token");
      return;
    }
    
    // Simulate GitHub integration
    setTimeout(() => {
      setIntegrationStatus(prev => ({ ...prev, github: true }));
      toast.success("Successfully connected to GitHub repository");
    }, 1500);
  };

  // Handle Supabase integration
  const connectSupabase = () => {
    toast("Redirecting to Supabase connection...", {
      description: "This will open Lovable's Supabase integration panel",
      action: {
        label: "Connect",
        onClick: () => {
          toast.success("Follow the instructions in the Supabase panel");
        }
      }
    });
  };

  // Copy embed code to clipboard
  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    toast.success("Embed code copied to clipboard");
  };

  // Handle auto-integration
  const handleAutoIntegration = () => {
    if (!integrationStatus.github) {
      toast.error("Please connect to GitHub first");
      return;
    }
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Analyzing repository structure...",
        success: "Integration points identified! Click 'Apply Changes' to commit",
        error: "Failed to analyze repository"
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 animate-in">
      <Card className="glass-card w-full max-w-5xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Link className="text-primary" size={20} />
                Integrations
              </CardTitle>
              <CardDescription className="mt-2">
                Connect Lovelace AI with your codebase and services
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-1">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="github" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="github" className="flex items-center justify-center gap-1">
                <Github size={14} />
                <span>GitHub</span>
              </TabsTrigger>
              <TabsTrigger value="embed" className="flex items-center justify-center gap-1">
                <Code2 size={14} />
                <span>Embed Code</span>
              </TabsTrigger>
              <TabsTrigger value="supabase" className="flex items-center justify-center gap-1">
                <Database size={14} />
                <span>Supabase</span>
              </TabsTrigger>
            </TabsList>
            
            {/* GitHub Integration Tab */}
            <TabsContent value="github" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Github size={18} className="mr-2 text-primary" />
                  GitHub Repository Connection
                </h3>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="github-repo">Repository URL</Label>
                      <Input
                        id="github-repo"
                        placeholder="https://github.com/username/repository"
                        value={githubRepo}
                        onChange={(e) => setGithubRepo(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github-token">GitHub Access Token</Label>
                      <Input
                        id="github-token"
                        type="password"
                        placeholder="GitHub Personal Access Token"
                        value={githubToken}
                        onChange={(e) => setGithubToken(e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Requires repo and read:user scopes. <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Generate token</a>
                      </p>
                    </div>
                    <div>
                      <Button 
                        onClick={connectGitHub}
                        disabled={!githubRepo || !githubToken}
                        className="mt-2"
                      >
                        <Github size={16} className="mr-2" />
                        Connect Repository
                      </Button>
                      
                      {integrationStatus.github && (
                        <Badge className="ml-3 bg-green-500">
                          <CheckCircle size={12} className="mr-1" /> Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <RefreshCw size={18} className="mr-2 text-primary" />
                  Auto-Integration
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Automatically analyze your codebase and suggest integration points for Lovelace AI assistant.
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <Button 
                      onClick={handleAutoIntegration} 
                      disabled={!integrationStatus.github}
                      variant="outline"
                    >
                      <Settings size={16} className="mr-2" />
                      Analyze Repository
                    </Button>
                    
                    <Button disabled={!integrationStatus.github}>
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Embed Code Tab */}
            <TabsContent value="embed" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Code2 size={18} className="mr-2 text-primary" />
                  Embed Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="embed-position">Position</Label>
                      <select 
                        id="embed-position" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        value={embedOptions.position}
                        onChange={(e) => setEmbedOptions({...embedOptions, position: e.target.value})}
                      >
                        <option value="bottom-right">Bottom Right</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="top-right">Top Right</option>
                        <option value="top-left">Top Left</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="embed-theme">Theme</Label>
                      <select 
                        id="embed-theme" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        value={embedOptions.theme}
                        onChange={(e) => setEmbedOptions({...embedOptions, theme: e.target.value})}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-open">Auto-Open on Page Load</Label>
                      <Switch 
                        id="auto-open"
                        checked={embedOptions.autoOpen}
                        onCheckedChange={(checked) => setEmbedOptions({...embedOptions, autoOpen: checked})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="embed-width">Width</Label>
                      <Input
                        id="embed-width"
                        value={embedOptions.width}
                        onChange={(e) => setEmbedOptions({...embedOptions, width: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="embed-height">Height</Label>
                      <Input
                        id="embed-height"
                        value={embedOptions.height}
                        onChange={(e) => setEmbedOptions({...embedOptions, height: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <ExternalLink size={18} className="mr-2 text-primary" />
                  Generated Embed Code
                </h3>
                <div className="p-4 border border-border rounded-lg bg-secondary/50 relative">
                  <pre className="p-3 bg-background rounded-md overflow-x-auto text-xs font-mono">
                    {generateEmbedCode()}
                  </pre>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={copyEmbedCode}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Add this code to your website to embed Lovelace AI. Replace YOUR_PUBLIC_KEY with your actual public API key.
                </p>
              </div>
            </TabsContent>
            
            {/* Supabase Integration Tab */}
            <TabsContent value="supabase" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Database size={18} className="mr-2 text-primary" />
                  Supabase Connection
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Connect Lovelace AI to Supabase to store configuration settings, user preferences, and conversation history.
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <Button onClick={connectSupabase}>
                      <Database size={16} className="mr-2" />
                      Connect to Supabase
                    </Button>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      This will use Lovable's Supabase integration to securely connect your project.
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Settings size={18} className="mr-2 text-primary" />
                  Data Storage Configuration
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Store Configuration</Label>
                      <p className="text-sm text-muted-foreground">
                        Save AI provider settings and API keys
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Store Conversations</Label>
                      <p className="text-sm text-muted-foreground">
                        Save chat history and user interactions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Store Knowledge Base</Label>
                      <p className="text-sm text-muted-foreground">
                        Save uploaded documents and custom knowledge
                      </p>
                    </div>
                    <Switch defaultChecked />
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
