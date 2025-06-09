// Insights.jsx - 创建这个文件在 src/components/
import React, { useState, useEffect, useRef } from 'react';

const InsightsSection = ({ dict }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const insights = [
    {
      title: "2025年中日贸易新趋势",
      summary: "分析后疫情时代中日贸易的新机遇与挑战",
      category: "市场分析",
      readTime: "5分钟",
      date: "2025-01-15"
    },
    {
      title: "日本保健品市场深度解析", 
      summary: "探索日本保健品行业的发展现状与未来趋势",
      category: "行业报告",
      readTime: "8分钟",
      date: "2025-01-10"
    },
    {
      title: "数字化供应链转型指南",
      summary: "如何通过数字化技术提升供应链效率",
      category: "技术创新",
      readTime: "6分钟",
      date: "2025-01-05"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 标题 */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              行业洞察
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            深度分析市场动态，把握商机
          </p>
        </div>

        {/* 洞察文章网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                  {insight.category}
                </span>
                <span className="ml-2 text-gray-500 text-xs">{insight.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                {insight.title}
              </h3>
              
              <p className="text-gray-400 mb-4 line-clamp-3">
                {insight.summary}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{insight.date}</span>
                <span className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
                  阅读更多 →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;

// ============================================

// Partners.jsx - 创建这个文件在 src/components/
import React, { useState, useEffect, useRef } from 'react';

const PartnersSection = ({ dict }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: "Toyota", category: "制造业", logo: "🚗" },
    { name: "Softbank", category: "技术", logo: "📱" },
    { name: "MUFG", category: "金融", logo: "🏦" },
    { name: "Alibaba", category: "电商", logo: "🛍️" },
    { name: "JR East", category: "物流", logo: "🚄" },
    { name: "Panasonic", category: "电子", logo: "⚡" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 标题 */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              合作伙伴
            </span>
          </h2>
          <p className="text-gray-400">与行业领先企业携手合作</p>
        </div>

        {/* 合作伙伴网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-3">{partner.logo}</div>
              <h3 className="text-white font-semibold mb-1">{partner.name}</h3>
              <p className="text-gray-400 text-xs">{partner.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;