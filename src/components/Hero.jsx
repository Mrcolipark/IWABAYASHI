import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../utils/Analytics';

const Hero = ({ dict, scrollY }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroRef = useRef(null);

  // 保留你的原有文案，只是增强展示效果
  const heroTexts = [
    dict.slogan || "上質な製品で\nユーザーとつながる",
    dict.subtitle || "连接中日优质商品，推动经贸繁荣发展", 
    "专业贸易服务，值得信赖的合作伙伴"
  ];

  useEffect(() => {
  setIsLoaded(true);
  
  let textInterval;
  
  // 使用防护条件
  if (heroTexts.length > 1) {
    textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % heroTexts.length);
    }, 4000);
  }

  // 确保清理
  return () => {
    if (textInterval) {
      clearInterval(textInterval);
      textInterval = null;
    }
  };
}, [heroTexts.length]);

  // 视差效果
  const parallaxOffset = scrollY * 0.3;

  const handleCTAClick = (action) => {
    trackEvent('cta_clicked', { action, section: 'hero' });
    
    // 滚动到对应区域
    if (action === 'learn_more') {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* 背景装饰层 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
        
        {/* 动态几何图形 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-emerald-400/10 rounded-full blur-2xl animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* 公司Logo和标题 */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl md:text-3xl">岩</span>
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    IWABAYASHI
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mt-1">岩林株式会社</p>
              </div>
            </div>
            
            {/* 动态标语 */}
            <div className="h-16 md:h-20 flex items-center justify-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-200 max-w-4xl leading-relaxed">
                <TypewriterText 
                  texts={heroTexts} 
                  currentIndex={currentTextIndex}
                />
              </h2>
            </div>
          </div>

          {/* 服务特色标签 */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {['日本保健品进口', '大宗商品出口', '供应链管理', '专业服务'].map((feature, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium hover:bg-emerald-400/20 transition-all duration-300 cursor-default"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA按钮组 */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <button 
              onClick={() => handleCTAClick('learn_more')}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25"
            >
              <span className="relative z-10">了解我们的服务</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button 
              onClick={() => handleCTAClick('contact')}
              className="group px-8 py-4 border-2 border-emerald-400 rounded-lg font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
            >
              联系我们
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>

          {/* 联系信息快速展示 */}
          <div className={`mt-12 flex flex-wrap justify-center gap-8 text-gray-400 transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span className="text-sm">info@iwabayashi.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span className="text-sm">+81-3-1234-5678</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span className="text-sm">东京都港区</span>
            </div>
          </div>

          {/* 滚动指示器 */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-gray-400 text-sm mb-2">向下滚动探索更多</span>
              <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 装饰性网格背景 */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
    </section>
  );
};

// 打字机效果组件
const TypewriterText = ({ texts, currentIndex }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentFullText = texts[currentIndex] || '';
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentFullText.slice(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCharIndex(0);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [texts, currentIndex, charIndex, isDeleting]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Hero;