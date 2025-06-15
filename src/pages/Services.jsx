import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOptimizedTranslation } from '../hooks/useOptimizedTranslation';
import { trackEvent } from '../utils/Analytics';
import { useServices } from '../hooks/useCMSContent';

// 缓存的服务数据组件 - 使用优化翻译
const ServiceCard = React.memo(({ service, isActive, onCategoryChange, category }) => {
  const handleClick = useCallback(() => {
    onCategoryChange(category);
  }, [onCategoryChange, category]);

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? 'bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm'
      }`}
    >
      <span className="text-2xl">{service.icon}</span>
      <span>{service.title}</span>
    </button>
  );
});

ServiceCard.displayName = 'ServiceCard';

// 缓存的流程步骤组件
const ProcessStep = React.memo(({ step, index, isLast }) => (
  <div className="relative">
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-green-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
        {step.step}
      </div>
      <div className="text-left">
        <div className="font-semibold text-gray-800">{step.title}</div>
        <div className="text-sm text-gray-500">{step.desc}</div>
      </div>
    </div>
    {!isLast && (
      <div className="absolute left-4 top-16 w-0.5 h-6 bg-gradient-to-b from-gray-800 to-green-800"></div>
    )}
  </div>
));

ProcessStep.displayName = 'ProcessStep';

// 缓存的特性卡片组件
const FeatureCard = React.memo(({ feature, index, colorClass = 'bg-green-800' }) => (
  <div className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm">
    <div className={`w-2 h-2 ${colorClass} rounded-full flex-shrink-0`}></div>
    <span className="text-gray-700">{feature}</span>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

// 缓存的优势卡片组件
const AdvantageCard = React.memo(({ advantage, index, borderColor = 'border-green-800', bgColor = 'bg-green-50', iconColor = 'text-green-800' }) => (
  <div className={`flex items-start space-x-3 p-3 border-l-4 ${borderColor} ${bgColor} rounded-r-lg`}>
    <span className={`${iconColor} mt-1`}>✓</span>
    <span className="text-gray-700">{advantage}</span>
  </div>
));

AdvantageCard.displayName = 'AdvantageCard';

// 缓存的时间线组件
const TimelineItem = React.memo(({ item, index, isLast }) => (
  <div className="relative">
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-gray-800 rounded-xl flex items-center justify-center text-white font-bold text-xs text-center leading-tight">
        {index + 1}
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold text-gray-800">{item.title}</div>
        <div className="text-sm text-gray-500 mb-1">{item.desc}</div>
        <div className="text-xs text-slate-600">{item.time}</div>
      </div>
    </div>
    {!isLast && (
      <div className="absolute left-6 top-16 w-0.5 h-6 bg-gradient-to-b from-slate-700 to-gray-800"></div>
    )}
  </div>
));

TimelineItem.displayName = 'TimelineItem';

// 缓存的指标卡片组件
const MetricCard = React.memo(({ value, label, colorClass = 'text-green-800' }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg">
    <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
));

MetricCard.displayName = 'MetricCard';

// 缓存的能力卡片组件
const CapabilityCard = React.memo(({ capability, index }) => {
  const icons = ['💼', '⚡', '🎯'];
  
  return (
    <div className="text-center">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-green-800 rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto">
          {icons[index]}
        </div>
        <h4 className="text-xl font-bold text-gray-800 mb-4">{capability.name}</h4>
        <p className="text-gray-600 leading-relaxed">{capability.description}</p>
      </div>
    </div>
  );
});

CapabilityCard.displayName = 'CapabilityCard';

const Services = () => {
  const { t } = useOptimizedTranslation(); // 使用您的优化翻译Hook
  const { services: cmsServices } = useServices();
  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isVisible, setIsVisible] = useState(isMobileScreen);
  const [selectedCategory, setSelectedCategory] = useState('current');
  const sectionRef = useRef(null);

  // 使用优化翻译缓存服务数据，减少重复翻译调用
  const servicesData = useMemo(() => {
    // 缓存基础翻译
    const baseTranslations = {
      title: t('services.title', { defaultValue: '服务内容' }),
      subtitle: t('services.subtitle', { defaultValue: '专业的贸易服务，连接中日优质商品' }),
    };

    // 当前业务数据
    const currentBusinessData = {
      title: t('services.currentBusiness.title', { defaultValue: '现阶段重点业务' }),
      service: {
        title: t('services.currentBusiness.services.0.title', { defaultValue: '日本保健品进口代理' }),
        status: t('services.currentBusiness.services.0.status', { defaultValue: '进行中' }),
        description: t('services.currentBusiness.services.0.description', { 
          defaultValue: '依托日本先进的生产工艺与严格的品质标准，我们精心甄选优质保健品，致力于为中国消费者引入安全、健康、可信赖的产品，满足日益增长的健康消费需求。' 
        }),
        features: [
          t('services.currentBusiness.services.0.features.0', { defaultValue: '严格的品质甄选标准' }),
          t('services.currentBusiness.services.0.features.1', { defaultValue: '完善的进口代理服务' }),
          t('services.currentBusiness.services.0.features.2', { defaultValue: '专业的市场咨询支持' }),
          t('services.currentBusiness.services.0.features.3', { defaultValue: '高效的供应链管理' })
        ],
        advantages: [
          t('services.currentBusiness.services.0.advantages.0', { defaultValue: '日本先进生产工艺' }),
          t('services.currentBusiness.services.0.advantages.1', { defaultValue: '严格品质控制体系' }),
          t('services.currentBusiness.services.0.advantages.2', { defaultValue: '安全可信赖产品' }),
          t('services.currentBusiness.services.0.advantages.3', { defaultValue: '满足健康消费需求' })
        ],
        process: [
          {
            step: 1,
            title: t('services.currentBusiness.services.0.process.0.title', { defaultValue: '产品甄选' }),
            desc: t('services.currentBusiness.services.0.process.0.desc', { defaultValue: '严格筛选优质产品' })
          },
          {
            step: 2,
            title: t('services.currentBusiness.services.0.process.1.title', { defaultValue: '质量检测' }),
            desc: t('services.currentBusiness.services.0.process.1.desc', { defaultValue: '全面质量控制检测' })
          },
          {
            step: 3,
            title: t('services.currentBusiness.services.0.process.2.title', { defaultValue: '进口代理' }),
            desc: t('services.currentBusiness.services.0.process.2.desc', { defaultValue: '专业进口手续办理' })
          },
          {
            step: 4,
            title: t('services.currentBusiness.services.0.process.3.title', { defaultValue: '市场推广' }),
            desc: t('services.currentBusiness.services.0.process.3.desc', { defaultValue: '协助产品市场推广' })
          }
        ],
        metrics: {
          qualityRate: t('services.currentBusiness.services.0.metrics.qualityRate', { defaultValue: '质量合格率' }),
          averageCycle: t('services.currentBusiness.services.0.metrics.averageCycle', { defaultValue: '平均周期' })
        }
      }
    };

    // 未来业务数据
    const futureBusinessData = {
      title: t('services.futureBusiness.title', { defaultValue: '未来业务规划' }),
      service: {
        title: t('services.futureBusiness.services.0.title', { defaultValue: '中国大宗商品出口拓展' }),
        status: t('services.futureBusiness.services.0.status', { defaultValue: '规划中' }),
        description: t('services.futureBusiness.services.0.description', { 
          defaultValue: '未来我们将依托中国丰富的产业基础和优质的商品资源，积极布局大宗商品出口业务，助力更多优质中国产品进入日本市场，为两国的经贸合作注入新动力。' 
        }),
        features: [
          t('services.futureBusiness.services.0.features.0', { defaultValue: '丰富的产业基础资源' }),
          t('services.futureBusiness.services.0.features.1', { defaultValue: '优质的商品资源整合' }),
          t('services.futureBusiness.services.0.features.2', { defaultValue: '专业的市场开拓能力' }),
          t('services.futureBusiness.services.0.features.3', { defaultValue: '完善的出口服务体系' })
        ],
        advantages: [
          t('services.futureBusiness.services.0.advantages.0', { defaultValue: '中国制造优势' }),
          t('services.futureBusiness.services.0.advantages.1', { defaultValue: '日本市场准入经验' }),
          t('services.futureBusiness.services.0.advantages.2', { defaultValue: '双向贸易服务能力' }),
          t('services.futureBusiness.services.0.advantages.3', { defaultValue: '促进两国经贸合作' })
        ],
        timeline: [
          {
            title: t('services.futureBusiness.services.0.timeline.0.title', { defaultValue: '市场调研' }),
            desc: t('services.futureBusiness.services.0.timeline.0.desc', { defaultValue: '深入了解目标市场' }),
            time: t('services.futureBusiness.services.0.timeline.0.time', { defaultValue: '2025 Q1-Q2' })
          },
          {
            title: t('services.futureBusiness.services.0.timeline.1.title', { defaultValue: '渠道建立' }),
            desc: t('services.futureBusiness.services.0.timeline.1.desc', { defaultValue: '构建稳定销售渠道' }),
            time: t('services.futureBusiness.services.0.timeline.1.time', { defaultValue: '2025 Q3-Q4' })
          },
          {
            title: t('services.futureBusiness.services.0.timeline.2.title', { defaultValue: '业务扩展' }),
            desc: t('services.futureBusiness.services.0.timeline.2.desc', { defaultValue: '全面开展出口业务' }),
            time: t('services.futureBusiness.services.0.timeline.2.time', { defaultValue: '2026年' })
          },
          {
            title: t('services.futureBusiness.services.0.timeline.3.title', { defaultValue: '规模化运营' }),
            desc: t('services.futureBusiness.services.0.timeline.3.desc', { defaultValue: '实现规模化稳定运营' }),
            time: t('services.futureBusiness.services.0.timeline.3.time', { defaultValue: '2027年+' })
          }
        ],
        metrics: {
          targetMarkets: t('services.futureBusiness.services.0.metrics.targetMarkets', { defaultValue: '目标市场' }),
          partnerCompanies: t('services.futureBusiness.services.0.metrics.partnerCompanies', { defaultValue: '合作企业' })
        }
      }
    };

    // 服务能力数据
    const serviceCapabilities = {
      title: t('services.serviceCapabilities.title', { defaultValue: '服务能力' }),
      description: t('services.serviceCapabilities.description', { defaultValue: '我们具备全方位的专业服务能力，为客户提供一站式贸易解决方案' }),
      capabilities: [
        {
          name: t('services.serviceCapabilities.capabilities.0.name', { defaultValue: '专业市场咨询' }),
          description: t('services.serviceCapabilities.capabilities.0.description', { defaultValue: '提供深度的市场分析和专业咨询服务' })
        },
        {
          name: t('services.serviceCapabilities.capabilities.1.name', { defaultValue: '灵活供应链管理' }),
          description: t('services.serviceCapabilities.capabilities.1.description', { defaultValue: '建立高效、灵活的供应链管理体系' })
        },
        {
          name: t('services.serviceCapabilities.capabilities.2.name', { defaultValue: '高效进出口服务' }),
          description: t('services.serviceCapabilities.capabilities.2.description', { defaultValue: '提供一站式进出口贸易服务解决方案' })
        }
      ]
    };

    // CTA数据
    const ctaData = {
      title: t('services.cta.title', { defaultValue: '开始您的贸易合作之旅' }),
      description: t('services.cta.description', { defaultValue: '无论是现有业务还是未来规划，我们都准备好为您提供专业的贸易服务' }),
      consultServices: t('services.cta.consultServices', { defaultValue: '立即咨询服务' }),
      consultNow: t('services.cta.consultNow', { defaultValue: '立即咨询此服务' }),
      partnershipInquiry: t('services.cta.partnershipInquiry', { defaultValue: '合作咨询' }),
      learnMore: t('services.cta.learnMore', { defaultValue: '了解我们' })
    };

    const serviceMap = Array.isArray(cmsServices)
      ? cmsServices.reduce((acc, s) => ({ ...acc, [s.id]: s }), {})
      : {};

    const mergedCurrent = {
      ...currentBusinessData.service,
      ...(serviceMap['health-products-import'] || {})
    };
    const mergedFuture = {
      ...futureBusinessData.service,
      ...(serviceMap['export-business'] || {})
    };

    currentBusinessData.service = mergedCurrent;
    futureBusinessData.service = mergedFuture;

    return {
      ...baseTranslations,
      currentBusiness: currentBusinessData,
      futureBusiness: futureBusinessData,
      serviceCapabilities,
      cta: ctaData
    };
  }, [t, cmsServices]); // 当翻译或CMS数据更新时重新计算

  // 缓存服务选项
  const serviceOptions = useMemo(() => [
    {
      id: 'current',
      title: servicesData.currentBusiness.title,
      icon: '🏥'
    },
    {
      id: 'future',
      title: servicesData.futureBusiness.title,
      icon: '🚢'
    }
  ], [servicesData.currentBusiness.title, servicesData.futureBusiness.title]);

  // 可见性检测
  useEffect(() => {
    if (isMobileScreen) {
      setIsVisible(true);
      trackEvent('services_page_viewed');
      return;
    }

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

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    trackEvent('service_category_changed', { category });
  }, []);

  const handleCTAClick = useCallback((service, action = 'consult') => {
    trackEvent('service_cta_clicked', { service, action });
  }, []);

  // 当前选中的服务数据
  const currentService = useMemo(() => {
    return selectedCategory === 'current' 
      ? servicesData.currentBusiness.service
      : servicesData.futureBusiness.service;
  }, [selectedCategory, servicesData]);

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
            {serviceOptions.map((option) => (
              <ServiceCard
                key={option.id}
                service={option}
                isActive={selectedCategory === option.id}
                onCategoryChange={handleCategoryChange}
                category={option.id}
              />
            ))}
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
              <div className="mb-16">
                
                {/* 服务标题区域 */}
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      🏥
                    </div>
                    <div className="text-left">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        {currentService.title}
                      </h2>
                      <span className="px-4 py-1 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium">
                        {currentService.status}
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
                        {currentService.description}
                      </p>
                    </div>

                    {/* 核心特性 */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-6">核心特性</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentService.features.map((feature, i) => (
                          <FeatureCard key={i} feature={feature} index={i} />
                        ))}
                      </div>
                    </div>

                    {/* 服务优势 */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-6">服务优势</h4>
                      <div className="space-y-3">
                        {currentService.advantages.map((advantage, i) => (
                          <AdvantageCard key={i} advantage={advantage} index={i} />
                        ))}
                      </div>
                    </div>

                    {/* CTA按钮 */}
                    <div className="pt-6">
                      <Link
                        to="/contact"
                        onClick={() => handleCTAClick('health_products')}
                        className="inline-block px-8 py-4 bg-gradient-to-r from-gray-800 to-green-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg"
                      >
                        {servicesData.cta.consultNow}
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
                          {currentService.process.map((item, i) => (
                            <ProcessStep 
                              key={i} 
                              step={item} 
                              index={i} 
                              isLast={i === currentService.process.length - 1}
                            />
                          ))}
                        </div>
                      </div>

                      {/* 关键指标 */}
                      <div className="grid grid-cols-2 gap-4">
                        <MetricCard value="98%" label={currentService.metrics.qualityRate} />
                        <MetricCard value="30天" label={currentService.metrics.averageCycle} />
                      </div>
                    </div>

                    {/* 装饰元素 */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-600/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 未来业务 */}
          {selectedCategory === 'future' && (
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="mb-16">
                
                {/* 服务标题区域 */}
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-slate-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      🚢
                    </div>
                    <div className="text-left">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        {currentService.title}
                      </h2>
                      <span className="px-4 py-1 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-sm font-medium">
                        {currentService.status}
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
                        {currentService.description}
                      </p>
                    </div>

                    {/* 规划特色 */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-6">规划特色</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentService.features.map((feature, i) => (
                          <FeatureCard 
                            key={i} 
                            feature={feature} 
                            index={i} 
                            colorClass="bg-slate-600"
                          />
                        ))}
                      </div>
                    </div>

                    {/* 发展优势 */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-6">发展优势</h4>
                      <div className="space-y-3">
                        {currentService.advantages.map((advantage, i) => (
                          <AdvantageCard 
                            key={i} 
                            advantage={advantage} 
                            index={i}
                            borderColor="border-slate-600"
                            bgColor="bg-slate-50"
                            iconColor="text-slate-700"
                          />
                        ))}
                      </div>
                    </div>

                    {/* 合作咨询 */}
                    <div className="pt-6">
                      <Link
                        to="/contact"
                        onClick={() => handleCTAClick('export_business', 'partnership')}
                        className="inline-block px-8 py-4 bg-gradient-to-r from-slate-700 to-gray-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg"
                      >
                        {servicesData.cta.partnershipInquiry}
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
                          {currentService.timeline.map((item, i) => (
                            <TimelineItem 
                              key={i} 
                              item={item} 
                              index={i} 
                              isLast={i === currentService.timeline.length - 1}
                            />
                          ))}
                        </div>
                      </div>

                      {/* 预期指标 */}
                      <div className="grid grid-cols-2 gap-4">
                        <MetricCard 
                          value="5+" 
                          label={currentService.metrics.targetMarkets}
                          colorClass="text-slate-700"
                        />
                        <MetricCard 
                          value="100+" 
                          label={currentService.metrics.partnerCompanies}
                          colorClass="text-slate-700"
                        />
                      </div>
                    </div>

                    {/* 装饰元素 */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>
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
              {servicesData.serviceCapabilities.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.serviceCapabilities.capabilities.map((capability, index) => (
              <CapabilityCard key={index} capability={capability} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">{servicesData.cta.title}</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {servicesData.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              onClick={() => handleCTAClick('general', 'consult_services')}
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {servicesData.cta.consultServices}
            </Link>
            <Link
              to="/about"
              onClick={() => handleCTAClick('general', 'learn_more')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
            >
              {servicesData.cta.learnMore}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;