import React from 'react';

/**
 * LoadingSpinner - Animated spinner for loading states
 */
const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full absolute top-0 left-0 animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-500 font-medium text-sm">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
