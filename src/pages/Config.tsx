
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ConfigPanel from '@/components/settings/ConfigPanel';

export default function Config() {
  // Smooth appearance animation for the page
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <ConfigPanel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
