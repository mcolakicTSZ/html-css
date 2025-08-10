import React from 'react';

export default function Logo({ className = "", textColor = "text-white" }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        {/* Main logo container */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
          {/* Inner design */}
          <div className="relative">
            {/* R letter stylized */}
            <div className="text-white font-black text-xl">R</div>
            {/* Accent dot */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30 -z-10"></div>
      </div>
      
      <div className="flex flex-col">
        <span className={`text-2xl font-black tracking-tight ${textColor}`}>
          Rezly
        </span>
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
          <span className={`text-xs font-medium tracking-wider ${textColor === 'text-white' ? 'text-blue-200' : 'text-gray-600'}`}>
            PROFESSIONAL
          </span>
        </div>
      </div>
    </div>
  );
}