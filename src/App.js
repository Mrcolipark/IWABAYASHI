import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import langData from "./i18n/langData";
import { trackPageView, initAllTracking } from "./utils/Analytics";

// 页面组件懒加载
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const News = React.lazy(() => import("./pages/News"));
const Contact = React.lazy(() => import("./pages/Contact"));

function App() {
  const [lang, setLang] = useState("zh");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // 添加安全检查和默认值
  const dict = React.useMemo(() => {
    // 检查 langData 是否正确加载
    if (!langData) {
      console.error('langData is not loaded');
      return getDefaultDict();
    }
    
    // 检查指定语言是否存在
    if (!langData[lang]) {
      console.error(`Language '${lang}' not found in langData`);
      return langData.zh || getDefaultDict(); // 回退到中文或默认值
    }
    
    return langData[lang];
  }, [lang]);

  // 默认字典，防止undefined错误
  function getDefaultDict() {
    return {
      meta: {
        title: '岩林株式会社',
        description: '专业的中日贸易综合服务商',
        keywords: '日本贸易,保健品进口,岩林株式会社'
      },
      menu: ["首页", "会社概要", "事业内容", "ニュース", "お問い合わせ"],
      home: {
        slogan: "上質な製品でユーザーとつながる",
        subtitle: "搭建中日优质商品流通桥梁",
        description: "岩林株式会社致力于成为具有国际影响力的贸易服务商"
      }
    };
  }

  // 初始化应用
  useEffect(() => {
    // 确保 dict 和 dict.meta 存在后再执行
    if (!dict || !dict.meta) {
      console.error('Dictionary or meta data is missing');
      return;
    }

    try {
      // 初始化分析工具
      initAllTracking();
      
      // 设置HTML语言属性
      document.documentElement.lang = lang;
      
      // 设置页面标题
      document.title = dict.meta.title;
      
      // 设置meta描述
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', dict.meta.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = dict.meta.description;
        document.head.appendChild(meta);
      }
      
      // 设置关键词
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', dict.meta.keywords);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = dict.meta.keywords;
        document.head.appendChild(meta);
      }
      
      // 预加载关键资源
      const preloadImages = [
        '/logo.png',
        '/banner1.jpg',
        '/banner2.jpg',
        '/banner3.jpg'
      ];
      
      preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

    } catch (error) {
      console.error('Error in useEffect:', error);
    }

    // 模拟初始加载
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [lang, dict]);

  // 语言切换处理
  const handleLanguageChange = (newLang) => {
    // 检查新语言是否存在
    if (!langData || !langData[newLang]) {
      console.error(`Language '${newLang}' not available`);
      return;
    }
    
    setLang(newLang);
    document.documentElement.lang = newLang;
    
    // 追踪语言切换事件
    if (typeof trackPageView === 'function') {
      trackPageView(`language_changed_to_${newLang}`);
    }
  };

  // 页面加载包装器
  const PageWrapper = ({ children }) => (
    <ErrorBoundary>
      <React.Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-charcoal">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-moss border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sage">页面加载中...</p>
            </div>
          </div>
        }
      >
        {children}
      </React.Suspense>
    </ErrorBoundary>
  );

  // 如果 langData 完全没有加载，显示错误信息
  if (!langData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal text-white">
        <div className="text-center">
          <h1 className="text-2xl mb-4">语言数据加载失败</h1>
          <p>请刷新页面重试</p>
        </div>
      </div>
    );
  }

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-charcoal text-gray-100">
        <Layout lang={lang} setLang={handleLanguageChange} dict={dict}>
          <Routes>
            {/* 主页 */}
            <Route 
              path="/" 
              element={
                <PageWrapper>
                  <Home dict={dict} />
                </PageWrapper>
              } 
            />
            
            {/* 会社概要 */}
            <Route 
              path="/about" 
              element={
                <PageWrapper>
                  <About dict={dict} />
                </PageWrapper>
              } 
            />
            
            {/* 事业内容 */}
            <Route 
              path="/services" 
              element={
                <PageWrapper>
                  <Services dict={dict} />
                </PageWrapper>
              } 
            />
            
            {/* 新闻动态 */}
            <Route 
              path="/news" 
              element={
                <PageWrapper>
                  <News dict={dict} />
                </PageWrapper>
              } 
            />
            
            {/* 联系方式 */}
            <Route 
              path="/contact" 
              element={
                <PageWrapper>
                  <Contact dict={dict} />
                </PageWrapper>
              } 
            />
            
            {/* 404页面 */}
            <Route 
              path="*" 
              element={
                <PageWrapper>
                  <div className="min-h-screen flex items-center justify-center bg-charcoal">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-moss mb-4">404</h1>
                      <p className="text-xl text-gray-400 mb-8">页面未找到</p>
                      <a 
                        href="/" 
                        className="btn-primary inline-block"
                      >
                        返回首页
                      </a>
                    </div>
                  </div>
                </PageWrapper>
              } 
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;