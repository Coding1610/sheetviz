
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 bg-brand-purple rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="8" y1="13" x2="16" y2="13"></line>
            <line x1="8" y1="17" x2="16" y2="17"></line>
            <line x1="10" y1="9" x2="16" y2="9"></line>
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-purple-light/80 to-transparent opacity-50"></div>
      </div>
      <div className="text-xl font-bold text-brand-purple">SheetViz</div>
    </div>
  );
};

export default Logo;
