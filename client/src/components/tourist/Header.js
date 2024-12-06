import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header () {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">Hello, Tourist</h1>
        <p className="text-gray-600">Welcome back!</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">T</span>
        </div>
      </div>
    </div>
  );
};

