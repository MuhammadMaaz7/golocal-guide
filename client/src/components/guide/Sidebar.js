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
        className="fixed top-4 left-4 z-50 p-2 bg-emerald-600 rounded-full shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-emerald-700 shadow-lg md:relative md:shadow-none"
          >
            <div className="h-full overflow-y-auto p-4 flex flex-col">
              <h2 className="text-3xl font-semibold mb-8 text-center text-white">Guide Panel</h2>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-4 w-full p-3 rounded-lg text-white text-lg hover:text-emerald-200 transition-colors ${
                        location.pathname === item.path ? 'bg-emerald-600' : ''
                      }`}
                    >
                      <item.icon className="w-5 h-5 group-hover:text-emerald-200" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 w-full p-3 mt-4 text-white text-lg hover:text-emerald-200 transition-colors rounded-lg"
              >
                <LogOut className="w-5 h-5" />
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
