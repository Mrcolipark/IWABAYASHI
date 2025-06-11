import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          使用条款 | Terms of Service | 利用規約
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose max-w-none">
            <h2>服务条款</h2>
            <p>欢迎使用岩林株式会社网站...</p>
            
            <h2>用户责任</h2>
            <p>用户在使用本网站时应遵守...</p>
            
            <h2>免责声明</h2>
            <p>本网站信息仅供参考...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;