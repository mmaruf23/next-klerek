import React from 'react';

const Spinner = () => {
  return (
    <div className="absolute w-svw h-svh bg-gray-50/10 flex justify-center items-center">
      <div className="w-20 h-20 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
