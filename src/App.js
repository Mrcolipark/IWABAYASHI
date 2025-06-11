import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import { trackPageView, initAllTracking } from "./utils/Analytics";

// 导入 i18n 配置
import './i18n';

// 页面组件懒加载
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const News = React.lazy(() => import("./pages/News"));
const Contact = React.lazy(() => import("./pages/Contact"));

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 初始化应用
  useEffect(() => {
    try {
      // 初始化分析工具
      initAllTracking();
      
      // 设置页面标题
      document.title = "岩林株式会社 - 专业的中日贸易综合服务商";
      
      // 设置meta描述
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', '专业的中日贸易服务商');
      
      // 设置关键词
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', '中日贸易,岩林株式会社');

    } catch (error) {
      console.error('Error in useEffect:', error);
    }

    // 模拟初始加载
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // 页面加载包装器
  const PageWrapper = ({ children }) => (
    <ErrorBoundary>
      <React.Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-brand-green">页面加载中...</p>
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
                  <Home />
                </PageWrapper>
              } 
            />
            
            {/* 关于我们 */}
            <Route 
              path="/about" 
              element={
                <PageWrapper>
                  <About />
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
                  <News />
                </PageWrapper>
              } 
            />
            
            {/* 联系方式 */}
            <Route 
              path="/contact" 
              element={
                <PageWrapper>
                  <Contact />
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