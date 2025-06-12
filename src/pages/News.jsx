import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOptimizedTranslation } from '../hooks/useOptimizedTranslation';
import { trackEvent } from '../utils/Analytics';

// 缓存的分类按钮组件
const CategoryButton = React.memo(({ category, isActive, onCategoryChange }) => {
  const handleClick = useCallback(() => {
    onCategoryChange(category.id);
  }, [onCategoryChange, category.id]);

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? 'bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm'
      }`}
    >
      <span className="text-lg">{category.icon}</span>
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

  // 格式化日期
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
          <div className="aspect-video overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* 文章头部 */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-green-50 text-green-800 border border-green-200 rounded-full text-xs font-medium">
              {article.category}
            </span>
            <time className="text-gray-500 text-sm">
              {formatDate(article.date)}
            </time>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-800 transition-colors duration-300 line-clamp-2">
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
            <div className="text-green-800 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
              →
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';

// 缓存的趋势卡片组件
const TrendCard = React.memo(({ trend, index }) => {
  const colorClasses = [
    'from-gray-800 to-green-800',
    'from-slate-700 to-gray-800',
    'from-green-800 to-slate-600'
  ];

  return (
    <div className="text-center">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
        <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[index]} rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto`}>
          📊
        </div>
        <h4 className="text-xl font-bold text-gray-800 mb-2">{trend.title}</h4>
        <div className="text-3xl font-bold text-green-800 mb-2">{trend.value}</div>
        <div className="text-sm text-gray-500 mb-4">{trend.desc}</div>
        <div className="text-slate-600 text-sm font-medium">{trend.trend}</div>
      </div>
    </div>
  );
});

TrendCard.displayName = 'TrendCard';

// 缓存的文章详情模态框组件
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
        
        {/* 模态框头部 */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium">
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

        {/* 特色图片 */}
        {article.featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* 模态框内容 */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{article.title}</h2>
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
                className="px-6 py-3 bg-gradient-to-r from-gray-800 to-green-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
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

// 加载新闻文章的函数
async function loadNewsArticles() {
  try {
    // 从API端点加载文章索引
    const response = await fetch('/api/news-index.json');
    if (!response.ok) {
      throw new Error('Failed to fetch news index');
    }
    
    const articles = await response.json();
    
    // 只返回已发布的文章，并按日期排序
    return articles
      .filter(article => article.status === '已发布')
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
  } catch (error) {
    console.error('Failed to load news articles:', error);
    
    // 返回静态文章作为后备
    return [
      {
        id: 1,
        title: '岩林株式会社正式成立',
        date: '2025-01-15',
        category: '公司动态',
        summary: '岩林株式会社正式成立，致力于打造中日贸易新桥梁',
        content: '2025年1月，岩林株式会社正式成立。作为一家专注于中日双边贸易的综合性贸易公司，我们将秉持专业、高效、共赢的经营理念，积极拓展国际市场资源，搭建中日商品流通的桥梁。\n\n公司成立之初，我们就明确了发展方向：以日本保健品进口代理为切入点，逐步拓展到大宗商品出口等领域。我们相信，通过专业的服务和不懈的努力，必将为中日两国的经贸合作贡献力量。',
        status: '已发布'
      },
      {
        id: 2,
        title: '日本保健品市场分析报告',
        date: '2025-01-10',
        category: '市场分析',
        summary: '深度解析日本保健品市场现状与发展趋势',
        content: '日本保健品市场以其严格的质量标准和先进的生产工艺而闻名全球。根据最新市场数据显示，日本保健品市场规模持续增长，年增长率达到15.2%。\n\n市场特点包括：消费者对品质要求极高、功能性产品需求旺盛、老龄化社会推动市场发展等。这为中国市场引入优质日本保健品提供了良好机遇。',
        status: '已发布'
      }
    ];
  }
}

const News = ({ dict }) => {
  const { t } = useOptimizedTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  // 分类数据
  const categories = useMemo(() => [
    { id: 'all', label: '全部', icon: '📰' },
    { id: '公司动态', label: '公司动态', icon: '🏢' },
    { id: '市场分析', label: '市场分析', icon: '📊' },
    { id: '行业洞察', label: '行业洞察', icon: '🔍' }
  ], []);

  // 行业趋势数据
  const industryTrends = useMemo(() => ({
    title: '行业趋势概览',
    description: '把握中日贸易发展脉搏，洞察市场变化趋势',
    trends: [
      {
        title: '日本健康食品市场',
        trend: '持续增长',
        value: '15.2%',
        desc: '年增长率'
      },
      {
        title: '中日贸易总额',
        trend: '稳步上升',
        value: '¥3.2万亿',
        desc: '2024年预计'
      },
      {
        title: '跨境电商增长',
        trend: '快速发展',
        value: '28.5%',
        desc: '同比增长'
      }
    ]
  }), []);

  // 加载文章数据
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const loadedArticles = await loadNewsArticles();
        setArticles(loadedArticles);
        console.log('Loaded articles:', loadedArticles);
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
      setNewsletterEmail('');
      alert('订阅成功！感谢您的关注。');
    }
  }, [newsletterEmail]);

  const handleNewsletterEmailChange = useCallback((e) => {
    setNewsletterEmail(e.target.value);
  }, []);

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-green-800 font-medium">加载新闻中...</p>
            <p className="text-gray-500 text-sm mt-2">正在获取最新动态</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-800/5 to-green-800/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-slate-600/5 to-gray-700/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 via-slate-700 to-green-800 bg-clip-text text-transparent">
                新闻动态
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              最新动态与行业洞察
            </p>
          </div>
        </div>
      </section>

      {/* 文章分类筛选 */}
      <section className="relative py-8 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
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

      {/* 文章列表 */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* 显示文章总数 */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              共找到 <span className="font-semibold text-green-800">{filteredArticles.length}</span> 篇文章
              {selectedCategory !== 'all' && (
                <span className="ml-2 text-sm text-gray-500">
                  (分类: {categories.find(c => c.id === selectedCategory)?.label})
                </span>
              )}
            </p>
          </div>

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
              <h3 className="text-2xl font-bold text-gray-500 mb-4">暂无相关文章</h3>
              <p className="text-gray-400 mb-6">
                {selectedCategory === 'all' 
                  ? '暂时没有发布任何文章' 
                  : `暂时没有"${categories.find(c => c.id === selectedCategory)?.label}"分类的文章`
                }
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  查看所有文章
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 行业趋势概览 */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {industryTrends.title}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {industryTrends.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industryTrends.trends.map((trend, index) => (
              <TrendCard key={index} trend={trend} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 订阅资讯 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            订阅我们的资讯
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            第一时间获取中日贸易最新动态和市场洞察
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={handleNewsletterEmailChange}
              placeholder="请输入您的邮箱地址"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 border border-gray-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              订阅
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