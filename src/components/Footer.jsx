import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // 安全的翻译函数
  const safeT = (key, defaultValue = '') => {
    try {
      const translation = t(key);
      return translation === key ? defaultValue : translation;
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return defaultValue;
    }
  };

  // 导航链接
  const navLinks = [
    { path: '/', label: safeT('navigation.home', '首页') },
    { path: '/about', label: safeT('navigation.about', '会社概要') },
    { path: '/services', label: safeT('navigation.services', '事业内容') },
    { path: '/news', label: safeT('navigation.news', 'ニュース') },
    { path: '/contact', label: safeT('navigation.contact', 'お問い合わせ') }
  ];

  // 社交媒体链接
  const socialLinks = [
    { 
      name: 'Email', 
      icon: '📧', 
      href: `mailto:${safeT('contact.info.email', 'info@iwabayashi.com')}` 
    },
    { 
      name: 'Phone', 
      icon: '📞', 
      href: `tel:${safeT('contact.info.phone', '+81-3-1234-5678')}` 
    },
    { name: 'WeChat', icon: '💬', href: '#wechat' }
  ];

  // 业务内容列表
  const businessItems = [
    safeT('footer.businessItems.0', '日本保健品进口代理'),
    safeT('footer.businessItems.1', '中国大宗商品出口'),
    safeT('footer.businessItems.2', '市场咨询服务'),
    safeT('footer.businessItems.3', '供应链管理')
  ];

  return (
    <footer className="relative bg-white/95 backdrop-blur-sm border-t border-gray-200">
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* 公司信息 */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white shadow-sm">
                <img 
                  src="/logo.png" 
                  alt={`${safeT('about.companyInfo.name', '岩林株式会社')} Logo`}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-500 rounded-xl items-center justify-center text-white font-bold text-xl hidden"
                >
                  岩
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-green-800">IWABAYASHI</span>
                <div className="text-sm text-green-900">
                  {safeT('about.companyInfo.name', '岩林株式会社')}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {safeT('footer.description', '岩林株式会社致力于成为中日贸易领域最受信赖的合作伙伴，为客户提供专业、高效的贸易解决方案。')}
            </p>
            
            {/* 社交媒体 */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 hover:bg-green-50 border border-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-300"
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-700">
              {safeT('footer.quickLinks', '快速链接')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 业务内容 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-700">
              {safeT('footer.business', '业务内容')}
            </h3>
            <ul className="space-y-3 text-gray-600">
              {businessItems.map((item, index) => (
                <li key={index} className="hover:text-green-600 transition-colors duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-700">
              {safeT('footer.contact', '联系方式')}
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">📧</span>
                <div>
                  <div className="text-sm text-gray-500">
                    {safeT('footer.contactItems.email', '邮箱')}
                  </div>
                  <a 
                    href={`mailto:${safeT('contact.info.email', 'info@iwabayashi.com')}`}
                    className="hover:text-green-600 transition-colors duration-300"
                  >
                    {safeT('contact.info.email', 'info@iwabayashi.com')}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">📞</span>
                <div>
                  <div className="text-sm text-gray-500">
                    {safeT('footer.contactItems.phone', '电话')}
                  </div>
                  <a 
                    href={`tel:${safeT('contact.info.phone', '+81-3-1234-5678')}`}
                    className="hover:text-green-600 transition-colors duration-300"
                  >
                    {safeT('contact.info.phone', '+81-3-1234-5678')}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">📍</span>
                <div>
                  <div className="text-sm text-gray-500">
                    {safeT('footer.contactItems.address', '地址')}
                  </div>
                  <p className="text-sm leading-relaxed">
                    {safeT('contact.info.address', '日本东京都港区赤坂1-2-3 岩林大厦10F')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">🕒</span>
                <div>
                  <div className="text-sm text-gray-500">
                    {safeT('footer.contactItems.hours', '营业时间')}
                  </div>
                  <p className="text-sm">
                    {safeT('contact.info.businessHours', '周一至周五 9:00-18:00 (JST)')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部版权区域 */}
      <div className="border-t border-gray-200 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* 版权信息 */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} {safeT('about.companyInfo.name', '岩林株式会社')} (IWABAYASHI Corporation). All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {safeT('footer.tagline', '专业的中日贸易综合服务商')}
              </p>
            </div>
            
            {/* 法律链接 */}
            <div className="flex space-x-6 text-sm">
              <a 
                href="/privacy" 
                className="text-gray-500 hover:text-green-600 transition-colors duration-300"
              >
                {safeT('footer.links.privacy', '隐私政策')}
              </a>
              <a 
                href="/terms" 
                className="text-gray-500 hover:text-green-600 transition-colors duration-300"
              >
                {safeT('footer.links.terms', '使用条款')}
              </a>
              <a 
                href="/sitemap" 
                className="text-gray-500 hover:text-green-600 transition-colors duration-300"
              >
                {safeT('footer.links.sitemap', '网站地图')}
              </a>
            </div>
          </div>
          
          {/* 备案信息 */}
          <div className="text-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-400 text-xs">
              {safeT('footer.builtWith', 'Built with ❤️ for connecting China and Japan')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;