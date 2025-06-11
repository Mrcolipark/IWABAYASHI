import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/Analytics';
import i18n from '../i18n';

const Navbar = ({ scrollY, currentPath }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // 导航项配置 - 使用新的翻译系统
  const navItems = [
    { id: 'home', path: '/', labelKey: 'navigation.home' },
    { id: 'about', path: '/about', labelKey: 'navigation.about' },
    { id: 'services', path: '/services', labelKey: 'navigation.services' },
    { id: 'news', path: '/news', labelKey: 'navigation.news' },
    { id: 'contact', path: '/contact', labelKey: 'navigation.contact' }
  ];

  // 滚动监听
  const [isScrolled, setIsScrolled] = useState(false);
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

  // 语言切换 - 添加安全检查
const handleLanguageChange = (newLang) => {
  console.log('Changing language to:', newLang);
  
  try {
    // 直接使用导入的 i18n 实例
    i18n.changeLanguage(newLang);
    console.log('Language changed successfully to:', newLang);
    trackEvent('language_changed', { from: i18n.language, to: newLang });
  } catch (error) {
    console.error('Language change failed:', error);
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

  // 获取当前语言，添加安全检查
const getCurrentLanguage = () => {
  return i18n.language || localStorage.getItem('i18nextLng') || 'zh';
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
          
          {/* 左侧Logo区域 */}
          <Link 
            to="/"
            className="flex items-center space-x-4 group hover:opacity-90 transition-all duration-300"
            onClick={() => trackEvent('logo_clicked')}
          >
            <div className="relative">
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="岩林株式会社Logo"
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
                {t('about.companyInfo.name', '岩林株式会社')}
              </span>
            </div>
          </Link>

          {/* 中间品牌标识 */}
          <div className="hidden lg:block">
            <h1 className="brand-center text-brand-green">
              IWABAYASHI
            </h1>
          </div>

          {/* 右侧控制区域 */}
          <div className="flex items-center space-x-6">
            
            {/* 桌面端语言切换 */}
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
                    getCurrentLanguage() === language.code
                      ? 'bg-brand-green text-white shadow-md'
                      : 'text-brand-green hover:bg-gray-100'
                  }`}
                >
                  {language.label}
                </button>
              ))}
            </div>

            {/* 汉堡菜单按钮 */}
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

        {/* 下拉菜单 */}
        <div className={`absolute top-full right-0 mt-2 w-80 md:w-96 transition-all duration-300 transform origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            
            {/* 菜单标题 */}
            <div className="px-6 py-5 bg-brand-green">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">岩</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">IWABAYASHI</h3>
                  <p className="text-white/90 text-xs font-elegant">
                    {t('about.companyInfo.name', '岩林株式会社')}
                  </p>
                </div>
              </div>
            </div>

            {/* 导航链接 */}
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
                    <span className="font-elegant">{t(item.labelKey, item.labelKey)}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* 移动端语言切换 */}
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
                      getCurrentLanguage() === language.code
                        ? 'bg-brand-green text-white'
                        : 'bg-gray-100 text-gray-700 hover:text-brand-green hover:bg-gray-200'
                    }`}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 联系信息 */}
            <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <span className="w-5 h-5 flex items-center justify-center bg-brand-green/10 rounded text-brand-green">📧</span>
                  <span className="text-gray-600 font-elegant">info@iwabayashi.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="w-5 h-5 flex items-center justify-center bg-brand-green/10 rounded text-brand-green">📞</span>
                  <span className="text-gray-600 font-elegant">+81-3-1234-5678</span>
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