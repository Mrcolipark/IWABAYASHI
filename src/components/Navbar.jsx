import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/Analytics';
import { safeGet, getMenuLabel, safeArrayGet } from '../utils/dictUtils';

const Navbar = ({ lang, setLang, scrollY, currentPath, dict }) => {
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

  // 多语言标签 - 使用安全访问
  const getNavLabel = (labelKey, index) => {
    // 首先尝试从字典的menu数组获取
    const menuItem = safeArrayGet(safeGet(dict, 'menu', []), index, null);
    if (menuItem) {
      return menuItem;
    }

    // 如果menu数组不可用，使用备用标签
    const labels = {
      zh: { 
        home: '首页', 
        about: '关于我们', 
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
    
    return safeGet(labels, `${lang}.${labelKey}`, labelKey);
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
    if (typeof setLang === 'function') {
      setLang(newLang);
      trackEvent('language_changed', { from: lang, to: newLang });
    }
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

  // 安全获取公司名称
  const getCompanyName = () => {
    return safeGet(dict, 'about.companyInfo.name', '岩林株式会社');
  };

  // 安全获取联系信息
  const getContactEmail = () => {
    return safeGet(dict, 'contact.info.email', 'info@iwabayashi.com');
  };

  const getContactPhone = () => {
    return safeGet(dict, 'contact.info.phone', '+81-3-1234-5678');
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'nav-glass-scrolled shadow-brand-medium' 
          : 'nav-glass-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* 左侧Logo区域 - 高级设计 */}
          <Link 
            to="/"
            className="flex items-center space-x-4 group hover:opacity-90 transition-all duration-300"
            onClick={() => trackEvent('logo_clicked')}
          >
            <div className="relative">
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt={`${getCompanyName()}Logo`}
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={() => setLogoError(true)} 
                  draggable={false}
                />
              ) : (
                <div className="h-12 w-12 bg-gradient-brand rounded-xl flex items-center justify-center shadow-brand">
                  <span className="text-white font-bold text-xl">岩</span>
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <span className="company-name font-elegant text-base text-brand-green">
                {getCompanyName()}
              </span>
            </div>
          </Link>

          {/* 中间品牌标识 - 超高级字体 */}
          <div className="hidden lg:block">
            <h1 className="brand-center text-brand-green">
              IWABAYASHI
            </h1>
          </div>

          {/* 右侧控制区域 */}
          <div className="flex items-center space-x-6">
            
            {/* 桌面端语言切换 - 修复颜色对比 */}
            <div className="hidden md:flex items-center space-x-1 bg-white/90 border border-gray-200 rounded-xl p-1 shadow-sm">
              {[
                { code: 'zh', label: '中' },
                { code: 'ja', label: '日' },
                { code: 'en', label: 'EN' }
              ].map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    lang === language.code
                      ? 'bg-brand-green text-white shadow-md'
                      : 'text-brand-green hover:bg-gray-100'
                  }`}
                >
                  {language.label}
                </button>
              ))}
            </div>

            {/* 汉堡菜单按钮 - 修复颜色 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 rounded-xl bg-white/90 border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm"
              aria-label="菜单"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`w-full h-0.5 bg-brand-green transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-brand-green transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-brand-green transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* 下拉菜单 - 高级设计 */}
        <div className={`absolute top-full right-0 mt-2 w-80 md:w-96 transition-all duration-300 transform origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            
            {/* 菜单标题 - 修复颜色 */}
            <div className="px-6 py-5 bg-brand-green">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">岩</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">IWABAYASHI</h3>
                  <p className="text-white/90 text-xs font-elegant">岩林株式会社</p>
                </div>
              </div>
            </div>

            {/* 导航链接 - 修复颜色 */}
            <div className="py-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleMenuClick(item)}
                  className={`block px-6 py-4 font-medium transition-all duration-300 group ${
                    isActive(item.path)
                      ? 'text-brand-green bg-green-50 border-l-4 border-brand-green'
                      : 'text-gray-700 hover:text-brand-green hover:bg-gray-50'
                  } ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms' 
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive(item.path) ? 'bg-brand-green' : 'bg-gray-400 group-hover:bg-brand-green'
                    }`}></span>
                    <span className="font-elegant">{getNavLabel(item.labelKey, index)}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* 移动端语言切换 - 修复颜色 */}
            <div className="md:hidden px-6 py-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-3 font-elegant">
                言語 / Language
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'zh', label: '中文' },
                  { code: 'ja', label: '日本語' },
                  { code: 'en', label: 'English' }
                ].map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      lang === language.code
                        ? 'bg-brand-green text-white'
                        : 'bg-gray-100 text-gray-700 hover:text-brand-green hover:bg-gray-200'
                    }`}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 联系信息 - 修复颜色 */}
            <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <span className="w-5 h-5 flex items-center justify-center bg-brand-green/10 rounded text-brand-green">📧</span>
                  <span className="text-gray-600 font-elegant">{getContactEmail()}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="w-5 h-5 flex items-center justify-center bg-brand-green/10 rounded text-brand-green">📞</span>
                  <span className="text-gray-600 font-elegant">{getContactPhone()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* 导航栏玻璃效果 */
        .nav-glass-transparent {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--border-light);
        }

        .nav-glass-scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(30px) saturate(200%);
          border-bottom: 1px solid var(--border-medium);
        }

        /* 高级公司名称字体 */
        .company-name {
          font-weight: 300;
          letter-spacing: 2px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .company-name:hover {
          letter-spacing: 3px;
          color: var(--light-green);
        }

        /* 超高级品牌中心字体 */
        .brand-center {
          font-family: 'Montserrat', 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 200;
          letter-spacing: 6px;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .brand-center:hover {
          letter-spacing: 8px;
          color: var(--light-green);
          transform: translateY(-1px);
        }

        .brand-center::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: var(--light-green);
          transition: width 0.4s ease;
        }

        .brand-center:hover::after {
          width: 100%;
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
          .company-name {
            font-size: 0.8rem;
            letter-spacing: 1px;
          }
          
          .brand-center {
            font-size: 1.2rem;
            letter-spacing: 4px;
          }
        }

        @media (max-width: 480px) {
          .company-name {
            font-size: 0.75rem;
            letter-spacing: 0.5px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;