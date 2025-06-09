import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/Analytics';

// 轮播组件
const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // 风景照片列表（放在public文件夹中）
  const images = [
    '/banner1.jpg',
    '/banner2.jpg', 
    '/banner3.jpg'
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const goToSlide = (index) => {
    setCurrentImage(index);
    trackEvent('carousel_slide_clicked', { slide: index });
  };

  return (
    <div 
      className="relative h-full w-full group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-full w-full overflow-hidden">
        {images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={src}
              alt={`风景 ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              onError={(e) => {
                // 如果图片加载失败，显示占位图
                e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                  <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2f3e46"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#52b788" font-family="Arial" font-size="16">
                      风景照片 ${i + 1}
                    </text>
                  </svg>
                `)}`;
              }}
            />
            {/* 图片遮罩层 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* 轮播指示器 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentImage 
                ? 'bg-moss scale-125 shadow-lg' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`查看图片 ${i + 1}`}
          />
        ))}
      </div>


      {/* 导航箭头 */}
      <button
        onClick={() => setCurrentImage(prev => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
        aria-label="上一张图片"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentImage(prev => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
        aria-label="下一张图片"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

// 打字机效果组件
const TypingEffect = ({ text, speed = 120 }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setShowCursor(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="relative">
      {displayText}
      {showCursor && <span className="animate-pulse ml-1 text-sage">|</span>}
    </span>
  );
};

const Home = ({ dict }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // 追踪首页访问
    trackEvent('home_page_viewed');
  }, []);

  const handleCTAClick = (action) => {
    trackEvent('home_cta_clicked', { action });
  };

  return (
    <div className="min-h-screen bg-charcoal">
      
      {/* 主要梯形分割区域 - 修复布局 */}
      <section ref={sectionRef} className="relative min-h-screen pt-20 md:pt-24 lg:pt-28 pb-16 flex items-center justify-center overflow-hidden">
        
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-forest/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-moss/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          
          {/* 桌面端梯形设计 */}
          <div className="hidden md:block relative h-96 lg:h-[32rem] overflow-hidden rounded-2xl shadow-2xl">
            
            {/* 左侧梯形 - 图片轮播 */}
            <div className="absolute inset-0 w-full h-full">
              <div className="trapezoid-left absolute top-0 left-0 w-full h-full overflow-hidden bg-slate">
                <ImageCarousel />
              </div>
            </div>

            {/* 右侧梯形 - Slogan */}
            <div className="absolute inset-0 w-full h-full">
              <div className="trapezoid-right absolute top-0 left-0 w-full h-full bg-gradient-to-br from-forest via-jade to-moss flex items-center justify-center">
                <div className="text-white text-center max-w-lg px-6 lg:px-8 ml-auto mr-8 lg:mr-12">
                  

                  {/* 主要Slogan */}
                  <div className={`mb-6 transform transition-all duration-1000 delay-500 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-white leading-tight">
                      <TypingEffect text={dict.home.slogan} speed={100} />
                    </h1>
                    <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                      {dict.home.subtitle}
                    </p>
                  </div>

                  {/* 装饰性元素 */}
                  <div className={`flex items-center justify-center space-x-3 transform transition-all duration-1000 delay-700 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div>
                    <span className="text-white/80 text-xs font-medium tracking-wider">IWABAYASHI</span>
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 移动端垂直布局 */}
          <div className="md:hidden space-y-0 rounded-2xl overflow-hidden shadow-xl">
            
            {/* 上部分 - 图片 */}
            <div className="relative h-64 overflow-hidden">
              <ImageCarousel />
            </div>
            
            {/* 下部分 - Slogan */}
            <div className="bg-gradient-to-br from-charcoal via-slate to-forest p-8 text-white text-center">
              
              {/* 公司标识 */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-forest to-moss rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-white font-bold text-lg">岩</span>
                </div>
                <h2 className="text-sm font-medium text-sage">岩林株式会社</h2>
              </div>

              <h1 className="text-xl font-bold mb-4 text-moss leading-tight">
                <TypingEffect text={dict.home.slogan} speed={80} />
              </h1>
              <p className="text-sage text-base leading-relaxed mb-6">
                {dict.home.subtitle}
              </p>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-0.5 bg-moss"></div>
                <span className="text-moss text-xs font-medium tracking-wider">IWABAYASHI</span>
                <div className="w-8 h-0.5 bg-moss"></div>
              </div>
            </div>
          </div>

          {/* 底部导航按钮 */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/about"
                onClick={() => handleCTAClick('about')}
                className="group relative px-8 py-4 bg-gradient-to-r from-forest to-jade rounded-lg font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <span className="relative z-10">了解我们</span>
                <div className="absolute inset-0 bg-gradient-to-r from-jade to-moss opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/services"
                onClick={() => handleCTAClick('services')}
                className="group px-8 py-4 border-2 border-moss text-moss rounded-lg font-semibold hover:bg-moss hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                业务内容
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>

          {/* 快速信息展示 */}
          <div className={`mt-16 text-center transform transition-all duration-1000 delay-1200 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-moss mb-6">专业的中日贸易服务</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest to-jade rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">保健品进口</h4>
                  <p className="text-gray-400 text-sm">日本优质保健品代理进口</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-jade to-moss rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚢</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">商品出口</h4>
                  <p className="text-gray-400 text-sm">中国优质商品出口拓展</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-moss to-sage rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">专业服务</h4>
                  <p className="text-gray-400 text-sm">全方位贸易咨询与服务</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-gray-400 text-sm mb-2">探索更多</span>
            <div className="w-6 h-10 border-2 border-moss rounded-full flex justify-center">
              <div className="w-1 h-3 bg-moss rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;