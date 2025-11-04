
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-blue/90 text-white p-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-desert-sand mb-4"></div>
      <h2 className="text-2xl font-semibold mb-2">Fetching Weather Data...</h2>
      <p className="text-lg text-sun-yellow">AI is crafting a fresh forecast for Riyadh!</p>
    </div>
  );
};

export default LoadingSpinner;
