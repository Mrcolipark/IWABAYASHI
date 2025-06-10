import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/Analytics';

const Services = ({ dict }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('current');
  const sectionRef = useRef(null);
  const servicesData = dict.services;

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
    trackEvent('services_page_viewed');

    return () => observer.disconnect();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    trackEvent('service_category_changed', { category });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 - 白色主题 */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-green-600/5 to-green-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-green-500/5 to-green-700/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-green-800 bg-clip-text text-transparent">
                {servicesData.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {servicesData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 业务分类切换 - 白色主题 */}
      <section className="relative py-8 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleCategoryChange('current')}
              className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'current'
                  ? 'bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm'
              }`}
            >
              <span className="text-2xl">🏥</span>
              <span>{servicesData.currentBusiness.title}</span>
            </button>
            <button
              onClick={() => handleCategoryChange('future')}
              className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'future'
                  ? 'bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm'
              }`}
            >
              <span className="text-2xl">🚢</span>
              <span>{servicesData.futureBusiness.title}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 主要服务内容 */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* 当前业务 */}
          {selectedCategory === 'current' && (
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              {servicesData.currentBusiness.services.map((service, index) => (
                <div key={index} className="mb-16">
                  
                  {/* 服务标题区域 */}
                  <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        🏥
                      </div>
                      <div className="text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{service.title}</h2>
                        <span className="px-4 py-1 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* 左侧：服务详情 */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">服务介绍</h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                          {service.description}
                        </p>
                      </div>

                      {/* 核心特性 */}
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-6">核心特性</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm">
                              <div className="w-2 h-2 bg-green-800 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 服务优势 */}
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-6">服务优势</h4>
                        <div className="space-y-3">
                          {service.advantages.map((advantage, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 border-l-4 border-green-800 bg-green-50 rounded-r-lg">
                              <span className="text-green-800 mt-1">✓</span>
                              <span className="text-gray-700">{advantage}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA按钮 */}
                      <div className="pt-6">
                        <Link
                          to="/contact"
                          onClick={() => trackEvent('service_cta_clicked', { service: service.title })}
                          className="inline-block px-8 py-4 bg-gradient-to-r from-gray-800 to-green-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg"
                        >
                          立即咨询此服务
                        </Link>
                      </div>
                    </div>

                    {/* 右侧：可视化展示 */}
                    <div className="relative">
                      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                        
                        {/* 服务流程图 */}
                        <div className="text-center mb-8">
                          <h4 className="text-xl font-bold text-gray-800 mb-6">服务流程</h4>
                          <div className="space-y-4">
                            {[
                              { step: 1, title: '产品甄选', desc: '严格筛选优质产品' },
                              { step: 2, title: '质量检测', desc: '全面质量控制检测' },
                              { step: 3, title: '进口代理', desc: '专业进口手续办理' },
                              { step: 4, title: '市场推广', desc: '协助产品市场推广' }
                            ].map((item, i) => (
                              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-green-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {item.step}
                                </div>
                                <div className="text-left">
                                  <div className="font-semibold text-gray-800">{item.title}</div>
                                  <div className="text-sm text-gray-500">{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 关键指标 */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-800">98%</div>
                            <div className="text-sm text-gray-500">质量合格率</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-800">30天</div>
                            <div className="text-sm text-gray-500">平均周期</div>
                          </div>
                        </div>
                      </div>

                      {/* 装饰元素 */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-600/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 未来业务 */}
          {selectedCategory === 'future' && (
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              {servicesData.futureBusiness.services.map((service, index) => (
                <div key={index} className="mb-16">
                  
                  {/* 服务标题区域 */}
                  <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-slate-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        🚢
                      </div>
                      <div className="text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{service.title}</h2>
                        <span className="px-4 py-1 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-sm font-medium">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* 左侧：规划详情 */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">业务规划</h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                          {service.description}
                        </p>
                      </div>

                      {/* 规划特色 */}
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-6">规划特色</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm">
                              <div className="w-2 h-2 bg-slate-600 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 发展优势 */}
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-6">发展优势</h4>
                        <div className="space-y-3">
                          {service.advantages.map((advantage, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 border-l-4 border-slate-600 bg-slate-50 rounded-r-lg">
                              <span className="text-slate-700 mt-1">⭐</span>
                              <span className="text-gray-700">{advantage}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 合作咨询 */}
                      <div className="pt-6">
                        <Link
                          to="/contact"
                          onClick={() => trackEvent('future_service_inquiry_clicked', { service: service.title })}
                          className="inline-block px-8 py-4 bg-gradient-to-r from-slate-700 to-gray-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg"
                        >
                          合作咨询
                        </Link>
                      </div>
                    </div>

                    {/* 右侧：发展计划 */}
                    <div className="relative">
                      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                        
                        {/* 发展时间线 */}
                        <div className="text-center mb-8">
                          <h4 className="text-xl font-bold text-gray-800 mb-6">发展时间线</h4>
                          <div className="space-y-6">
                            {[
                              { phase: '第一阶段', title: '市场调研', desc: '深入了解目标市场', time: '2025 Q1-Q2' },
                              { phase: '第二阶段', title: '渠道建立', desc: '构建稳定销售渠道', time: '2025 Q3-Q4' },
                              { phase: '第三阶段', title: '业务扩展', desc: '全面开展出口业务', time: '2026年' },
                              { phase: '第四阶段', title: '规模化运营', desc: '实现规模化稳定运营', time: '2027年+' }
                            ].map((item, i) => (
                              <div key={i} className="relative">
                                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                  <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-gray-800 rounded-xl flex items-center justify-center text-white font-bold text-xs text-center leading-tight">
                                    {i + 1}
                                  </div>
                                  <div className="flex-1 text-left">
                                    <div className="font-semibold text-gray-800">{item.title}</div>
                                    <div className="text-sm text-gray-500 mb-1">{item.desc}</div>
                                    <div className="text-xs text-slate-600">{item.time}</div>
                                  </div>
                                </div>
                                {i < 3 && (
                                  <div className="absolute left-6 top-16 w-0.5 h-6 bg-gradient-to-b from-slate-700 to-gray-800"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 预期指标 */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-slate-700">5+</div>
                            <div className="text-sm text-gray-500">目标市场</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-slate-700">100+</div>
                            <div className="text-sm text-gray-500">合作企业</div>
                          </div>
                        </div>
                      </div>

                      {/* 装饰元素 */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 服务能力展示 */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {servicesData.serviceCapabilities.title}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们具备全方位的专业服务能力，为客户提供一站式贸易解决方案
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.serviceCapabilities.capabilities.map((capability, index) => (
              <div key={index} className="text-center">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-green-800 rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto">
                    {['💼', '⚡', '🎯'][index]}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{capability.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">开始您的贸易合作之旅</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            无论是现有业务还是未来规划，我们都准备好为您提供专业的贸易服务
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              onClick={() => trackEvent('services_to_contact_clicked')}
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              立即咨询服务
            </Link>
            <Link
              to="/about"
              onClick={() => trackEvent('services_to_about_clicked')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
            >
              了解我们
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;