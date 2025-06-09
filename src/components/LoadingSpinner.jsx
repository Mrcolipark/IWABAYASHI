import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      {/* 主加载动画 */}
      <div className="relative">
        
        {/* 外圈旋转环 */}
        <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-transparent border-t-emerald-400 rounded-full"></div>
        </div>
        
        {/* 内圈脉冲 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* 发光效果 */}
        <div className="absolute inset-0 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl animate-ping"></div>
      </div>
      
      {/* 加载文字 */}
      <div className="absolute bottom-1/3 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">岩</span>
          </div>
          <span className="text-2xl font-bold text-white">IWABAYASHI</span>
        </div>
        
        {/* 进度点 */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        
        <p className="text-gray-400 mt-4 text-sm">正在加载精彩内容...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;