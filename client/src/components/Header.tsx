import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-swervy-coral-light to-swervy-peach shadow-xl sticky top-0 z-50 border-b-2 border-swervy-coral">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 animate-bounce-10s">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-swervy-coral to-swervy-sunset bg-clip-text text-transparent">Swervy Cares</h1>
              <p className="text-sm text-swervy-coral font-semibold mt-1">Empowering girls through self-care</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/mission"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/mission' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Our Mission
              </Link>
              <Link 
                href="/stories"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/stories' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Stories
              </Link>
              <Link 
                href="/communities"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/communities' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Communities
              </Link>
              <Link 
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/blog' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Blog
              </Link>
              <Link 
                href="/events"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/events' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Events
              </Link>
              <Link 
                href="/volunteer"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/volunteer' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Volunteer
              </Link>
              <Link 
                href="/donate"
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  location === '/donate' ? 'text-white bg-gradient-to-r from-swervy-coral to-swervy-sunset shadow-lg' : 'text-swervy-coral hover:text-white hover:bg-gradient-to-r hover:from-swervy-coral-light hover:to-swervy-coral hover:shadow-md'
                }`}
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-swervy-pink"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm rounded-lg shadow-lg mt-2 mx-4 p-4">
            <div className="space-y-2">
              <Link 
                href="/"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/mission"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/mission' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Our Mission
              </Link>
              <Link 
                href="/stories"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/stories' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Stories
              </Link>
              <Link 
                href="/communities"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/communities' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Communities
              </Link>
              <Link 
                href="/blog"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/blog' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Blog
              </Link>
              <Link 
                href="/events"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/events' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Events
              </Link>
              <Link 
                href="/volunteer"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/volunteer' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Volunteer
              </Link>
              <Link 
                href="/donate"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/donate' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
