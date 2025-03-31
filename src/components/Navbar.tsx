
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-travel-primary" />
            <span className="text-xl font-bold text-travel-primary">EasyTrip</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-travel-primary font-medium">
              Home
            </Link>
            <Link to="/destinations" className="text-gray-600 hover:text-travel-primary font-medium">
              Destinations
            </Link>
            <Link to="/packing-assistant" className="text-gray-600 hover:text-travel-primary font-medium">
              Packing Assistant
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-travel-primary font-medium">
              Local Guide
            </Link>
            <Button variant="outline" className="border-travel-primary text-travel-primary hover:bg-travel-light">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-3 py-2 text-gray-600 hover:bg-travel-light hover:text-travel-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/destinations" 
                className="px-3 py-2 text-gray-600 hover:bg-travel-light hover:text-travel-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                to="/packing-assistant" 
                className="px-3 py-2 text-gray-600 hover:bg-travel-light hover:text-travel-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Packing Assistant
              </Link>
              <Link 
                to="/chat" 
                className="px-3 py-2 text-gray-600 hover:bg-travel-light hover:text-travel-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Local Guide
              </Link>
              <Button variant="outline" className="border-travel-primary text-travel-primary hover:bg-travel-light w-full">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
