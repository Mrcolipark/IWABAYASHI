import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/Analytics';

const Navbar = ({ lang, setLang, scrollY, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // 导航项配置
  const navItems = [
    { id: 'home', path: '/', labelKey: 'home' },
    { id: 'about', path: '/about', labelKey: 'about' },
    { id: 'services', path: '/services', labelKey: 'services' },
    { id: 'news', path: '/news', labelKey: 'news' },
    { id: 'contact', path: '/contact', labelKey: 'contact' }
  ];

  // 多语言标签
  const getNavLabel = (labelKey) => {
    const labels = {
      zh: { 
        home: '首页', 
        about: '会社概要', 
        services: '事业内容', 
        news: 'ニュース', 
        contact: 'お問い合わせ' 
      },
      ja: { 
        home: 'ホーム', 
        about: '会社概要', 
        services: '事業内容', 
        news: 'ニュース', 
        contact: 'お問い合わせ' 
      },
      en: { 
        home: 'Home', 
        about: 'About', 
        services: 'Services', 
        news: 'News', 
        contact: 'Contact' 
      }
    };
    return labels[lang][labelKey] || labelKey;
  };

  // 滚动监听
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // 语言切换
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    trackEvent('language_changed', { from: lang, to: newLang });
    setIsOpen(false);
  };

  // 菜单项点击
  const handleMenuClick = (item) => {
    trackEvent('navigation_click', { 
      from: location.pathname, 
      to: item.path,
      section: item.id 
    });
    setIsOpen(false);
  };

  // 检查当前路径是否激活
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'nav-glass shadow-2xl border-b border-forest/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* 左侧Logo区域 */}
          <Link 
            to="/"
            className="flex items-center space-x-3 group hover:opacity-80 transition-opacity duration-300"
            onClick={() => trackEvent('logo_clicked')}
          >
            <div className="relative">
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="岩林株式会社Logo" 
                  className="h-10 md:h-12 w-auto object-contain"
                  onError={() => setLogoError(true)} 
                  draggable={false}
                />
              ) : (
                <div className="h-10 md:h-12 w-10 md:w-12 bg-gradient-to-br from-forest to-jade rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">岩</span>
                </div>
              )}
              {/* Logo发光效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest to-jade rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg md:text-xl font-bold text-white group-hover:text-moss transition-colors duration-300">
                岩林株式会社
              </span>
            </div>
          </Link>

          {/* 中间标题 */}
          <div className="hidden lg:block">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-moss tracking-wide">
              IWABAYASHI
            </h1>
          </div>

          {/* 右侧菜单区域 */}
          <div className="flex items-center space-x-4">
            
            {/* 桌面端语言切换 */}
            <div className="hidden md:flex items-center space-x-2 glass rounded-lg p-1">
              {['zh', 'ja', 'en'].map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => handleLanguageChange(langCode)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                    lang === langCode
                      ? 'bg-moss text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-forest/50'
                  }`}
                >
                  {langCode === 'zh' ? '中' : langCode === 'ja' ? '日' : 'EN'}
                </button>
              ))}
            </div>

            {/* 汉堡菜单按钮 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 rounded-lg glass hover:bg-forest/30 transition-all duration-300 group"
              aria-label="菜单"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* 下拉菜单 */}
        <div className={`absolute top-full right-0 mt-2 w-80 md:w-96 transition-all duration-300 transform origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}>
          <div className="glass rounded-2xl shadow-2xl border border-forest/20 overflow-hidden">
            
            {/* 菜单标题 */}
            <div className="px-6 py-4 bg-gradient-to-r from-forest to-jade">
              <h3 className="text-white font-bold text-lg">メニュー</h3>
            </div>

            {/* 导航链接 */}
            <div className="py-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleMenuClick(item)}
                  className={`block px-6 py-3 font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-moss bg-moss/10 border-l-4 border-moss'
                      : 'text-gray-300 hover:text-moss hover:bg-forest/20'
                  } ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms' 
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    <span>{getNavLabel(item.labelKey)}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* 移动端语言切换 */}
            <div className="md:hidden px-6 py-4 border-t border-forest/20">
              <p className="text-gray-400 text-sm mb-3">言語 / Language</p>
              <div className="flex space-x-2">
                {['zh', 'ja', 'en'].map((langCode) => (
                  <button
                    key={langCode}
                    onClick={() => handleLanguageChange(langCode)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      lang === langCode
                        ? 'bg-moss text-white'
                        : 'bg-forest/30 text-gray-400 hover:text-white hover:bg-forest/50'
                    }`}
                  >
                    {langCode === 'zh' ? '中文' : langCode === 'ja' ? '日本語' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            {/* 联系信息 */}
            <div className="px-6 py-4 bg-charcoal/50 border-t border-forest/20">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span>📧</span>
                <span>info@iwabayashi.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400 mt-2">
                <span>📞</span>
                <span>+81-3-1234-5678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;