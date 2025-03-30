
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, LayoutDashboard, Users, Compass, Radio, Grid3X3 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  
  const navLinks = [
    { path: '/browse', label: 'Browse', icon: <Compass size={18} /> },
    { path: '/following', label: 'Following', icon: <Users size={18} /> },
    { path: '/categories', label: 'Categories', icon: <Grid3X3 size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border transition-colors duration-300">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center font-bold text-2xl text-primary">
            <span className="relative">
              <span className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              FluidStreamers
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                  isActive(link.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-secondary hover:text-primary'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className={`relative ${isSearchFocused ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search streams, categories, or channels"
              className="w-full h-9 pl-10 pr-4 rounded-full bg-secondary border-none focus:outline-none transition-all duration-300"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard" 
            className="p-2 rounded-full hover:bg-secondary transition-colors duration-200 cursor-pointer hidden md:flex"
            aria-label="Dashboard"
          >
            <LayoutDashboard size={18} />
          </Link>
          
          <Link 
            to="/notifications" 
            className="p-2 rounded-full hover:bg-secondary transition-colors duration-200 cursor-pointer relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white text-xs">
              3
            </Badge>
          </Link>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hidden md:flex items-center gap-2 py-1 px-3 rounded-full hover:bg-secondary transition-colors duration-200 cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary">
                  <img 
                    src="https://placehold.co/100x100/9146FF/FFFFFF.png?text=U" 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">YourUsername</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Radio className="mr-2 h-4 w-4" />
                <span>Go Live</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors duration-200 cursor-pointer" 
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-in slide-in-from-top duration-300">
          <nav className="container px-4 py-3 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`px-3 py-3 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                  isActive(link.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-secondary hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            
            <Link 
              to="/dashboard" 
              className={`px-3 py-3 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-secondary hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            
            <Link 
              to="/profile" 
              className="px-3 py-3 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-secondary hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={18} />
              Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
