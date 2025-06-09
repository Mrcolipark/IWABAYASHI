import React, { useState, useEffect, useRef } from 'react';

const StatsSection = ({ dict }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const sectionRef = useRef(null);

  // 统计数据
  const stats = [
    { number: 50, label: '合作项目', suffix: '+', icon: '🤝' },
    { number: 15, label: '服务国家', suffix: '个', icon: '🌏' },
    { number: 98, label: '客户满意度', suffix: '%', icon: '⭐' },
    { number: 200, label: '合作企业', suffix: '+', icon: '🏢' }
  ];

  // 可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 数字动画
  useEffect(() => {
    if (!isVisible) return;

    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.number / 60; // 60帧动画
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(timer);
        }
        
        setAnimatedNumbers(prev => ({
          ...prev,
          [index]: Math.floor(current)
        }));
      }, 50);

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 标题 */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              我们的成就
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            用数据展现我们的专业实力和服务成果
          </p>
        </div>

        {/* 统计数据网格 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
                
                {/* 图标 */}
                <div className="text-4xl mb-4">{stat.icon}</div>
                
                {/* 数字 */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    {animatedNumbers[index] || 0}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-emerald-400">
                    {stat.suffix}
                  </span>
                </div>
                
                {/* 标签 */}
                <p className="text-gray-300 font-medium">{stat.label}</p>
                
                {/* 装饰性进度条 */}
                <div className="mt-4 w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-blue-400 h-1 rounded-full transition-all duration-2000"
                    style={{ 
                      width: isVisible ? '100%' : '0%',
                      transitionDelay: `${index * 200 + 500}ms`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 补充说明 */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 max-w-4xl mx-auto">
            <p className="text-gray-400 leading-relaxed">
              自成立以来，岩林株式会社始终秉承专业、诚信的服务理念，
              在中日贸易领域积累了丰富的经验和良好的口碑。
              我们将继续为客户提供更优质的服务，共创美好未来。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;