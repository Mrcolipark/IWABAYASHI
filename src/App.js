import React, { useState, useEffect, useCallback } from "react";
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
  
  // 默认字典，防止undefined错误
  const getDefaultDict = useCallback(() => {
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
      },
      about: {
        title: "会社概要",
        subtitle: "年轻而充满活力的中日贸易桥梁",
        companyInfo: {
          name: "岩林株式会社",
          englishName: "IWABAYASHI Corporation",
          established: "2025年",
          headquarters: "日本",
          business: "中日双边贸易综合服务"
        },
        description: "岩林株式会社成立于2025年，致力于中日双边贸易。",
        philosophy: { title: "经营理念", values: ["专业", "高效", "共赢"] },
        vision: { title: "公司愿景", content: "成为具有国际影响力的贸易服务商" },
        mission: { title: "公司使命", content: "创造更高品质的生活价值" },
        team: { title: "团队特色", content: "年轻而充满活力的专业团队" }
      },
      services: {
        title: "事业内容",
        subtitle: "专业的贸易服务",
        currentBusiness: {
          title: "现阶段重点业务",
          services: [{
            title: "日本保健品进口代理",
            status: "进行中",
            description: "专业的保健品进口代理服务",
            features: ["品质保证", "专业服务", "高效流程", "优质体验"],
            advantages: ["日本品质", "严格标准", "安全可靠", "满足需求"]
          }]
        },
        futureBusiness: {
          title: "未来业务规划",
          services: [{
            title: "中国大宗商品出口拓展",
            status: "规划中",
            description: "未来的出口业务规划",
            features: ["市场拓展", "资源整合", "专业开拓", "服务完善"],
            advantages: ["制造优势", "市场经验", "服务能力", "合作促进"]
          }]
        },
        serviceCapabilities: {
          title: "服务能力",
          capabilities: [
            { name: "专业咨询", description: "市场分析和咨询服务" },
            { name: "供应链管理", description: "高效的供应链管理" },
            { name: "进出口服务", description: "一站式进出口服务" }
          ]
        }
      },
      news: {
        title: "ニュース",
        subtitle: "最新动态",
        articles: [
          {
            id: 1,
            title: "岩林株式会社正式成立",
            date: "2025-01-15",
            category: "公司动态",
            summary: "公司正式成立",
            content: "岩林株式会社正式成立。"
          }
        ]
      },
      contact: {
        title: "お問い合わせ",
        subtitle: "期待与您合作",
        info: {
          company: "岩林株式会社",
          email: "info@iwabayashi.com",
          phone: "+81-3-1234-5678",
          address: "日本东京都港区",
          businessHours: "周一至周五 9:00-18:00"
        },
        form: {
          name: "姓名", email: "邮箱", company: "公司", phone: "电话",
          subject: "主题", message: "留言", submit: "发送",
          success: "发送成功", error: "发送失败"
        }
      },
      footer: {
        description: "专业的中日贸易服务商",
        quickLinks: "快速链接",
        contact: "联系方式",
        business: "业务内容",
        links: { privacy: "隐私政策", terms: "使用条款", sitemap: "网站地图" }
      }
    };
  }, []);

  // 安全的字典获取函数
  const getDictionary = useCallback((language) => {
    // 确保 langData 存在且包含指定语言
    if (!langData || !langData[language]) {
      console.warn(`Language '${language}' not found, falling back to Chinese`);
      return langData?.zh || getDefaultDict();
    }
    return langData[language];
  }, [getDefaultDict]);

  // 获取当前语言的字典，使用 useMemo 优化性能
  const dict = React.useMemo(() => getDictionary(lang), [lang, getDictionary]);

  // 初始化应用
  useEffect(() => {
    try {
      // 初始化分析工具
      initAllTracking();
      
      // 设置HTML语言属性
      document.documentElement.lang = lang;
      
      // 设置页面标题和meta信息
      if (dict?.meta) {
        document.title = dict.meta.title || "岩林株式会社";
        
        // 设置meta描述
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', dict.meta.description || '专业的中日贸易服务商');
        
        // 设置关键词
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.name = 'keywords';
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', dict.meta.keywords || '中日贸易,岩林株式会社');
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
  const handleLanguageChange = useCallback((newLang) => {
    // 检查新语言是否在支持的语言列表中
    const supportedLanguages = ['zh', 'ja', 'en'];
    if (!supportedLanguages.includes(newLang)) {
      console.error(`Language '${newLang}' not supported`);
      return;
    }
    
    // 检查语言数据是否存在
    if (!langData || !langData[newLang]) {
      console.error(`Language data for '${newLang}' not available`);
      return;
    }
    
    setLang(newLang);
    document.documentElement.lang = newLang;
    
    // 追踪语言切换事件
    if (typeof trackPageView === 'function') {
      trackPageView(`language_changed_to_${newLang}`);
    }
  }, []);

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
                      <p className="text-xl text-gray-400 mb-8">
                        {dict?.notFound || "页面未找到"}
                      </p>
                      <a 
                        href="/" 
                        className="btn-primary inline-block"
                      >
                        {dict?.backHome || "返回首页"}
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