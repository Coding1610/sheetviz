
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { UserButton } from '@clerk/clerk-react';
import { isUserAdmin } from '@/services/UserService';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if the user is an admin - in a real app this would be properly handled with Clerk's metadata
      const checkAdminStatus = async () => {
        // For demo purposes, we'll use our UserService
        if (user?.publicMetadata?.role === 'admin' || (user?.id && isUserAdmin(user.id))) {
          setIsAdmin(true);
        }
      };
      
      checkAdminStatus();
    }
  }, [isLoaded, isSignedIn, user]);

  const handleSignOut = () => {
    signOut();
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    setMenuOpen(false);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10',
      scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-brand-purple-600" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-brand-purple transition-colors">Home</Link>
          
          {location.pathname === '/' ? (
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-700 hover:text-brand-purple transition-colors"
            >
              Features
            </button>
          ) : (
            <Link to="/#features" className="text-gray-700 hover:text-brand-purple transition-colors">Features</Link>
          )}
          
          {isLoaded && (
            <>
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard">
                    <Button variant="outline" className="border-brand-purple text-brand-purple hover:text-white hover:bg-brand-purple">
                      Dashboard
                    </Button>
                  </Link>
                  
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" className="border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500 flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  
                  <Link to="/profile">
                    <Button variant="outline" className="border-brand-purple text-brand-purple hover:text-white hover:bg-brand-purple">
                      Profile
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <Link to="/sign-in">
                  <Button className="bg-brand-purple hover:bg-brand-purple-600 text-white">
                    Get Started
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-6 z-50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-purple py-2 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              
              {location.pathname === '/' ? (
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-left text-gray-700 hover:text-brand-purple py-2 transition-colors"
                >
                  Features
                </button>
              ) : (
                <Link 
                  to="/#features" 
                  className="text-gray-700 hover:text-brand-purple py-2 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Features
                </Link>
              )}
              
              <div className="h-px bg-gray-200 my-2"></div>
              
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="text-brand-purple font-medium py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          className="text-purple-600 font-medium py-2 flex items-center gap-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4" />
                          Admin
                        </Link>
                      )}
                      
                      <Link 
                        to="/profile" 
                        className="text-brand-purple font-medium py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <div className="py-2">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </>
                  ) : (
                    <Link 
                      to="/sign-in" 
                      className="bg-brand-purple text-white py-2 px-4 rounded-md text-center"
                      onClick={() => setMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;