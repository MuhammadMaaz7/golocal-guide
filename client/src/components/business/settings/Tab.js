import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 border-b border-[#e2e8f0]">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === index
                ? 'text-[#00875a] border-b-2 border-[#00875a]'
                : 'text-[#4a5568] hover:text-[#00875a]'
            }`}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

Tabs.Tab = ({ children }) => children;

export default Tabs;

