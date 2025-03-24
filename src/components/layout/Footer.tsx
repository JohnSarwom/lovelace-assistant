
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-12 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-muted-foreground">
              © {currentYear} Lovelace AI.
            </span>
            <span className="text-sm text-muted-foreground">All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Chat
            </Link>
            <Link to="/knowledge" className="hover:text-foreground transition-colors">
              Knowledge Base
            </Link>
            <Link to="/config" className="hover:text-foreground transition-colors">
              Configuration
            </Link>
            <a 
              href="#" 
              className="hover:text-foreground transition-colors flex items-center space-x-1"
              rel="noreferrer"
            >
              <span>Made with</span>
              <Heart size={12} className="text-destructive animate-pulse" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
