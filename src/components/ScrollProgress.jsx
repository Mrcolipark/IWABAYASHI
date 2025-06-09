import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800/50 backdrop-blur-sm z-50">
      <div 
        className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 transition-all duration-300 ease-out shadow-lg"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* 发光效果 */}
        <div className="absolute top-0 right-0 w-8 h-full bg-white/30 blur-sm"></div>
      </div>
    </div>
  );
};

export default ScrollProgress;