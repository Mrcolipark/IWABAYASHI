import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../utils/Analytics';

const Contact = ({ dict }) => {
  const [isVisible, setIsVisible] = useState(false);
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
  const contactData = dict.contact;

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
    trackEvent('contact_page_viewed');

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 模拟表单提交（实际项目中可以集成EmailJS或其他服务）
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
  };

  const handleContactMethodClick = (method) => {
    trackEvent('contact_method_clicked', { method });
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
                {contactData.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
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
              <div className="glass rounded-2xl p-8 border border-forest/20 mb-8">
                <h3 className="text-2xl font-bold text-moss mb-8">联系方式</h3>
                
                <div className="space-y-6">
                  {/* 邮箱 */}
                  <div className="flex items-center space-x-4 p-4 bg-slate/30 rounded-lg hover:bg-forest/10 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-forest to-moss rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">邮箱地址</p>
                      <a 
                        href={`mailto:${contactData.info.email}`}
                        onClick={() => handleContactMethodClick('email')}
                        className="text-white font-semibold hover:text-moss transition-colors text-lg"
                      >
                        {contactData.info.email}
                      </a>
                    </div>
                  </div>

                  {/* 电话 */}
                  <div className="flex items-center space-x-4 p-4 bg-slate/30 rounded-lg hover:bg-forest/10 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-moss to-sage rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">电话号码</p>
                      <a 
                        href={`tel:${contactData.info.phone}`}
                        onClick={() => handleContactMethodClick('phone')}
                        className="text-white font-semibold hover:text-moss transition-colors text-lg"
                      >
                        {contactData.info.phone}
                      </a>
                    </div>
                  </div>

                  {/* 地址 */}
                  <div className="flex items-start space-x-4 p-4 bg-slate/30 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-sage to-forest rounded-xl flex items-center justify-center mt-1">
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">办公地址</p>
                      <p className="text-white font-semibold leading-relaxed">
                        {contactData.info.address}
                      </p>
                    </div>
                  </div>

                  {/* 营业时间 */}
                  <div className="flex items-start space-x-4 p-4 bg-slate/30 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-forest to-sage rounded-xl flex items-center justify-center mt-1">
                      <span className="text-white text-xl">🕒</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">营业时间</p>
                      <p className="text-white font-semibold">
                        {contactData.info.businessHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 交通信息 */}
              <div className="glass rounded-2xl p-8 border border-forest/20">
                <h4 className="text-xl font-bold text-moss mb-6">交通信息</h4>
                <div className="space-y-4">
                  {[
                    '东京Metro银座线、丸之内线 赤坂见附站 步行5分钟',
                    '东京Metro千代田线 赤坂站 步行3分钟',
                    'JR中央线、总武线 四谷站 步行10分钟'
                  ].map((access, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-moss/20 text-moss rounded-full flex items-center justify-center text-xs font-bold mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{access}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：联系表单 */}
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="glass rounded-2xl p-8 border border-forest/20">
                <h3 className="text-2xl font-bold text-moss mb-8">发送消息</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* 姓名和公司 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {contactData.form?.name || '姓名'} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {contactData.form?.company || '公司名称'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="请输入公司名称"
                      />
                    </div>
                  </div>

                  {/* 邮箱和电话 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {contactData.form?.email || '邮箱地址'} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="请输入邮箱地址"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {contactData.form?.phone || '联系电话'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>

                  {/* 咨询主题 */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      {contactData.form?.subject || '咨询主题'} *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">请选择咨询主题</option>
                      <option value="保健品进口代理">日本保健品进口代理</option>
                      <option value="大宗商品出口">中国大宗商品出口</option>
                      <option value="供应链管理">供应链管理服务</option>
                      <option value="市场咨询">市场咨询服务</option>
                      <option value="合作洽谈">合作洽谈</option>
                      <option value="其他">其他咨询</option>
                    </select>
                  </div>

                  {/* 留言内容 */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      {contactData.form?.message || '留言内容'} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="input-field resize-none"
                      placeholder="请详细描述您的需求或问题，我们会尽快回复您..."
                    />
                  </div>

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-forest to-moss rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>发送中...</span>
                      </div>
                    ) : (
                      contactData.form?.submit || '发送消息'
                    )}
                  </button>

                  {/* 状态提示 */}
                  {submitStatus && (
                    <div className={`p-4 rounded-lg text-center transition-all duration-300 ${
                      submitStatus === 'success' 
                        ? 'bg-moss/20 text-moss border border-moss/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {submitStatus === 'success' 
                        ? (contactData.form?.success || '消息发送成功！我们会尽快回复您。')
                        : (contactData.form?.error || '发送失败，请稍后重试。')
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
      <section className="py-24 bg-gradient-to-b from-charcoal to-slate">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-moss mb-6">常见问题</h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              以下是客户经常咨询的问题，希望能为您提供帮助
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: '你们提供哪些类型的日本保健品进口服务？',
                answer: '我们专门代理日本优质保健品的进口业务，包括营养补充品、美容保健产品、功能性食品等。我们与日本多家知名品牌建立了合作关系，确保产品质量和安全性。'
              },
              {
                question: '进口代理服务的一般流程需要多长时间？',
                answer: '一般来说，完整的进口代理流程需要30-45个工作日，包括产品审核、资质办理、报关清关、质检等环节。具体时间会根据产品类型和复杂程度有所差异。'
              },
              {
                question: '你们如何保证进口产品的质量？',
                answer: '我们建立了严格的质量控制体系，包括供应商资质审核、产品质量检测、全程追溯管理等。所有产品都符合中国和日本的相关法规标准。'
              },
              {
                question: '未来的大宗商品出口业务什么时候开始？',
                answer: '我们计划在2025年下半年开始逐步布局大宗商品出口业务。目前正在进行市场调研和渠道建设，预计2026年正式开展相关业务。'
              },
              {
                question: '你们的服务费用如何计算？',
                answer: '我们的服务费用根据具体项目的复杂程度、产品类型、服务范围等因素来确定。我们提供透明的价格体系，欢迎咨询具体报价。'
              },
              {
                question: '如何开始与你们的合作？',
                answer: '您可以通过电话、邮件或在线表单联系我们。我们会安排专业顾问与您沟通，了解您的具体需求，并为您制定合适的服务方案。'
              }
            ].map((faq, index) => (
              <div key={index} className="glass rounded-2xl p-6 border border-forest/20 hover:border-moss/50 transition-all duration-300">
                <h4 className="text-lg font-bold text-moss mb-4">{faq.question}</h4>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 地图和位置信息 */}
      <section className="py-24 bg-slate">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-moss mb-6">我们的位置</h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              欢迎您到访我们位于东京的办公室
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* 地图占位 */}
            <div className="relative">
              <div className="aspect-video bg-slate/50 rounded-2xl border border-forest/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest to-moss rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                    📍
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">东京办公室位置</h4>
                  <p className="text-gray-400 mb-4">
                    {contactData.info.address}
                  </p>
                  <button 
                    onClick={() => {
                      trackEvent('map_view_clicked');
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(contactData.info.address)}`, '_blank');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-forest to-moss rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
                  >
                    在地图中查看
                  </button>
                </div>
              </div>
            </div>

            {/* 详细地址信息 */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-moss mb-6">详细地址</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 glass rounded-lg">
                    <span className="text-moss text-xl mt-1">🏢</span>
                    <div>
                      <div className="font-semibold text-white mb-1">办公地址</div>
                      <div className="text-gray-300">{contactData.info.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 glass rounded-lg">
                    <span className="text-moss text-xl mt-1">🚇</span>
                    <div>
                      <div className="font-semibold text-white mb-1">最近车站</div>
                      <div className="text-gray-300">赤坂见附站 / 赤坂站 / 四谷站</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 glass rounded-lg">
                    <span className="text-moss text-xl mt-1">🕐</span>
                    <div>
                      <div className="font-semibold text-white mb-1">接待时间</div>
                      <div className="text-gray-300">{contactData.info.businessHours}</div>
                      <div className="text-sm text-gray-400 mt-1">※ 拜访前请提前预约</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 预约拜访 */}
              <div className="glass rounded-2xl p-6 border border-forest/20">
                <h5 className="text-xl font-bold text-moss mb-4">预约拜访</h5>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  如果您希望到访我们的办公室进行面谈，请提前通过电话或邮件与我们预约。我们将为您安排合适的时间，并提供详细的交通指引。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${contactData.info.phone}`}
                    onClick={() => handleContactMethodClick('phone_appointment')}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-forest to-moss rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
                  >
                    <span>📞</span>
                    <span>电话预约</span>
                  </a>
                  <a
                    href={`mailto:${contactData.info.email}?subject=预约拜访咨询`}
                    onClick={() => handleContactMethodClick('email_appointment')}
                    className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-moss text-moss rounded-lg font-semibold hover:bg-moss hover:text-white transition-all duration-300"
                  >
                    <span>📧</span>
                    <span>邮件预约</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系承诺 */}
      <section className="py-16 bg-gradient-to-r from-forest to-moss">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">我们的服务承诺</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                ⚡
              </div>
              <h4 className="text-xl font-bold text-white mb-2">快速响应</h4>
              <p className="text-white/80">24小时内回复您的咨询</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                💡
              </div>
              <h4 className="text-xl font-bold text-white mb-2">专业建议</h4>
              <p className="text-white/80">提供专业的贸易咨询服务</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                🤝
              </div>
              <h4 className="text-xl font-bold text-white mb-2">长期合作</h4>
              <p className="text-white/80">建立长期稳定的合作关系</p>
            </div>
          </div>
          <p className="text-xl text-white/90">
            我们期待与您建立合作关系，共同开拓中日贸易新机遇
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;