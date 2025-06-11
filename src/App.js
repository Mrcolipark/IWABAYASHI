import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import { trackPageView, initAllTracking } from "./utils/Analytics";
import { useDict } from "./hooks/useDict";

// 导入 i18n 配置
import './i18n';

// 页面组件懒加载 - 带错误处理
const Home = React.lazy(() => 
  import("./pages/Home").catch(err => {
    console.error('Failed to load Home component:', err);
    return { default: () => <div className="p-8 text-center">Home page failed to load</div> };
  })
);

const About = React.lazy(() => 
  import("./pages/About").catch(err => {
    console.error('Failed to load About component:', err);
    return { default: () => <div className="p-8 text-center">About page failed to load</div> };
  })
);

const Services = React.lazy(() => 
  import("./pages/Services").catch(err => {
    console.error('Failed to load Services component:', err);
    return { default: () => <div className="p-8 text-center">Services page failed to load</div> };
  })
);

const News = React.lazy(() => 
  import("./pages/News").catch(err => {
    console.error('Failed to load News component:', err);
    return { default: () => <div className="p-8 text-center">News page failed to load</div> };
  })
);

const Contact = React.lazy(() => 
  import("./pages/Contact").catch(err => {
    console.error('Failed to load Contact component:', err);
    return { default: () => <div className="p-8 text-center">Contact page failed to load</div> };
  })
);

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const dict = useDict(); // 使用字典数据

  console.log('App rendering with dict:', Object.keys(dict));

  // 初始化应用
  useEffect(() => {
    try {
      // 初始化分析工具
      initAllTracking();
      
      // 设置页面标题
      document.title = dict.meta?.title || "岩林株式会社 - 专业的中日贸易综合服务商";
      
      // 设置meta描述
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', dict.meta?.description || '专业的中日贸易服务商');
      
      // 设置关键词
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', dict.meta?.keywords || '中日贸易,岩林株式会社');

      console.log('App initialized successfully');
    } catch (error) {
      console.error('Error in App useEffect:', error);
    }

    // 模拟初始加载
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      console.log('Initial loading completed');
    }, 1200);

    return () => clearTimeout(timer);
  }, [dict]);

  // 页面加载包装器 - 增强版
  const PageWrapper = ({ children }) => (
    <ErrorBoundary>
      <React.Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-brand-green font-medium">页面加载中...</p>
              <p className="text-gray-500 text-sm mt-2">正在准备精彩内容</p>
            </div>
          </div>
        }
      >
        {children}
      </React.Suspense>
    </ErrorBoundary>
  );

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  console.log('Rendering main app with full components');

  return (
    <Router>
      <div className="min-h-screen bg-white text-brand-green">
        <Layout>
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
            
            {/* 关于我们 */}
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
                  <Services />
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
                  <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-brand-green mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-8">页面未找到</p>
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