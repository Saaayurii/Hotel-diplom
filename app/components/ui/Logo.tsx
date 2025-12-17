import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-serif tracking-wider text-black dark:text-white">
        <span className="italic">{'〈'}</span>
        TIMEOUT
        <span className="italic">{'〉'}</span>
      </h1>
      <p className="text-xs tracking-[0.3em] text-gray-600 dark:text-gray-400 mt-1">
        TRAVEL AGENCY
      </p>
    </div>
  );
};
