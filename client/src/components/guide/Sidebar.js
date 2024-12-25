import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Package, Users, User, Settings, LogOut, MapPin, Menu, X } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/guide-dashboard' },
  { name: 'My Packages', icon: Package, path: '/my-packages' },
  { name: 'Tour Requests', icon: Users, path: '/tour-requests' },
  { name: 'Experiences', icon: Users, path: '/experiences' },
  { name: 'Profile', icon: User, path: '/profile' }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6 text-emerald-600" /> : <Menu className="w-6 h-6 text-emerald-600" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-y-0 left-0 z-40 w-64 rounded-lg bg-white shadow-lg md:relative md:shadow-none"
          >
            <div className="h-full overflow-y-auto p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <MapPin className="w-7 h-7 text-emerald-600" />
                <span className="text-xl font-bold text-emerald-600">GoLocal Guide</span>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-emerald-50 transition-colors ${
                        location.pathname === item.path ? 'bg-emerald-100 text-emerald-700' : ''
                      }`}
                    >
                      <item.icon size={20} className={location.pathname === item.path ? 'text-emerald-700' : 'text-emerald-600'} />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 w-full p-3 mt-4 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
