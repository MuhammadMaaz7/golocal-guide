import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-emerald-50 to-green-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-700">GoLocal Guide</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/tours" className="text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-md text-sm font-medium">
              Tours
            </Link>
            <Link to="/guides" className="text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-md text-sm font-medium">
              Guides
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to="/login" className="text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Link to="/signup" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/tours" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50">
              Tours
            </Link>
            <Link to="/guides" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50">
              Guides
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50">
              About
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50">
              Login
            </Link>
            <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

