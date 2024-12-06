import React from 'react';
import { LogOut } from 'lucide-react';

const DashboardHeader = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-md border-b border-gray-200">
      <h1 className="text-3xl font-bold text-blue-800">Guide Dashboard</h1>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
};

export default DashboardHeader;
