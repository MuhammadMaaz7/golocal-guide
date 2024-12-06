import React from 'react';
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    { title: 'Home', href: '/' },
    { title: 'Destinations', href: '/destinations' },
    { title: 'Services', href: '/services' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-emerald-600 text-white py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">GoLocal Guide</h3>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-emerald-50 leading-relaxed max-w-prose">
              A platform to support you in discovering local experiences 
              and managing your travel adventures.
            </p>
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-sm sm:text-base md:text-lg font-medium hover:text-emerald-100 transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-4 sm:space-y-5 md:space-y-6">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold">Follow us on</h4>
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8">
              {[
                { Icon: Facebook, href: "https://facebook.com/golocalguide", name: "Facebook" },
                { Icon: Twitter, href: "https://twitter.com/golocalguide", name: "Twitter" },
                { Icon: Instagram, href: "https://instagram.com/golocalguide", name: "Instagram" },
                { Icon: Linkedin, href: "https://linkedin.com/company/golocalguide", name: "LinkedIn" }
              ].map(({ Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-100 transition-transform hover:scale-110"
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  <span className="sr-only">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-emerald-500/30 text-center">
          <p className="text-xs sm:text-sm md:text-base text-emerald-50">
            &copy; {new Date().getFullYear()} GoLocal Guide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;