import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import langData from '../i18n/langData';

const Navbar = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const menuRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const lastMenuItemRef = useRef(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    const handleEscape = e => { if (e.key === 'Escape') closeMenu(); };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      firstMenuItemRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, closeMenu]);

  const handleMenuKeyDown = e => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstMenuItemRef.current) {
        e.preventDefault(); lastMenuItemRef.current.focus();
      } else if (!e.shiftKey && document.activeElement === lastMenuItemRef.current) {
        e.preventDefault(); firstMenuItemRef.current.focus();
      }
    }
  };

  const scrollToSection = useCallback(item => {
    const sectionId = item.toLowerCase().replace(/\s+/g, '');
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu();
  }, [closeMenu]);

  return (
    <nav ref={menuRef} className="flex justify-between items-center px-4 md:px-8 py-4 bg-gray-900 text-gray-100 sticky top-0 z-50 shadow-lg">
      {/* Logo */}
      <a href="#top" className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded">
        {!logoError ? (
          <img src="/logo.png" alt="岩林株式会社Logo" className="h-8 md:h-10 w-auto" onError={() => setLogoError(true)} draggable={false}/>
        ) : (
          <div className="h-8 md:h-10 w-8 md:w-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">岩</span>
          </div>
        )}
        <span className="text-lg md:text-xl font-bold tracking-wide">岩林株式会社</span>
      </a>

      {/* 中央标题（桌面） */}
      <div className="hidden lg:block text-xl xl:text-2xl font-extrabold text-emerald-400">IWABAYASHI</div>

      {/* 菜单按钮 */}
      <div className="relative">
        <button
          aria-expanded={open}
          aria-controls="navbar-menu"
          className="p-2 rounded-md bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>

        <div
          id="navbar-menu"
          className={`absolute top-12 right-0 w-56 md:w-64 bg-gradient-to-br from-green-800 to-gray-900 rounded-lg shadow-xl py-4 transition-all duration-300 ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
          onKeyDown={handleMenuKeyDown}
        >
          {langData[lang].menu.map((item, idx) => (
            <button
              key={idx}
              ref={
                idx === 0
                  ? firstMenuItemRef
                  : idx === langData[lang].menu.length - 1
                  ? lastMenuItemRef
                  : null
              }
              onClick={() => scrollToSection(item)}
              className={`block w-full text-left px-6 py-2 mb-1 font-semibold hover:text-emerald-400 hover:bg-green-700/30 focus:outline-none focus:bg-green-700/50 focus:text-emerald-300 transition-colors ${
                open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
              style={{ transitionDelay: open ? `${idx * 50}ms` : '0ms' }}
            >
              {item}
            </button>
          ))}

          {/* 语言切换 */}
          <div className="flex gap-2 px-4 pt-3 mt-2 border-t border-green-600">
            {["zh", "ja", "en"].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-current={lang === l ? "true" : "false"}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  lang === l
                    ? "bg-green-600 text-white shadow-md"
                    : "hover:bg-green-600/50 border border-green-600"
                }`}
              >
                {l === "zh" ? "中文" : l === "ja" ? "日本語" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  lang: PropTypes.oneOf(["zh", "ja", "en"]).isRequired,
  setLang: PropTypes.func.isRequired
};

export default Navbar;
