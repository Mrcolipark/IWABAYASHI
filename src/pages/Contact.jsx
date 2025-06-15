import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useOptimizedTranslation } from '../hooks/useOptimizedTranslation';
import { trackEvent } from '../utils/Analytics';
import { useContactInfo } from '../hooks/useCMSContent';
import { sendContactEmail } from '../utils/emailService';

// 缓存的联系方式卡片组件
const ContactInfoCard = React.memo(({ icon, label, value, href, onClick, colorClass = 'text-green-800' }) => {
  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  const CardContent = (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-300 group">
      <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-green-800 rounded-xl flex items-center justify-center">
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="text-gray-500 text-sm">{label}</p>
        <div className={`text-gray-800 font-semibold hover:${colorClass} transition-colors text-lg group-hover:${colorClass}`}>
          {value}
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} onClick={handleClick} className="block">
      {CardContent}
    </a>
  ) : (
    <div onClick={handleClick} className={onClick ? 'cursor-pointer' : ''}>
      {CardContent}
    </div>
  );
});

ContactInfoCard.displayName = 'ContactInfoCard';

// 缓存的交通信息组件
const TrafficItem = React.memo(({ item, index }) => (
  <div className="flex items-start space-x-3">
    <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mt-1">
      {index + 1}
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
  </div>
));

TrafficItem.displayName = 'TrafficItem';

// 缓存的表单输入组件
const FormInput = React.memo(({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  label,
  options = null 
}) => {
  const handleChange = useCallback((e) => {
    onChange(e);
  }, [onChange]);

  if (type === 'select') {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {label} {required && '*'}
        </label>
        <select
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 transition-all duration-300"
        >
          {options?.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {label} {required && '*'}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          rows={6}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 transition-all duration-300 resize-none"
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 transition-all duration-300"
        placeholder={placeholder}
      />
    </div>
  );
});

FormInput.displayName = 'FormInput';

// 缓存的FAQ卡片组件
const FAQCard = React.memo(({ faq, index }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
    <h4 className="text-lg font-bold text-gray-800 mb-4">{faq.question}</h4>
    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
  </div>
));

FAQCard.displayName = 'FAQCard';

// 缓存的服务承诺卡片组件
const PromiseCard = React.memo(({ promise, index }) => {
  const icons = ['⚡', '💡', '🤝'];
  
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
        {icons[index]}
      </div>
      <h4 className="text-xl font-bold text-white mb-2">{promise.title}</h4>
      <p className="text-white/90">{promise.description}</p>
    </div>
  );
});

PromiseCard.displayName = 'PromiseCard';

const Contact = ({ dict }) => {
  const { t } = useOptimizedTranslation();
  const { content: cmsContactInfo } = useContactInfo();
  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isVisible, setIsVisible] = useState(isMobileScreen);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const sectionRef = useRef(null);

  // 使用优化翻译缓存Contact页面数据
  const contactData = useMemo(() => {
    // 基础信息
    const baseInfo = {
      title: t('contact.title', { defaultValue: '联系我们' }),
      subtitle: t('contact.subtitle', { defaultValue: '期待与您建立合作关系' })
    };

    // 联系信息
    const info = {
      company: t('contact.info.company', { defaultValue: '岩林株式会社' }),
      email: t('contact.info.email', { defaultValue: 'info@iwabayashi.com' }),
      phone: t('contact.info.phone', { defaultValue: '+81-3-1234-5678' }),
      address: t('contact.info.address', { defaultValue: '日本东京都港区赤坂1-2-3 岩林大厦10F' }),
      businessHours: t('contact.info.businessHours', { defaultValue: '周一至周五 9:00-18:00 (JST)' })
    };

    const mergedInfo = {
      ...info,
      email: cmsContactInfo?.email || info.email,
      phone: cmsContactInfo?.phone || info.phone,
      address: cmsContactInfo?.address || info.address,
      businessHours: cmsContactInfo?.business_hours || info.businessHours
    };

    // 表单数据
    const form = {
      name: t('contact.form.name', { defaultValue: '姓名' }),
      email: t('contact.form.email', { defaultValue: '邮箱地址' }),
      company: t('contact.form.company', { defaultValue: '公司名称' }),
      phone: t('contact.form.phone', { defaultValue: '联系电话' }),
      subject: t('contact.form.subject', { defaultValue: '咨询主题' }),
      message: t('contact.form.message', { defaultValue: '留言内容' }),
      submit: t('contact.form.submit', { defaultValue: '发送消息' }),
      sending: t('contact.form.sending', { defaultValue: '发送中...' }),
      success: t('contact.form.success', { defaultValue: '消息发送成功！我们会尽快回复您。' }),
      error: t('contact.form.error', { defaultValue: '发送失败，请稍后重试。' }),
      // 占位符文本
      namePlaceholder: t('contact.form.namePlaceholder', { defaultValue: '请输入您的姓名' }),
      emailPlaceholder: t('contact.form.emailPlaceholder', { defaultValue: '请输入邮箱地址' }),
      companyPlaceholder: t('contact.form.companyPlaceholder', { defaultValue: '请输入公司名称' }),
      phonePlaceholder: t('contact.form.phonePlaceholder', { defaultValue: '请输入联系电话' }),
      subjectPlaceholder: t('contact.form.subjectPlaceholder', { defaultValue: '请选择咨询主题' }),
      messagePlaceholder: t('contact.form.messagePlaceholder', { defaultValue: '请详细描述您的需求或问题，我们会尽快回复您...' }),
      // 咨询主题选项
      subjects: [
        { value: '', label: t('contact.form.subjects.0.label', { defaultValue: '请选择咨询主题' }) },
        { value: '保健品进口代理', label: t('contact.form.subjects.1.label', { defaultValue: '日本保健品进口代理' }) },
        { value: '大宗商品出口', label: t('contact.form.subjects.2.label', { defaultValue: '中国大宗商品出口' }) },
        { value: '供应链管理', label: t('contact.form.subjects.3.label', { defaultValue: '供应链管理服务' }) },
        { value: '市场咨询', label: t('contact.form.subjects.4.label', { defaultValue: '市场咨询服务' }) },
        { value: '合作洽谈', label: t('contact.form.subjects.5.label', { defaultValue: '合作洽谈' }) },
        { value: '其他', label: t('contact.form.subjects.6.label', { defaultValue: '其他咨询' }) }
      ]
    };

    // 章节标题
    const sections = {
      contactInfo: t('contact.sections.contactInfo', { defaultValue: '联系方式' }),
      sendMessage: t('contact.sections.sendMessage', { defaultValue: '发送消息' }),
      trafficInfo: t('contact.sections.trafficInfo', { defaultValue: '交通信息' }),
      frequentQuestions: t('contact.sections.frequentQuestions', { defaultValue: '常见问题' }),
      ourLocation: t('contact.sections.ourLocation', { defaultValue: '我们的位置' }),
      visitAppointment: t('contact.sections.visitAppointment', { defaultValue: '预约拜访' })
    };

    // 联系方式标签
    const contactMethods = {
      email: t('contact.contactMethods.email', { defaultValue: '邮箱地址' }),
      phone: t('contact.contactMethods.phone', { defaultValue: '电话号码' }),
      address: t('contact.contactMethods.address', { defaultValue: '办公地址' }),
      hours: t('contact.contactMethods.hours', { defaultValue: '营业时间' })
    };

    // 交通信息
    const traffic = [
      t('contact.traffic.0', { defaultValue: '东京Metro银座线、丸之内线 赤坂见附站 步行5分钟' }),
      t('contact.traffic.1', { defaultValue: '东京Metro千代田线 赤坂站 步行3分钟' }),
      t('contact.traffic.2', { defaultValue: 'JR中央线、总武线 四谷站 步行10分钟' })
    ];

    // 地图操作
    const mapActions = {
      viewOnMap: t('contact.mapActions.viewOnMap', { defaultValue: '在地图中查看' }),
      phoneAppointment: t('contact.mapActions.phoneAppointment', { defaultValue: '电话预约' }),
      emailAppointment: t('contact.mapActions.emailAppointment', { defaultValue: '邮件预约' })
    };

    // 预约信息
    const appointmentInfo = {
      title: t('contact.appointmentInfo.title', { defaultValue: '预约拜访' }),
      description: t('contact.appointmentInfo.description', { 
        defaultValue: '如果您希望到访我们的办公室进行面谈，请提前通过电话或邮件与我们预约。我们将为您安排合适的时间，并提供详细的交通指引。' 
      })
    };

    // FAQ数据
    const faq = [
      {
        question: t('contact.faq.0.question', { defaultValue: '你们提供哪些类型的日本保健品进口服务？' }),
        answer: t('contact.faq.0.answer', { 
          defaultValue: '我们专门代理日本优质保健品的进口业务，包括营养补充品、美容保健产品、功能性食品等。我们与日本多家知名品牌建立了合作关系，确保产品质量和安全性。' 
        })
      },
      {
        question: t('contact.faq.1.question', { defaultValue: '进口代理服务的一般流程需要多长时间？' }),
        answer: t('contact.faq.1.answer', { 
          defaultValue: '一般来说，完整的进口代理流程需要30-45个工作日，包括产品审核、资质办理、报关清关、质检等环节。具体时间会根据产品类型和复杂程度有所差异。' 
        })
      },
      {
        question: t('contact.faq.2.question', { defaultValue: '你们如何保证进口产品的质量？' }),
        answer: t('contact.faq.2.answer', { 
          defaultValue: '我们建立了严格的质量控制体系，包括供应商资质审核、产品质量检测、全程追溯管理等。所有产品都符合中国和日本的相关法规标准。' 
        })
      },
      {
        question: t('contact.faq.3.question', { defaultValue: '未来的大宗商品出口业务什么时候开始？' }),
        answer: t('contact.faq.3.answer', { 
          defaultValue: '我们计划在2025年下半年开始逐步布局大宗商品出口业务。目前正在进行市场调研和渠道建设，预计2026年正式开展相关业务。' 
        })
      },
      {
        question: t('contact.faq.4.question', { defaultValue: '你们的服务费用如何计算？' }),
        answer: t('contact.faq.4.answer', { 
          defaultValue: '我们的服务费用根据具体项目的复杂程度、产品类型、服务范围等因素来确定。我们提供透明的价格体系，欢迎咨询具体报价。' 
        })
      },
      {
        question: t('contact.faq.5.question', { defaultValue: '如何开始与你们的合作？' }),
        answer: t('contact.faq.5.answer', { 
          defaultValue: '您可以通过电话、邮件或在线表单联系我们。我们会安排专业顾问与您沟通，了解您的具体需求，并为您制定合适的服务方案。' 
        })
      }
    ];

    // 服务承诺
    const servicePromise = {
      title: t('contact.servicePromise.title', { defaultValue: '我们的服务承诺' }),
      description: t('contact.servicePromise.description', { 
        defaultValue: '我们期待与您建立合作关系，共同开拓中日贸易新机遇' 
      }),
      promises: [
        {
          title: t('contact.servicePromise.promises.0.title', { defaultValue: '快速响应' }),
          description: t('contact.servicePromise.promises.0.description', { defaultValue: '24小时内回复您的咨询' })
        },
        {
          title: t('contact.servicePromise.promises.1.title', { defaultValue: '专业建议' }),
          description: t('contact.servicePromise.promises.1.description', { defaultValue: '提供专业的贸易咨询服务' })
        },
        {
          title: t('contact.servicePromise.promises.2.title', { defaultValue: '长期合作' }),
          description: t('contact.servicePromise.promises.2.description', { defaultValue: '建立长期稳定的合作关系' })
        }
      ]
    };

    return {
      ...baseInfo,
      info: mergedInfo,
      form,
      sections,
      contactMethods,
      traffic,
      mapActions,
      appointmentInfo,
      faq,
      servicePromise
    };
  }, [t, cmsContactInfo]);

  // 可见性检测
  useEffect(() => {
    if (isMobileScreen) {
      setIsVisible(true);
      trackEvent('contact_page_viewed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    trackEvent('contact_page_viewed');
    return () => observer.disconnect();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);

      trackEvent('contact_form_submitted', {
        name: formData.name,
        company: formData.company,
        subject: formData.subject
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  }, [formData]);

  const handleContactMethodClick = useCallback((method) => {
    trackEvent('contact_method_clicked', { method });
  }, []);

  const handleMapClick = useCallback(() => {
    trackEvent('map_view_clicked');
    window.open(`https://maps.google.com/?q=${encodeURIComponent(contactData.info.address)}`, '_blank');
  }, [contactData.info.address]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-800/5 to-green-800/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-slate-600/5 to-gray-700/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 via-slate-700 to-green-800 bg-clip-text text-transparent">
                {contactData.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {contactData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* 左侧：联系信息 */}
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              
              {/* 联系方式卡片 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">
                  {contactData.sections.contactInfo}
                </h3>
                
                <div className="space-y-6">
                  {/* 邮箱 */}
                  <ContactInfoCard
                    icon="📧"
                    label={contactData.contactMethods.email}
                    value={contactData.info.email}
                    href={`mailto:${contactData.info.email}`}
                    onClick={() => handleContactMethodClick('email')}
                  />

                  {/* 电话 */}
                  <ContactInfoCard
                    icon="📞"
                    label={contactData.contactMethods.phone}
                    value={contactData.info.phone}
                    href={`tel:${contactData.info.phone}`}
                    onClick={() => handleContactMethodClick('phone')}
                  />

                  {/* 地址 */}
                  <ContactInfoCard
                    icon="📍"
                    label={contactData.contactMethods.address}
                    value={contactData.info.address}
                  />

                  {/* 营业时间 */}
                  <ContactInfoCard
                    icon="🕒"
                    label={contactData.contactMethods.hours}
                    value={contactData.info.businessHours}
                  />
                </div>
              </div>

              {/* 交通信息 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  {contactData.sections.trafficInfo}
                </h4>
                <div className="space-y-4">
                  {contactData.traffic.map((item, index) => (
                    <TrafficItem key={index} item={item} index={index} />
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：联系表单 */}
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">
                  {contactData.sections.sendMessage}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* 姓名和公司 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      label={contactData.form.name}
                      placeholder={contactData.form.namePlaceholder}
                    />
                    <FormInput
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      label={contactData.form.company}
                      placeholder={contactData.form.companyPlaceholder}
                    />
                  </div>

                  {/* 邮箱和电话 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      label={contactData.form.email}
                      placeholder={contactData.form.emailPlaceholder}
                    />
                    <FormInput
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      label={contactData.form.phone}
                      placeholder={contactData.form.phonePlaceholder}
                    />
                  </div>

                  {/* 咨询主题 */}
                  <FormInput
                    type="select"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    label={contactData.form.subject}
                    options={contactData.form.subjects}
                  />

                  {/* 留言内容 */}
                  <FormInput
                    type="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    label={contactData.form.message}
                    placeholder={contactData.form.messagePlaceholder}
                  />

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-gray-800 to-green-800 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{contactData.form.sending}</span>
                      </div>
                    ) : (
                      contactData.form.submit
                    )}
                  </button>

                  {/* 状态提示 */}
                  {submitStatus && (
                    <div className={`p-4 rounded-lg text-center transition-all duration-300 ${
                      submitStatus === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {submitStatus === 'success' 
                        ? contactData.form.success
                        : contactData.form.error
                      }
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {contactData.sections.frequentQuestions}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              以下是客户经常咨询的问题，希望能为您提供帮助
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {contactData.faq.map((faq, index) => (
              <FAQCard key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 地图和位置信息 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {contactData.sections.ourLocation}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              欢迎您到访我们位于东京的办公室
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* 地图占位 */}
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-green-800 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                    📍
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    东京办公室位置
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {contactData.info.address}
                  </p>
                  <button 
                    onClick={handleMapClick}
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-green-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
                  >
                    {contactData.mapActions.viewOnMap}
                  </button>
                </div>
              </div>
            </div>

            {/* 详细地址信息 */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-6">
                  详细地址
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-green-800 text-xl mt-1">🏢</span>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">
                        办公地址
                      </div>
                      <div className="text-gray-600">{contactData.info.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-green-800 text-xl mt-1">🚇</span>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">
                        最近车站
                      </div>
                      <div className="text-gray-600">
                        赤坂见附站 / 赤坂站 / 四谷站
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-green-800 text-xl mt-1">🕐</span>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">
                        接待时间
                      </div>
                      <div className="text-gray-600">{contactData.info.businessHours}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        ※ 拜访前请提前预约
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 预约拜访 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h5 className="text-xl font-bold text-gray-800 mb-4">
                  {contactData.appointmentInfo.title}
                </h5>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {contactData.appointmentInfo.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${contactData.info.phone}`}
                    onClick={() => handleContactMethodClick('phone_appointment')}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-green-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
                  >
                    <span>📞</span>
                    <span>{contactData.mapActions.phoneAppointment}</span>
                  </a>
                  <a
                    href={`mailto:${contactData.info.email}?subject=${encodeURIComponent('预约拜访咨询')}`}
                    onClick={() => handleContactMethodClick('email_appointment')}
                    className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300"
                  >
                    <span>📧</span>
                    <span>{contactData.mapActions.emailAppointment}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系承诺 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            {contactData.servicePromise.title}
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {contactData.servicePromise.promises.map((promise, index) => (
              <PromiseCard key={index} promise={promise} index={index} />
            ))}
          </div>
          <p className="text-xl text-white/95">
            {contactData.servicePromise.description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;