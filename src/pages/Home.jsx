import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../utils/Analytics';
import { useHomeContent } from '../hooks/useCMSContent';
import { useTranslation } from 'react-i18next';

const Home = ({ dict, lang = 'zh' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const { content: homeContent } = useHomeContent();
  const { t } = useTranslation();

  // 移动端检测
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 视差滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // 添加错误处理
    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } catch (error) {
      console.warn('Failed to add scroll listener:', error);
    }
    
    // 确保清理函数正确执行
    return () => {
      try {
        window.removeEventListener('scroll', handleScroll);
      } catch (error) {
        console.warn('Failed to remove scroll listener:', error);
      }
    };
  }, []);

  // 页面加载完成
  useEffect(() => {
    setIsLoaded(true);
    trackEvent('home_page_viewed');

    if (!isMobile && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
          console.log('Video started playing');
        } catch (err) {
          console.log('Video autoplay failed:', err);
          videoRef.current.style.display = 'none';
        }
      };

      playVideo();
    }
  }, [isMobile]);

  // 计算视差效果
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 400;
  const contentOpacity = Math.max(0, 1 - scrollY / (heroHeight * 0.8));
  const contentTransform = scrollY * 0.3;

  // 安全获取文本内容
  const safeGet = (obj, path, defaultValue = '') => {
    if (!obj || typeof obj !== 'object') return defaultValue;
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
  };

  // 根据设备选择视频源
  const getVideoSources = () => [
    { src: "/videos/hero-forest.mp4", type: "video/mp4" }
  ];

  const heroBackgroundStyle = isMobile
    ? {
        backgroundImage: "url(/hero-forest-poster.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }
    : {
        background: "linear-gradient(135deg, #1a4d32 0%, #2d5a3d 100%)"
      };

  return (
    <div className="min-h-screen bg-black">

      {/* 全屏Hero区域 */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
        style={heroBackgroundStyle}
      >

        {/* 全屏森林视频背景 */}
        {!isMobile && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            crossOrigin="anonymous"
            preload="auto"
            className="absolute top-0 left-0"
            style={{
              width: '100vw',
              height: '100vh',
              minWidth: '120vw',
              minHeight: '120vh',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'translate(-10vw, -10vh) scale(1.2)'
            }}
            onLoadStart={() => {
              console.log('Loading desktop video');
            }}
            onError={(e) => {
              console.error('Video load error:', e);
              e.currentTarget.style.display = 'none';
              if (heroRef.current) {
                heroRef.current.style.background = 'linear-gradient(135deg, #1a4d32 0%, #2d5a3d 100%)';
              }
            }}
            onCanPlay={() => {
              heroRef.current && (heroRef.current.style.background = 'none');
              videoRef.current?.play().catch(() => {});
            }}
            onLoadedData={() => {
              heroRef.current && (heroRef.current.style.background = 'none');
              videoRef.current?.play().catch(() => {});
            }}
          >
            {getVideoSources().map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
          </video>
        )}

        {/* 轻微渐变遮罩 - 增强文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30"></div>

        {/* 中心Slogan */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ 
            opacity: contentOpacity,
            transform: `translateY(${contentTransform}px)`
          }}
        >
          <div className="text-center">
            
            {/* 主标语 - 简化版 */}
            <div className={`transform transition-all duration-1500 delay-800 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}>
              <h1 className="tiktok-glow-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center">
                {(() => {
                  const slogan = t('home.slogan', {
                    defaultValue: homeContent?.hero?.slogan || '上質な製品でユーザーとつながる'
                  });
                  const index = slogan.indexOf('で');
                  if (index !== -1) {
                    return (
                      <>
                        <span className="hero-text-line">{slogan.slice(0, index + 1)}</span>
                        <span className="hero-text-line">{slogan.slice(index + 1)}</span>
                      </>
                    );
                  }
                  return <span className="hero-text-line">{slogan}</span>;
                })()}
              </h1>
            </div>

          </div>
        </div>
        
      </section>

      <style jsx>{`
        /* TikTok风格发光字体 - 修复可读性 */
        .tiktok-glow-text {
          font-family: 'Montserrat', 'Hiragino Kaku Gothic Pro', 'Noto Sans CJK JP', 'Microsoft YaHei', sans-serif;
          font-weight: 900;
          letter-spacing: 0.05em;
          line-height: 1.1;
          position: relative;
          z-index: 10;
          
          /* 白色文字 - 确保可读性 */
          color: #ffffff;
          
          /* 简化的发光效果 */
          text-shadow: 
            /* 绿色发光边缘 */
            0 0 10px rgba(82, 183, 136, 0.8),
            0 0 20px rgba(82, 183, 136, 0.6),
            0 0 30px rgba(82, 183, 136, 0.4),
            
            /* 黑色阴影增强对比度 */
            2px 2px 4px rgba(0, 0, 0, 0.8),
            4px 4px 8px rgba(0, 0, 0, 0.6),
            6px 6px 12px rgba(0, 0, 0, 0.4);
          
          /* 棱角硬朗效果 */
          text-rendering: geometricPrecision;
          -webkit-font-smoothing: subpixel-antialiased;
          -moz-osx-font-smoothing: auto;
          font-variant-numeric: lining-nums;
        }

        .hero-text-line {
          display: block;
          margin-bottom: 0.2em;
          position: relative;
        }

        /* 响应式优化 */
        @media (max-width: 1024px) {
          .tiktok-glow-text {
            font-size: 3.5rem;
            letter-spacing: 0.03em;
          }
        }

        @media (max-width: 768px) {
          .tiktok-glow-text {
            font-size: 2.5rem;
            line-height: 1.2;
            text-shadow: 
              0 0 8px rgba(82, 183, 136, 0.7),
              0 0 16px rgba(82, 183, 136, 0.5),
              0 0 24px rgba(82, 183, 136, 0.3),
              2px 2px 4px rgba(0, 0, 0, 0.8),
              4px 4px 8px rgba(0, 0, 0, 0.6);
          }
        }

        @media (max-width: 480px) {
          .tiktok-glow-text {
            font-size: 2rem;
            letter-spacing: 0.02em;
            text-shadow: 
              0 0 6px rgba(82, 183, 136, 0.6),
              0 0 12px rgba(82, 183, 136, 0.4),
              0 0 18px rgba(82, 183, 136, 0.2),
              1px 1px 2px rgba(0, 0, 0, 0.8),
              2px 2px 4px rgba(0, 0, 0, 0.6);
          }
        }

        /* 高质量文字渲染 */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .premium-text-hero {
            -webkit-text-stroke: 0.5px transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;