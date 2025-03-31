
import { Plane, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-travel-dark text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-6 w-6" />
              <span className="text-xl font-bold">EasyTrip</span>
            </div>
            <p className="text-gray-300 text-sm">
              Making travel accessible and affordable for everyone. Plan your perfect trip within your budget.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Jaipur</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Udaipur</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Goa</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Kerala</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Shimla</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/destinations" className="text-gray-300 hover:text-white text-sm">Destinations</Link></li>
              <li><Link to="/packing-assistant" className="text-gray-300 hover:text-white text-sm">Packing Assistant</Link></li>
              <li><Link to="/chat" className="text-gray-300 hover:text-white text-sm">Local Guide</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>123 Travel Street, Tourism City</li>
              <li>contact@easytrip.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EasyTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
