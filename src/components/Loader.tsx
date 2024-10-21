import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 p-4 rounded-lg">
      <div className="w-9 h-9 border-4 border-solid border-gray-200 border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
