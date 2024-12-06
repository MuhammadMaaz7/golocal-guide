import React, { useState } from 'react';
import { Home, Package, Users, User, Settings, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 bg-blue-800 rounded-full"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 bg-blue-800 text-white min-h-screen p-4 fixed transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative duration-300 ease-in-out`}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">Guide Panel</h2>
        <nav>
          <ul>
            {/* Home Link */}
            <li className="mb-6 group">
              <Link
                to="/guide-dashboard"
                className="flex items-center gap-4 text-lg group-hover:text-blue-200 transition duration-300"
              >
                <Home className="w-5 h-5 group-hover:text-blue-200" />
                Dashboard
              </Link>
            </li>

            {/* My Packages Link */}
            <li className="mb-6 group">
              <Link
                to="/my-packages"
                className="flex items-center gap-4 text-lg group-hover:text-blue-200 transition duration-300"
              >
                <Package className="w-5 h-5 group-hover:text-blue-200" />
                My Packages
              </Link>
            </li>

            {/* Tour Requests Link */}
            <li className="mb-6 group">
              <Link
                to="/tour-requests"
                className="flex items-center gap-4 text-lg group-hover:text-blue-200 transition duration-300"
              >
                <Users className="w-5 h-5 group-hover:text-blue-200" />
                Tour Requests
              </Link>
            </li>

             {/* Tour Requests Link */}
             <li className="mb-6 group">
              <Link
                to="/experiences"
                className="flex items-center gap-4 text-lg group-hover:text-blue-200 transition duration-300"
              >
                <Users className="w-5 h-5 group-hover:text-blue-200" />
                Experiences
              </Link>
            </li>

            {/* Profile Link */}
            <li className="mb-6 group">
              <Link
                to="/profile"
                className="flex items-center gap-4 text-lg group-hover:text-blue-200 transition duration-300"
              >
                <User className="w-5 h-5 group-hover:text-blue-200" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
