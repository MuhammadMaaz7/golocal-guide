import React from 'react';
import { Home, MessageSquare, Bell, Heart, User, Settings, LogOut } from 'lucide-react';

export default function Sidebar () {
  return (
    <div className="w-64 h-screen bg-white border-r p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">G</span>
        </div>
        <span className="font-semibold text-lg">GoLocal Guide</span>
      </div>

      <nav className="space-y-2 flex-1">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-emerald-600 bg-emerald-50 rounded-lg">
          <Home className="w-5 h-5" />
          <span>Destinations</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <MessageSquare className="w-5 h-5" />
          <span>Messages</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <Heart className="w-5 h-5" />
          <span>Saved Places</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <User className="w-5 h-5" />
          <span>Account</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="pt-6 border-t">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
