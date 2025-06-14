// src/pages/About.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/Analytics';
import { useCompanyInfo, useTeamMembers } from '../hooks/useCMSContent';

const About = ({ dict }) => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRef = useRef(null);

  // 安全获取数据的函数
  const safeGet = (obj, path, defaultValue = '') => {
    try {
      const keys = path.split('.');
      let result = obj;
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          return defaultValue;
        }
      }
      return result !== undefined && result !== null ? result : defaultValue;
    } catch (error) {
      console.warn('SafeGet error:', error);
      return defaultValue;
    }
  };

  // 从CMS加载公司信息
  const { content: cmsCompanyInfo } = useCompanyInfo();
  const { content: cmsTeamMembers } = useTeamMembers();

  // 将CMS字段映射为组件使用的字段
  const mappedCompanyInfo = useMemo(
    () => ({
      name: safeGet(cmsCompanyInfo, 'company_name', ''),
      englishName: safeGet(cmsCompanyInfo, 'english_name', ''),
      established: safeGet(cmsCompanyInfo, 'established_year', ''),
      headquarters: safeGet(cmsCompanyInfo, 'headquarters', ''),
      business: safeGet(cmsCompanyInfo, 'main_business', '')
    }),
    [cmsCompanyInfo]
  );

  // 提取并排序团队成员
  const teamMembers = useMemo(
    () =>
      Array.isArray(cmsTeamMembers?.members)
        ? [...cmsTeamMembers.members].sort((a, b) =>
            (a.order || 0) - (b.order || 0)
          )
        : [],
    [cmsTeamMembers]
  );

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

  // 安全获取数组翻译
  const safeTArray = (key, defaultArray = []) => {
    try {
      const translation = t(key, { returnObjects: true });
      return Array.isArray(translation) ? translation : defaultArray;
    } catch (error) {
      console.warn(`Translation array error for key: ${key}`, error);
      return defaultArray;
    }
  };

  // 获取 about 数据，带默认值，并与CMS数据合并
  const aboutData = useMemo(() => {
    const base = {
      title: safeT('about.title', '关于我们'),
      subtitle: safeT('about.subtitle', '年轻而充满活力的中日贸易桥梁'),
      companyInfo: {
        name: safeT('about.companyInfo.name', '岩林株式会社'),
        englishName: safeT('about.companyInfo.englishName', 'IWABAYASHI Corporation'),
        established: safeT('about.companyInfo.established', '2025年'),
        headquarters: safeT('about.companyInfo.headquarters', '日本'),
        business: safeT('about.companyInfo.business', '中日双边贸易综合服务')
      },
      description: safeT('about.description', '岩林株式会社成立于2025年，总部位于日本。作为一家致力于中日双边贸易的综合性贸易公司，我们秉持专业、高效、共赢的经营理念，积极拓展国际市场资源，搭建中日商品流通的桥梁。'),
      philosophy: {
        title: safeT('about.philosophy.title', '经营理念'),
        values: safeTArray('about.philosophy.values', ['专业', '高效', '共赢']),
        descriptions: safeTArray('about.philosophy.descriptions', [
        '以专业为基础，提供高质量服务',
        '追求高效率，创造更大价值', 
        '与合作伙伴共同成长发展'
      ])
    },
    vision: {
      title: safeT('about.vision.title', '公司愿景'),
      content: safeT('about.vision.content', '搭建中日优质商品流通桥梁，促进两国经贸繁荣，成为具有国际影响力的贸易服务商。')
    },
    mission: {
      title: safeT('about.mission.title', '公司使命'),
      content: safeT('about.mission.content', '精选全球好产品，服务中国与日本市场，创造更高品质的生活价值。')
    },
    team: {
      title: safeT('about.team.title', '团队特色'),
      content: safeT('about.team.content', '作为一家年轻而充满活力的公司，我们拥有开放务实的团队，致力于为合作伙伴提供专业的市场咨询、灵活的供应链管理与高效的进出口服务。我们坚信，通过不断的努力与积累，必将赢得市场的信任与支持，成为中日贸易领域值得依赖的合作伙伴。'),
      traits: safeTArray('about.team.traits', ['开放务实', '专业服务', '持续成长', '合作共赢'])
    },
    teamMembersTitle: safeT('about.teamMembersTitle', '团队成员'),
    overview: {
      title: safeT('about.overview.title', '公司简介'),
      establishedTime: safeT('about.overview.establishedTime', '成立时间'),
      headquarters: safeT('about.overview.headquarters', '总部位置'),
      businessScope: safeT('about.overview.businessScope', '业务领域'),
      features: safeTArray('about.overview.features', ['专业团队', '优质服务', '创新理念', '持续发展'])
    },
    cta: {
      title: safeT('about.cta.title', '准备与我们合作了吗？'),
      description: safeT('about.cta.description', '我们期待与您建立长期合作关系，共同开拓中日贸易新机遇'),
      learnServices: safeT('about.cta.learnServices', '了解我们的服务')
    }
    };
    return { ...base, companyInfo: { ...base.companyInfo, ...mappedCompanyInfo } };
  }, [i18n.language, mappedCompanyInfo]);

  // 可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    trackEvent('about_page_viewed');
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    trackEvent('about_tab_clicked', { tab });
  };

  // 标签页配置
  const tabs = [
    { 
      id: 'overview', 
      label: safeT('about.tabs.overview', '公司概要'), 
      icon: '🏢' 
    },
    { 
      id: 'vision', 
      label: safeT('about.tabs.vision', '愿景使命'), 
      icon: '🎯' 
    },
    { 
      id: 'team', 
      label: safeT('about.tabs.team', '团队特色'), 
      icon: '👥' 
    },
    { 
      id: 'philosophy', 
      label: safeT('about.tabs.philosophy', '经营理念'), 
      icon: '💡' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-800/5 to-green-800/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-slate-600/5 to-gray-700/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 via-slate-700 to-green-800 bg-clip-text text-transparent">
                {aboutData.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              {aboutData.subtitle}
            </p>
            
            {/* 公司标识 */}
            <div className={`mt-12 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="flex items-center justify-center space-x-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden bg-white border border-gray-200">
                  <img 
                    src="/logo.png" 
                    alt={`${aboutData.companyInfo.name} Logo`}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-20 h-20 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl items-center justify-center text-white font-bold text-3xl hidden"
                  >
                    岩
                  </div>
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

      {/* 标签页导航 */}
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
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">
                      {aboutData.overview.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {aboutData.description}
                    </p>
                  </div>

                  {/* 公司信息卡片 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <span className="text-gray-500">{aboutData.overview.establishedTime}</span>
                      <span className="text-gray-800 font-semibold">{aboutData.companyInfo.established}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <span className="text-gray-500">{aboutData.overview.headquarters}</span>
                      <span className="text-gray-800 font-semibold">{aboutData.companyInfo.headquarters}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <span className="text-gray-500">{aboutData.overview.businessScope}</span>
                      <span className="text-gray-800 font-semibold">{aboutData.companyInfo.business}</span>
                    </div>
                  </div>
                </div>

                {/* 右侧：视觉展示 */}
                <div className="relative">
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg mx-auto overflow-hidden bg-white border border-gray-200">
                        <img 
                          src="/logo.png" 
                          alt={`${aboutData.companyInfo.name} Logo`}
                          className="w-20 h-20 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-24 h-24 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl items-center justify-center text-white font-bold text-4xl hidden"
                        >
                          岩
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{aboutData.companyInfo.name}</h3>
                      <p className="text-green-800 text-lg">{aboutData.companyInfo.englishName}</p>
                    </div>

                    {/* 核心数据 */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">2025</div>
                        <div className="text-sm text-gray-500">{safeT('about.overview.coreData.foundedYear', '成立年份')}</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">100%</div>
                        <div className="text-sm text-gray-500">{safeT('about.overview.coreData.dedication', '专注度')}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {aboutData.overview.features.map((feature, index) => (
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
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto overflow-hidden bg-white border border-gray-200 shadow-lg">
                    <img 
                      src="/logo.png" 
                      alt={`${aboutData.companyInfo.name} Logo`}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-20 h-20 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl items-center justify-center text-white font-bold text-3xl hidden"
                    >
                      岩
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-8 mt-6">{aboutData.team.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {aboutData.team.content}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {aboutData.team.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* 团队成员展示 */}
                  {teamMembers.length > 0 && (
                    <div className="mt-12">
                      <h4 className="text-2xl font-bold text-gray-800 mb-6">
                        {aboutData.teamMembersTitle}
                      </h4>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, idx) => (
                          <div
                            key={idx}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center"
                          >
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-800 to-green-800 text-white flex items-center justify-center text-xl mb-4">
                              {member.name?.charAt(0) || ''}
                            </div>
                            <h5 className="text-lg font-bold text-gray-800 mb-1">
                              {member.name}
                            </h5>
                            <p className="text-green-800 mb-2 text-sm">
                              {member.position}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                              {member.bio}
                            </p>
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="text-sm text-gray-500 hover:text-green-800"
                              >
                                {member.email}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                        {aboutData.philosophy.descriptions[index]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            {aboutData.cta.title}
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {aboutData.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/services"
              onClick={() => trackEvent('about_to_services_clicked')}
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {aboutData.cta.learnServices}
            </Link>
            <Link
              to="/contact"
              onClick={() => trackEvent('about_to_contact_clicked')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              {safeT('navigation.contact', '联系我们')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
