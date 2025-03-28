
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Database, 
  Settings, 
  Github, 
  Menu, 
  X,
  Share2,
  Link as LinkIcon,
  Code
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const links = [
  { name: 'Chat', path: '/', icon: MessageSquare },
  { name: 'Knowledge Base', path: '/knowledge', icon: Database },
  { name: 'Configuration', path: '/config', icon: Settings },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleShareOption = (option: string) => {
    if (option === 'github') {
      navigate('/integrations');
      setTimeout(() => {
        // Focus on GitHub tab
        const githubTab = document.querySelector('[value="github"]');
        if (githubTab && 'click' in githubTab) {
          (githubTab as HTMLElement).click();
        }
      }, 100);
    } else if (option === 'embed') {
      navigate('/integrations');
      setTimeout(() => {
        // Focus on Embed tab
        const embedTab = document.querySelector('[value="embed"]');
        if (embedTab && 'click' in embedTab) {
          (embedTab as HTMLElement).click();
        }
      }, 100);
    } else if (option === 'copy-link') {
      // Copy current URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "glass-effect shadow-sm backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold text-2xl">
            Lovelace
          </span>
          <span className="font-light tracking-tight">AI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <Button 
                  variant={isActive ? "default" : "ghost"} 
                  className={cn(
                    "flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300",
                    isActive ? "shadow-sm" : "hover:bg-secondary/80"
                  )}
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </Button>
              </Link>
            );
          })}
          
          <div className="w-px h-6 bg-border mx-2" />
          
          {/* Share Button with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 size={18} />
                <span className="sr-only">Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleShareOption('github')}>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub Integration</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShareOption('embed')}>
                <Code className="mr-2 h-4 w-4" />
                <span>Generate Embed Code</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleShareOption('copy-link')}>
                <LinkIcon className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a 
            href="https://github.com/yourusername/lovelace-ai" 
            target="_blank" 
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-full" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 z-40 transform transition-all duration-300 ease-in-out md:hidden",
          mobileMenuOpen 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={toggleMobileMenu} />
        <nav className="absolute right-0 top-0 bottom-0 w-64 glass-effect shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-medium">Menu</span>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleMobileMenu}>
              <X size={18} />
            </Button>
          </div>
          <div className="flex flex-col p-4 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    className={cn(
                      "w-full justify-start space-x-2",
                      isActive ? "shadow-sm" : "hover:bg-secondary/80"
                    )}
                  >
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </Button>
                </Link>
              );
            })}
            
            {/* Mobile Share Options */}
            <Button 
              variant="outline" 
              className="w-full justify-start space-x-2"
              onClick={() => navigate('/integrations')}
            >
              <Share2 size={16} />
              <span>Integrations</span>
            </Button>
          </div>
          <div className="mt-auto p-4 border-t border-border">
            <a 
              href="https://github.com/yourusername/lovelace-ai" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={16} />
              <span>View on GitHub</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
