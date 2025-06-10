import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/Analytics';

const About = ({ dict }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRef = useRef(null);
  const aboutData = dict.about;

  // 可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 追踪页面访问
    trackEvent('about_page_viewed');

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    trackEvent('about_tab_clicked', { tab });
  };

  // 标签页配置
  const tabs = [
    { id: 'overview', label: '公司概要', icon: '🏢' },
    { id: 'vision', label: '愿景使命', icon: '🎯' },
    { id: 'team', label: '团队特色', icon: '👥' },
    { id: 'philosophy', label: '经营理念', icon: '💡' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 - 白色主题 */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-brand-green/5 to-light-green/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-sage-green/5 to-accent-green/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-brand-green via-accent-green to-light-green bg-clip-text text-transparent">
                  {aboutData.title}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
                {aboutData.subtitle}
              </p>
            </div>
            
            {/* 公司标识 */}
            <div className={`mt-12 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="flex items-center justify-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-3xl">岩</span>
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-gray-800">IWABAYASHI</h2>
                  <p className="text-green-800 text-lg">{aboutData.companyInfo.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 标签页导航 - 白色主题 */}
      <section className="relative py-8 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* 公司概要 */}
          {activeTab === 'overview' && (
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* 左侧：公司介绍 */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">公司简介</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {aboutData.description}
                    </p>
                  </div>

                  {/* 公司信息卡片 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <span className="text-gray-500">成立时间</span>
                      <span className="text-gray-800 font-semibold">{aboutData.companyInfo.established}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <span className="text-gray-500">总部位置</span>
                      <span className="text-gray-800 font-semibold">{aboutData.companyInfo.headquarters}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <span className="text-gray-500">业务领域</span>
                      <span className="text-gray-800 font-semibold">{aboutData.companyInfo.business}</span>
                    </div>
                  </div>
                </div>

                {/* 右侧：视觉展示 */}
                <div className="relative">
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg">
                        岩
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{aboutData.companyInfo.name}</h3>
                      <p className="text-green-800 text-lg">{aboutData.companyInfo.englishName}</p>
                    </div>

                    {/* 核心数据 */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">2025</div>
                        <div className="text-sm text-gray-500">成立年份</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">100%</div>
                        <div className="text-sm text-gray-500">专注度</div>
                      </div>
                    </div>

                    {/* 业务特色 */}
                    <div className="space-y-3">
                      {['专业团队', '优质服务', '创新理念', '持续发展'].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-800 rounded-full"></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 装饰元素 */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-800/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gray-800/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* 愿景使命 */}
          {activeTab === 'vision' && (
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="grid md:grid-cols-2 gap-12">
                
                {/* 愿景 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-green-800 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">
                      🎯
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{aboutData.vision.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed text-center">
                    {aboutData.vision.content}
                  </p>
                </div>

                {/* 使命 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-slate-600 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">
                      🚀
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{aboutData.mission.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed text-center">
                    {aboutData.mission.content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 团队特色 */}
          {activeTab === 'team' && (
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-lg text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto">
                    👥
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-8">{aboutData.team.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {aboutData.team.content}
                  </p>
                  
                  {/* 团队特色标签 */}
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {['开放务实', '专业服务', '持续成长', '合作共赢'].map((trait, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 经营理念 */}
          {activeTab === 'philosophy' && (
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{aboutData.philosophy.title}</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {aboutData.philosophy.values.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-green-800 rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto">
                        {['💼', '⚡', '🤝'][index]}
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4">{value}</h4>
                      <p className="text-gray-600">
                        {['以专业为基础，提供高质量服务', '追求高效率，创造更大价值', '与合作伙伴共同成长发展'][index]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 行动号召区域 - 白色主题 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">准备与我们合作了吗？</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            我们期待与您建立长期合作关系，共同开拓中日贸易新机遇
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/services"
              onClick={() => trackEvent('about_to_services_clicked')}
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              了解我们的服务
            </Link>
            <Link
              to="/contact"
              onClick={() => trackEvent('about_to_contact_clicked')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;