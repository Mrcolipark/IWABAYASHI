import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/Analytics';

// 缓存的分类按钮组件
const CategoryButton = React.memo(({ category, isActive, onCategoryChange }) => {
  const handleClick = useCallback(() => {
    onCategoryChange(category.id);
  }, [onCategoryChange, category.id]);

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? 'bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm'
      }`}
    >
      <span className="text-2xl">{category.icon}</span>
      <span>{category.label}</span>
    </button>
  );
});

CategoryButton.displayName = 'CategoryButton';

// 缓存的文章卡片组件
const ArticleCard = React.memo(({ article, index, isVisible, onArticleClick }) => {
  const handleClick = useCallback(() => {
    onArticleClick(article);
  }, [onArticleClick, article]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  return (
    <article
      className={`group cursor-pointer transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onClick={handleClick}
    >
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
        
        {/* 特色图片 */}
        {article.featuredImage && (
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.height = '0px';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        {/* 文章头部 */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-full text-xs font-medium">
              {article.category}
            </span>
            <time className="text-gray-500 text-sm">
              {formatDate(article.date)}
            </time>
          </div>
          
          <h3 className="text-xl font-bold text-brand-green mb-3 group-hover:text-light-green transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {article.summary}
          </p>
        </div>

        {/* 文章底部 */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>📖</span>
              <span>阅读全文</span>
            </div>
            <div className="text-brand-green text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
              →
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';

// 文章详情模态框组件
const ArticleModal = React.memo(({ article, onClose }) => {
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleContactClick = useCallback(() => {
    trackEvent('article_to_contact_clicked', { articleId: article.id });
    onClose();
  }, [article.id, onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        
        {/* 特色图片 */}
        {article.featuredImage && (
          <div className="relative h-64 bg-gray-200 overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}

        {/* 模态框头部 */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <time className="text-gray-500 text-sm">
              {formatDate(article.date)}
            </time>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            ✕
          </button>
        </div>

        {/* 模态框内容 */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-brand-green mb-6">{article.title}</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{article.summary}</p>
          
          {/* 文章正文 */}
          <div className="prose prose-gray max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6">
              {article.content && article.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-lg">{paragraph}</p>
                )
              ))}
            </div>
          </div>

          {/* 文章底部 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-gray-500 text-sm">
                发布时间：{formatDate(article.date)}
              </div>
              <Link
                to="/contact"
                onClick={handleContactClick}
                className="px-6 py-3 bg-gradient-brand rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
              >
                了解更多详情
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ArticleModal.displayName = 'ArticleModal';

// 主要的News组件 - 完全修复版本
const News = ({ dict }) => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  // 安全的翻译函数
  const safeT = (key, defaultValue = '') => {
    try {
      const translation = t(key);
      return translation === key ? defaultValue : translation;
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return defaultValue;
    }
  };

  // 动态加载文章数据
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        
        let articlesData = [];
        
        try {
          const response = await fetch('/api/news-index.json');
          if (response.ok) {
            articlesData = await response.json();
            console.log('Loaded articles from API:', articlesData);
          }
        } catch (apiError) {
          console.log('API load failed, trying static method:', apiError);
        }
        
        if (articlesData.length === 0) {
          articlesData = [
            {
              id: "2025-06-12-ceo-appointment",
              title: "赵子淇出任岩林集团CEO",
              date: "2025-06-12T10:31:33.590Z",
              category: "公司动态",
              summary: "赵子淇正式出任岩林集团CEO，将带领公司迈向新的发展阶段，专注于中日贸易业务的深化和拓展。",
              content: "我们很高兴地宣布，赵子淇先生正式出任岩林集团CEO一职。赵先生拥有丰富的国际贸易经验和卓越的领导能力，将带领岩林株式会社迈向新的发展阶段。\n\n在担任CEO后，赵子淇先生将专注于以下几个关键领域：深化中日贸易合作关系、拓展日本保健品进口业务、推进中国商品出口日本市场的战略规划，以及加强公司的数字化转型。\n\n我们相信，在赵子淇先生的领导下，岩林株式会社将在中日贸易领域取得更大的成就，为两国经贸合作做出更大贡献。",
              featuredImage: "/images/uploads/img_4232.jpg",
              status: "已发布",
              author: "岩林株式会社",
              keywords: "CEO,赵子淇,岩林集团,任命"
            },
            {
              id: "2025-01-15-company-establishment",
              title: "岩林株式会社正式成立",
              date: "2025-01-15",
              category: "公司动态",
              summary: "岩林株式会社正式成立，致力于打造中日贸易新桥梁，专注于日本保健品进口代理服务",
              content: "2025年1月15日，岩林株式会社正式成立。作为一家专注于中日双边贸易的综合性贸易公司，我们将秉持专业、高效、共赢的经营理念，积极拓展国际市场资源，搭建中日商品流通的桥梁。\n\n公司成立之初，我们就明确了发展方向：以日本保健品进口代理为切入点，逐步拓展到大宗商品出口等领域。我们相信，通过专业的服务和不懈的努力，必将为中日两国的经贸合作贡献力量。",
              status: "已发布",
              author: "岩林株式会社",
              keywords: "岩林株式会社,成立,中日贸易,保健品进口"
            },
            {
              id: "2025-01-10-health-product-market-analysis",
              title: "日本保健品市场深度解析",
              date: "2025-01-10",
              category: "市场分析",
              summary: "探索日本保健品行业的发展现状与未来趋势，分析市场机遇与挑战",
              content: "日本保健品市场以其严格的质量标准和先进的生产工艺而闻名全球。根据最新市场数据显示，日本保健品市场规模持续增长，年增长率达到15.2%。\n\n市场特点包括：消费者对品质要求极高、功能性产品需求旺盛、老龄化社会推动市场发展等。这为中国市场引入优质日本保健品提供了良好机遇。",
              status: "已发布",
              author: "市场分析部",
              keywords: "日本保健品,市场分析,健康产业,消费趋势"
            },
            {
              id: "2025-01-05-china-japan-trade-opportunities",
              title: "中日贸易合作新机遇",
              date: "2025-01-05",
              category: "行业洞察",
              summary: "探讨中日两国贸易合作的新发展机遇，分析跨境电商和数字化贸易的发展趋势",
              content: "随着全球经济一体化的深入发展，中日两国在贸易合作方面迎来了新的发展机遇。双方在健康产业、先进制造业、绿色能源等领域具有广阔的合作空间。\n\n特别是在跨境电商快速发展的背景下，两国贸易模式正在发生深刻变化，为企业提供了更多的合作可能性。",
              status: "已发布",
              author: "战略研究部",
              keywords: "中日贸易,合作机遇,跨境电商,数字化贸易"
            }
          ];
        }
        
        articlesData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(articlesData);
        setError(null);
      } catch (error) {
        console.error('Failed to load articles:', error);
        setError('文章加载失败');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // 基础翻译数据
  const newsData = useMemo(() => ({
    title: safeT('news.title', '新闻动态'),
    subtitle: safeT('news.subtitle', '最新动态与行业洞察'),
    noArticles: safeT('news.noArticles', '暂无相关文章'),
    selectOtherCategory: safeT('news.selectOtherCategory', '请选择其他分类查看更多内容'),
    categories: [
      { id: 'all', label: safeT('news.categories.all', '全部'), icon: '📰' },
      { id: '公司动态', label: safeT('news.categories.company', '公司动态'), icon: '🏢' },
      { id: '市场分析', label: safeT('news.categories.market', '市场分析'), icon: '📊' },
      { id: '行业洞察', label: safeT('news.categories.industry', '行业洞察'), icon: '🔍' }
    ],
    industryTrends: {
      title: safeT('news.industryTrends.title', '行业趋势概览'),
      description: safeT('news.industryTrends.description', '把握中日贸易发展脉搏，洞察市场变化趋势'),
      trends: [
        {
          title: safeT('news.industryTrends.trends.0.title', '日本健康食品市场'),
          trend: safeT('news.industryTrends.trends.0.trend', '持续增长'),
          value: "15.2%",
          desc: safeT('news.industryTrends.trends.0.desc', '年增长率')
        },
        {
          title: safeT('news.industryTrends.trends.1.title', '中日贸易总额'),
          trend: safeT('news.industryTrends.trends.1.trend', '稳步上升'),
          value: "¥3.2万亿",
          desc: safeT('news.industryTrends.trends.1.desc', '2024年预计')
        },
        {
          title: safeT('news.industryTrends.trends.2.title', '跨境电商增长'),
          trend: safeT('news.industryTrends.trends.2.trend', '快速发展'),
          value: "28.5%",
          desc: safeT('news.industryTrends.trends.2.desc', '同比增长')
        }
      ]
    },
    newsletter: {
      title: safeT('news.newsletter.title', '订阅我们的资讯'),
      description: safeT('news.newsletter.description', '第一时间获取中日贸易最新动态和市场洞察'),
      placeholder: safeT('news.newsletter.placeholder', '请输入您的邮箱地址'),
      subscribe: safeT('news.newsletter.subscribe', '订阅')
    }
  }), [safeT]);

  // 可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    trackEvent('news_page_viewed');
    return () => observer.disconnect();
  }, []);

  // 过滤文章
  const filteredArticles = useMemo(() => {
    return selectedCategory === 'all' 
      ? articles 
      : articles.filter(article => article.category === selectedCategory);
  }, [selectedCategory, articles]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    trackEvent('news_category_changed', { category });
  }, []);

  const handleArticleClick = useCallback((article) => {
    setSelectedArticle(article);
    trackEvent('news_article_opened', { 
      articleId: article.id, 
      title: article.title,
      category: article.category 
    });
  }, []);

  const closeArticle = useCallback(() => {
    setSelectedArticle(null);
  }, []);

  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    if (newsletterEmail) {
      trackEvent('newsletter_subscribe_clicked', { email: newsletterEmail });
      alert('感谢您的订阅！我们会将最新资讯发送到您的邮箱。');
      setNewsletterEmail('');
    }
  }, [newsletterEmail]);

  const handleNewsletterEmailChange = useCallback((e) => {
    setNewsletterEmail(e.target.value);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-green font-medium">正在加载文章...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-accent-green transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 - 修复颜色主题 */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* 背景装饰 - 使用项目主题色 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-brand-green/5 to-light-green/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-sage-green/5 to-accent-green/6 rounded-full blur-3xl"></div>
          
          {/* 次要装饰元素 */}
          <div className="absolute top-16 right-16 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-16 right-1/4 w-40 h-40 bg-sage-green/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-16 w-24 h-24 bg-light-green/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-accent-green/5 rounded-full blur-lg"></div>
          <div className="absolute top-2/3 right-12 w-16 h-16 bg-sage-green/8 rounded-full blur-lg"></div>
          
          {/* 微妙的网格背景 */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(26, 77, 50, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(26, 77, 50, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-green via-accent-green to-light-green bg-clip-text text-transparent">
                {newsData.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              {newsData.subtitle}
            </p>
            <div className="mt-6 text-sm text-gray-500">
              找到 {articles.length} 篇文章
            </div>
          </div>
        </div>
      </section>

      {/* 文章分类筛选 - 修复样式 */}
      <section className="relative py-8 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {newsData.categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onCategoryChange={handleCategoryChange}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 行业趋势概览 - 修复颜色 */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              {newsData.industryTrends.title}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {newsData.industryTrends.description}
            </p>
          </div>
          
          {/* 趋势卡片 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {newsData.industryTrends.trends.map((trend, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-brand hover:shadow-brand-medium transition-all duration-300">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-brand-green mb-2">{trend.title}</h4>
                  <div className={`text-3xl font-bold ${
                    index === 0 ? 'text-light-green' : 
                    index === 1 ? 'text-sage-green' : 
                    'text-accent-green'
                  } mb-2`}>
                    {trend.value}
                  </div>
                  <div className="text-sm text-gray-500">{trend.desc}</div>
                  <div className="mt-3 px-3 py-1 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-full text-xs font-medium">
                    {trend.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* 文章网格 */}
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  isVisible={isVisible}
                  onArticleClick={handleArticleClick}
                />
              ))}
            </div>
          ) : (
            // 空状态
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
                📰
              </div>
              <h3 className="text-2xl font-bold text-gray-500 mb-4">{newsData.noArticles}</h3>
              <p className="text-gray-400">{newsData.selectOtherCategory}</p>
            </div>
          )}
        </div>
      </section>

      {/* 订阅资讯 - 修复颜色 */}
      <section className="py-16 bg-gradient-brand">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            {newsData.newsletter.title}
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {newsData.newsletter.description}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={handleNewsletterEmailChange}
              placeholder={newsData.newsletter.placeholder}
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 border border-gray-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-brand-green rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {newsData.newsletter.subscribe}
            </button>
          </form>
        </div>
      </section>

      {/* 文章详情模态框 */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={closeArticle}
        />
      )}
    </div>
  );
};

export default News;