import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'Destinations', href: '/destinations' },
    { title: 'Services', href: '/services' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center space-x-1.5 sm:space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-600" />
            <span className="text-base sm:text-xl font-semibold text-emerald-600">GoLocal Guide</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                className="relative text-sm lg:text-base xl:text-lg font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.title}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/login"
              className="flex items-center space-x-1.5 text-sm lg:text-base font-medium text-emerald-600 hover:text-emerald-700"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Login</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/signup"
              className="flex items-center space-x-1.5 bg-emerald-600 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full hover:bg-emerald-700 transition-colors text-sm sm:text-base font-medium"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Sign Up</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-gray-600 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
              {menuItems.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  className="block text-xl sm:text-2xl font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  {item.title}
                </motion.a>
              ))}
              <div className="flex flex-col space-y-4 pt-4 sm:pt-6 border-t">
                <motion.a
                  whileHover={{ x: 10 }}
                  href="/login"
                  className="flex items-center space-x-2 text-lg sm:text-xl font-medium text-emerald-600 hover:text-emerald-700"
                >
                  <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Login</span>
                </motion.a>
                <motion.a
                  whileHover={{ x: 10 }}
                  href="/signup"
                  className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-emerald-700 transition-colors text-lg sm:text-xl font-medium"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Sign Up</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;