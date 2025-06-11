import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  const sitePages = [
    { path: '/', name: '首页', nameJa: 'ホーム', nameEn: 'Home' },
    { path: '/about', name: '关于我们', nameJa: '会社概要', nameEn: 'About Us' },
    { path: '/services', name: '服务内容', nameJa: '事業内容', nameEn: 'Services' },
    { path: '/news', name: '新闻动态', nameJa: 'ニュース', nameEn: 'News' },
    { path: '/contact', name: '联系我们', nameJa: 'お問い合わせ', nameEn: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          网站地图 | Sitemap | サイトマップ
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">主要页面</h2>
              <ul className="space-y-4">
                {sitePages.map((page, index) => (
                  <li key={index}>
                    <Link 
                      to={page.path}
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-800">{page.name}</div>
                      <div className="text-sm text-gray-500">{page.nameJa} | {page.nameEn}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">其他页面</h2>
              <ul className="space-y-4">
                <li>
                  <Link to="/privacy" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="font-semibold">隐私政策</div>
                    <div className="text-sm text-gray-500">プライバシーポリシー | Privacy Policy</div>
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="font-semibold">使用条款</div>
                    <div className="text-sm text-gray-500">利用規約 | Terms of Service</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;