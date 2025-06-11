import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../utils/Analytics';

const Home = ({ dict, lang = 'zh' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // 视差滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 页面加载完成
  useEffect(() => {
    setIsLoaded(true);
    trackEvent('home_page_viewed');

    // 确保视频自动播放
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, []);

  // 计算视差效果
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 400;
  const contentOpacity = Math.max(0, 1 - scrollY / heroHeight);
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

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero区域 - 全屏 + 超大视频方块 */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100"
        style={{ height: '100vh', paddingTop: '80px' }}
      >
        
        <div className="flex h-full">
          
          {/* 左侧超大视频方块区域 */}
          <div className="w-3/5 flex items-center justify-center p-4 md:p-6 lg:p-8 video-container-compact">
            <div 
              className={`video-block relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
              }`}
              style={{ 
                width: '95%',
                height: '70%',
                maxWidth: '900px',
                maxHeight: '550px',
                backgroundColor: '#1a4d32'
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-forest-poster.jpg"
                className="video-optimized video-no-blackbars"
                style={{
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  transform: 'translate(-10%, -10%) scale(1.1)',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                }}
              >
                <source src="/videos/hero-forest.mp4" type="video/mp4" />
                <source src="/videos/hero-forest.webm" type="video/webm" />
                <img 
                  src="/images/hero-forest-fallback.jpg" 
                  alt="森林背景"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </video>
                           
              {/* 超强化的发光效果 */}
              <div className="absolute -inset-3 bg-gradient-to-r from-brand-green/40 via-light-green/30 to-brand-green/40 rounded-3xl blur-xl -z-10 animate-pulse"></div>
              <div className="absolute -inset-6 bg-gradient-to-br from-brand-green/20 to-sage-green/20 rounded-3xl blur-3xl -z-20"></div>
              <div className="absolute -inset-8 bg-gradient-to-r from-moss/10 to-light-green/10 rounded-3xl blur-3xl -z-30"></div>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div 
            className="w-2/5 flex items-center justify-center px-4 md:px-6 lg:px-8"
            style={{ 
              opacity: contentOpacity,
              transform: `translateY(${contentTransform}px)`
            }}
          >
            <div className="text-center max-w-lg">
              {/* 主标语 - TikTok风格实心发光字体 */}
              <div className={`transform transition-all duration-1000 delay-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h2 
                  className="tiktok-glow-text text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center"
                  data-lang={lang}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>上質な製品で</span>
                  <span style={{ display: 'block', marginTop: '0.5em', whiteSpace: 'nowrap' }}>ユーザーとつながる</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* 装饰性几何元素 - 全屏布局 */}
        <div className="absolute top-16 right-16 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-16 right-1/4 w-40 h-40 bg-sage-green/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-16 w-24 h-24 bg-light-green/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-moss/5 rounded-full blur-lg"></div>
        <div className="absolute top-2/3 right-12 w-16 h-16 bg-sage-green/8 rounded-full blur-lg"></div>
      </section>

      {/* 移动端布局 - 全屏 */}
      <section className="md:hidden relative bg-gradient-to-b from-white to-gray-50" style={{ height: '100vh', paddingTop: '80px' }}>
        <div className="flex flex-col h-full p-4">
          
          {/* 上部分 - Slogan */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 
                className="tiktok-glow-text text-xl font-bold leading-tight"
                data-lang={lang}
                style={{ whiteSpace: 'nowrap' }}
              >
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>上質な製品で</span>
                <span style={{ display: 'block', marginTop: '0.3em', whiteSpace: 'nowrap' }}>ユーザーとつながる</span>
              </h1>
            </div>
          </div>

          {/* 下部分 - 超大视频方块 */}
          <div className="flex-1 flex items-center justify-center">
            <div 
              className="video-block relative overflow-hidden rounded-2xl shadow-2xl w-full max-w-lg"
              style={{ 
                aspectRatio: '16/9', 
                height: '70%',
                backgroundColor: '#1a4d32'
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-forest-poster.jpg"
                className="video-optimized video-no-blackbars"
                style={{
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  transform: 'translate(-10%, -10%) scale(1.1)',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
              >
                <source src="/videos/hero-forest-mobile.mp4" type="video/mp4" />
                <source src="/videos/hero-forest.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-green/20 to-light-green/20 rounded-2xl blur-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* 减少视频容器上下边距 */
        .video-container-compact {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        /* TikTok风格发光字体 - 棱角硬朗 + 侧边发光（无呼吸效果） */
        .tiktok-glow-text {
          font-family: 'Montserrat', 'Inter', 'Hiragino Kaku Gothic Pro', 'Noto Sans CJK JP', 'Microsoft YaHei', sans-serif;
          font-weight: 900;
          letter-spacing: 0.05em;
          line-height: 1.1;
          position: relative;
          z-index: 10;
          
          /* 实心墨绿色文字 */
          color: #2d5a3d;
          
          /* TikTok风格侧边发光效果 - 静态 */
          text-shadow: 
            /* 主要发光 - 右侧 */
            3px 0 12px rgba(82, 183, 136, 0.7),
            6px 0 20px rgba(82, 183, 136, 0.5),
            8px 0 30px rgba(82, 183, 136, 0.3),
            
            /* 辅助发光 - 左侧 */
            -2px 0 8px rgba(149, 213, 178, 0.5),
            -3px 0 15px rgba(149, 213, 178, 0.3),
            
            /* 底部柔和发光 */
            0 2px 10px rgba(26, 77, 50, 0.4),
            0 4px 20px rgba(26, 77, 50, 0.2);
          
          /* 棱角硬朗效果 */
          text-rendering: geometricPrecision;
          -webkit-font-smoothing: subpixel-antialiased;
          -moz-osx-font-smoothing: auto;
          font-variant-numeric: lining-nums;
        }

        /* TikTok风格呼吸发光动画 - 已移除 */

        /* 日语文字特殊处理 */
        .tiktok-glow-text[data-lang="ja"] {
          font-family: 'Hiragino Kaku Gothic Pro', 'Noto Sans CJK JP', 'Yu Gothic', 'Meiryo', sans-serif;
          letter-spacing: 0.08em;
          line-height: 1.4;
          font-weight: 800;
        }

        /* 英语文字特殊处理 */
        .tiktok-glow-text[data-lang="en"] {
          font-family: 'Montserrat', 'Roboto Condensed', 'Arial Black', sans-serif;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          line-height: 1.0;
          font-weight: 900;
        }

        /* 中文文字特殊处理 */
        .tiktok-glow-text[data-lang="zh"] {
          font-family: 'Microsoft YaHei', 'PingFang SC', 'SimHei', 'WenQuanYi Micro Hei', sans-serif;
          letter-spacing: 0.06em;
          line-height: 1.15;
          font-weight: 900;
        }

        /* 微妙的炫光扫过效果 */
        .tiktok-glow-text::before {
          content: '';
          position: absolute;
          top: -10%;
          left: -30%;
          width: 160%;
          height: 120%;
          background: linear-gradient(
            60deg,
            transparent 40%,
            rgba(82, 183, 136, 0.15) 48%,
            rgba(149, 213, 178, 0.25) 50%,
            rgba(82, 183, 136, 0.15) 52%,
            transparent 60%
          );
          transform: translateX(-100%);
          animation: subtle-shine 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
          border-radius: 15px;
        }
        
        @keyframes subtle-shine {
          0% {
            transform: translateX(-120%) rotate(-5deg);
            opacity: 0;
          }
          25% {
            opacity: 0.7;
          }
          45% {
            transform: translateX(120%) rotate(-5deg);
            opacity: 0.7;
          }
          70% {
            opacity: 0;
          }
          100% {
            transform: translateX(120%) rotate(-5deg);
            opacity: 0;
          }
        }

        /* 超大视频方块样式 - 极致视觉冲击 */
        .video-block {
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .video-block:hover {
          transform: translateY(-16px) scale(1.04);
          box-shadow: 
            0 40px 80px rgba(26, 77, 50, 0.25),
            0 20px 40px rgba(26, 77, 50, 0.2),
            0 10px 20px rgba(26, 77, 50, 0.15);
        }

        /* 超强视频方块呼吸效果 */
        .video-block::before {
          content: '';
          position: absolute;
          inset: -12px;
          background: linear-gradient(45deg, 
            rgba(26, 77, 50, 0.15),
            rgba(82, 183, 136, 0.15),
            rgba(149, 213, 178, 0.1),
            rgba(26, 77, 50, 0.15)
          );
          border-radius: 2.5rem;
          filter: blur(30px);
          opacity: 0.6;
          animation: mega-glow-pulse 5s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes mega-glow-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.9);
          }
          33% {
            opacity: 0.8;
            transform: scale(1.1);
          }
          66% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        /* 视频优化样式 - 强力去除黑边 */
        .video-optimized {
          transition: transform 0.3s ease;
        }

        .video-no-blackbars {
          /* 强制填充整个容器，完全去除黑边 */
          width: 120% !important;
          height: 120% !important;
          object-fit: cover !important;
          object-position: center center !important;
          transform: translate(-10%, -10%) scale(1.15) !important;
          min-width: 110% !important;
          min-height: 110% !important;
        }

        /* 桌面端优化 */
        @media (min-width: 768px) {
          .w-3-5 {
            width: 60%;
          }
          
          .video-block {
            height: 70% !important;
            max-height: 550px !important;
          }
        }

        /* 响应式优化 - 多语言适配 */
        @media (max-width: 768px) {
          .tiktok-glow-text {
            font-size: 1.5rem;
            line-height: 1.2;
            letter-spacing: 0.02em;
            text-shadow: 
              2px 0 8px rgba(82, 183, 136, 0.6),
              4px 0 15px rgba(82, 183, 136, 0.4),
              6px 0 25px rgba(82, 183, 136, 0.2),
              -1px 0 6px rgba(149, 213, 178, 0.4),
              -2px 0 12px rgba(149, 213, 178, 0.2),
              0 1px 8px rgba(26, 77, 50, 0.3);
          }
          
          .tiktok-glow-text[data-lang="ja"] {
            font-size: 1.4rem;
            letter-spacing: 0.04em;
          }
          
          .tiktok-glow-text[data-lang="en"] {
            font-size: 1.5rem;
            letter-spacing: 0.01em;
          }
          
          .tiktok-glow-text[data-lang="zh"] {
            font-size: 1.5rem;
            letter-spacing: 0.03em;
          }

          .video-block {
            height: 70% !important;
            aspect-ratio: 16/9 !important;
          }

          /* 移动端发光效果 - 已移除呼吸动画 */
        }

        @media (max-width: 480px) {
          .tiktok-glow-text {
            font-size: 1.2rem;
            letter-spacing: 0;
            text-shadow: 
              1px 0 8px rgba(82, 183, 136, 0.6),
              3px 0 15px rgba(82, 183, 136, 0.4),
              0 2px 10px rgba(26, 77, 50, 0.4);
          }
          
          .tiktok-glow-text[data-lang="ja"] {
            font-size: 1.1rem;
          }
          
          .tiktok-glow-text[data-lang="en"] {
            font-size: 1.0rem;
          }
          
          .tiktok-glow-text[data-lang="zh"] {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;