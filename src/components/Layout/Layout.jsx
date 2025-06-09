import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import ParticleBackground from '../ParticleBackground';
import ScrollProgress from '../ScrollProgress';
import Footer from '../Footer';
import { trackPageView } from '../../utils/Analytics';

const Layout = ({ children, lang, setLang, dict }) => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

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
    <div className="min-h-screen bg-charcoal text-gray-100 overflow-x-hidden">
      {/* 滚动进度条 */}
      <ScrollProgress />
      
      {/* 粒子背景 */}
      <ParticleBackground />
      
      {/* 导航栏 */}
      <Navbar 
        lang={lang} 
        setLang={setLang}
        scrollY={scrollY}
        currentPath={location.pathname}
      />
      
      {/* 主要内容区域 */}
      <main className="relative z-10">
        {children}
      </main>
      
      {/* 页脚 */}
      <Footer dict={dict} />
    </div>
  );
};

export default Layout;