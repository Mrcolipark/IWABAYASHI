import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../Navbar';
import ScrollProgress from '../ScrollProgress';
import Footer from '../Footer';
import { trackPageView } from '../../utils/Analytics';

const Layout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const { i18n } = useTranslation();

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 页面切换时的追踪
  useEffect(() => {
    // 追踪页面浏览
    trackPageView(location.pathname);
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 overflow-x-hidden">
      {/* 滚动进度条 */}
      <ScrollProgress />
      
      {/* 背景装饰元素 - 白色主题 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 主装饰圆形 */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-green/3 to-light-green/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-sage-green/3 to-accent-green/4 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-light-green/2 to-sage-green/3 rounded-full blur-2xl"></div>
        
        {/* 次要装饰元素 */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-green/2 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-sage-green/2 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-16 w-24 h-24 bg-light-green/3 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-accent-green/2 rounded-full blur-lg"></div>
        
        {/* 微妙的网格背景 */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(26, 77, 50, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26, 77, 50, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* 导航栏 */}
      <Navbar 
        scrollY={scrollY}
        currentPath={location.pathname}
      />
      
      {/* 主要内容区域 */}
      <main className="relative z-10">
        {children}
      </main>
      
      {/* 页脚 */}
      <Footer />
    </div>
  );
};

export default Layout;