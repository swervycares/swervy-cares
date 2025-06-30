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
    <header className="bg-gradient-to-r from-swervy-light-pink to-swervy-pale-pink shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 animate-bounce">
              <h1 className="text-3xl font-bold text-gray-800">Swervy Cares</h1>
              <p className="text-sm text-gray-600 mt-1">Empowering girls through self-care</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                  location === '/' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/mission"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                  location === '/mission' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Our Mission
              </Link>
              <Link 
                href="/volunteer"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                  location === '/volunteer' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Volunteer
              </Link>
              <Link 
                href="/donate"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                  location === '/donate' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Donate
              </Link>
              <Link 
                href="/share"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                  location === '/share' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Share
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
              <Link 
                href="/share"
                onClick={handleLinkClick}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  location === '/share' ? 'text-swervy-pink bg-swervy-pale-pink' : 'text-gray-700 hover:text-swervy-pink'
                }`}
              >
                Share
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
