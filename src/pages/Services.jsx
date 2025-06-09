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
    <div className="min-h-screen bg-charcoal pt-20">
      
      {/* Hero区域 */}
      <section className="relative py-24 bg-gradient-to-b from-slate to-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-forest/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-moss/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-forest via-moss to-sage bg-clip-text text-transparent">
                {servicesData.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {servicesData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 业务分类切换 */}
      <section className="relative py-8 bg-charcoal/90 backdrop-blur-sm border-y border-forest/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleCategoryChange('current')}
              className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'current'
                  ? 'bg-gradient-to-r from-forest to-moss text-white shadow-lg'
                  : 'bg-slate/50 text-gray-400 hover:text-white hover:bg-forest/30'
              }`}
            >
              <span className="text-2xl">🏥</span>
              <span>{servicesData.currentBusiness.title}</span>
            </button>
            <button
              onClick={() => handleCategoryChange('future')}
              className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'future'
                  ? 'bg-gradient-to-r from-forest to-moss text-white shadow-lg'
                  : 'bg-slate/50 text-gray-400 hover:text-white hover:bg-forest/30'
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
                      <div className="w-20 h-20 bg-gradient-to-br from-forest to-moss rounded-2xl flex items-center justify-center text-3xl shadow-2xl">
                        🏥
                      </div>
                      <div className="text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.title}</h2>
                        <span className="px-4 py-1 bg-moss/20 text-moss border border-moss/30 rounded-full text-sm font-medium">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* 左侧：服务详情 */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-moss mb-6">服务介绍</h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                          {service.description}
                        </p>
                      </div>

                      {/* 核心特性 */}
                      <div>
                        <h4 className="text-xl font-semibold text-moss mb-6">核心特性</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center space-x-3 p-4 glass rounded-lg hover:bg-forest/10 transition-colors duration-300">
                              <div className="w-2 h-2 bg-moss rounded-full flex-shrink-0"></div>
                              <span className="text-gray-200">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 服务优势 */}
                      <div>
                        <h4 className="text-xl font-semibold text-moss mb-6">服务优势</h4>
                        <div className="space-y-3">
                          {service.advantages.map((advantage, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 border-l-4 border-moss/30 bg-slate/20 rounded-r-lg">
                              <span className="text-moss mt-1">✓</span>
                              <span className="text-gray-300">{advantage}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA按钮 */}
                      <div className="pt-6">
                        <Link
                          to="/contact"
                          onClick={() => trackEvent('service_cta_clicked', { service: service.title })}
                          className="inline-block px-8 py-4 bg-gradient-to-r from-forest to-moss rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-2xl"
                        >
                          立即咨询此服务
                        </Link>
                      </div>
                    </div>

                    {/* 右侧：可视化展示 */}
                    <div className="relative">
                      <div className="glass rounded-2xl p-8 border border-forest/20">
                        
                        {/* 服务流程图 */}
                        <div className="text-center mb-8">
                          <h4 className="text-xl font-bold text-white mb-6">服务流程</h4>
                          <div className="space-y-4">
                            {[
                              { step: 1, title: '产品甄选', desc: '严格筛选优质产品' },
                              { step: 2, title: '质量检测', desc: '全面质量控制检测' },
                              { step: 3, title: '进口代理', desc: '专业进口手续办理' },
                              { step: 4, title: '市场推广', desc: '协助产品市场推广' }
                            ].map((item, i) => (
                              <div key={i} className="flex items-center space-x-4 p-3 bg-slate/30 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-r from-forest to-moss rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {item.step}
                                </div>
                                <div className="text-left">
                                  <div className="font-semibold text-white">{item.title}</div>
                                  <div className="text-sm text-gray-400">{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 关键指标 */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-slate/30 rounded-lg">
                            <div className="text-2xl font-bold text-moss">98%</div>
                            <div className="text-sm text-gray-400">质量合格率</div>
                          </div>
                          <div className="text-center p-4 bg-slate/30 rounded-lg">
                            <div className="text-2xl font-bold text-moss">30天</div>
                            <div className="text-sm text-gray-400">平均周期</div>
                          </div>
                        </div>
                      </div>

                      {/* 装饰元素 */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-moss/20 rounded-full blur-xl animate-pulse"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-forest/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
                      <div className="w-20 h-20 bg-gradient-to-br from-moss to-sage rounded-2xl flex items-center justify-center text-3xl shadow-2xl">
                        🚢
                      </div>
                      <div className="text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.title}</h2>
                        <span className="px-4 py-1 bg-sage/20 text-sage border border-sage/30 rounded-full text-sm font-medium">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* 左侧：规划详情 */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-moss mb-6">业务规划</h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                          {service.description}
                        </p>
                      </div>

                      {/* 规划特色 */}
                      <div>
                        <h4 className="text-xl font-semibold text-moss mb-6">规划特色</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center space-x-3 p-4 glass rounded-lg hover:bg-moss/10 transition-colors duration-300">
                              <div className="w-2 h-2 bg-sage rounded-full flex-shrink-0"></div>
                              <span className="text-gray-200">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 发展优势 */}
                      <div>
                        <h4 className="text-xl font-semibold text-moss mb-6">发展优势</h4>
                        <div className="space-y-3">
                          {service.advantages.map((advantage, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 border-l-4 border-sage/30 bg-slate/20 rounded-r-lg">
                              <span className="text-sage mt-1">⭐</span>
                              <span className="text-gray-300">{advantage}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 合作咨询 */}
                      <div className="pt-6">
                        <Link
                          to="/contact"
                          onClick={() => trackEvent('future_service_inquiry_clicked', { service: service.title })}
                          className="inline-block px-8 py-4 bg-gradient-to-r from-moss to-sage rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-2xl"
                        >
                          合作咨询
                        </Link>
                      </div>
                    </div>

                    {/* 右侧：发展计划 */}
                    <div className="relative">
                      <div className="glass rounded-2xl p-8 border border-moss/20">
                        
                        {/* 发展时间线 */}
                        <div className="text-center mb-8">
                          <h4 className="text-xl font-bold text-white mb-6">发展时间线</h4>
                          <div className="space-y-6">
                            {[
                              { phase: '第一阶段', title: '市场调研', desc: '深入了解目标市场', time: '2025 Q1-Q2' },
                              { phase: '第二阶段', title: '渠道建立', desc: '构建稳定销售渠道', time: '2025 Q3-Q4' },
                              { phase: '第三阶段', title: '业务扩展', desc: '全面开展出口业务', time: '2026年' },
                              { phase: '第四阶段', title: '规模化运营', desc: '实现规模化稳定运营', time: '2027年+' }
                            ].map((item, i) => (
                              <div key={i} className="relative">
                                <div className="flex items-start space-x-4 p-4 bg-slate/30 rounded-lg">
                                  <div className="w-12 h-12 bg-gradient-to-r from-moss to-sage rounded-xl flex items-center justify-center text-white font-bold text-xs text-center leading-tight">
                                    {i + 1}
                                  </div>
                                  <div className="flex-1 text-left">
                                    <div className="font-semibold text-white">{item.title}</div>
                                    <div className="text-sm text-gray-400 mb-1">{item.desc}</div>
                                    <div className="text-xs text-sage">{item.time}</div>
                                  </div>
                                </div>
                                {i < 3 && (
                                  <div className="absolute left-6 top-16 w-0.5 h-6 bg-gradient-to-b from-moss to-sage"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 预期指标 */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-slate/30 rounded-lg">
                            <div className="text-2xl font-bold text-sage">5+</div>
                            <div className="text-sm text-gray-400">目标市场</div>
                          </div>
                          <div className="text-center p-4 bg-slate/30 rounded-lg">
                            <div className="text-2xl font-bold text-sage">100+</div>
                            <div className="text-sm text-gray-400">合作企业</div>
                          </div>
                        </div>
                      </div>

                      {/* 装饰元素 */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-sage/20 rounded-full blur-xl animate-pulse"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-moss/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 服务能力展示 */}
      <section className="py-24 bg-gradient-to-b from-charcoal to-slate">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-moss mb-6">
              {servicesData.serviceCapabilities.title}
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              我们具备全方位的专业服务能力，为客户提供一站式贸易解决方案
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.serviceCapabilities.capabilities.map((capability, index) => (
              <div key={index} className="text-center">
                <div className="glass rounded-2xl p-8 border border-forest/20 hover:border-moss/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest to-moss rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto">
                    {['💼', '⚡', '🎯'][index]}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{capability.name}</h4>
                  <p className="text-gray-400 leading-relaxed">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="py-16 bg-gradient-to-r from-forest to-moss">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">开始您的贸易合作之旅</h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            无论是现有业务还是未来规划，我们都准备好为您提供专业的贸易服务
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              onClick={() => trackEvent('services_to_contact_clicked')}
              className="px-8 py-4 bg-white text-forest rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              立即咨询服务
            </Link>
            <Link
              to="/about"
              onClick={() => trackEvent('services_to_about_clicked')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-forest transition-all duration-300"
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