"use client";
import React, { useState } from 'react';

const App = () => {
  const [leftWidth, setLeftWidth] = useState(50);
  const [middleHeight, setMiddleHeight] = useState(50);

  const handleLeftResize = (e: any) => {
    setLeftWidth(e.clientX / window.innerWidth * 100);
  };

  const handleMiddleResize = (e: any) => {
    setMiddleHeight(e.clientY / window.innerHeight * 100);
  };

  return (
    <div className="flex h-screen">
      <div
        className="bg-gray-300 flex-grow"
        style={{ width: `${leftWidth}%` }}
        onMouseMove={handleLeftResize}
      >
        <div className="text-center text-2xl font-bold my-8">Gemini</div>
      </div>
      <div
        className="bg-gray-400 relative flex-grow"
        style={{ height: `${middleHeight}%` }}
        onMouseMove={handleMiddleResize}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 text-4xl font-bold">
          |
        </div>
      </div>
      <div className="bg-red-500 flex-grow"></div>
    </div>
  );
};

export default App;