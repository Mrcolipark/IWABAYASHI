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
          <div className="relative h-48 overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.display = 'none';
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
              {article.author && (
                <>
                  <span>•</span>
                  <span>{article.author}</span>
                </>
              )}
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

  // 渲染文章内容（支持Markdown转换）
  const renderContent = useCallback((content) => {
    // 简单的Markdown渲染（标题和段落）
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // 处理标题
      if (paragraph.startsWith('## ')) {
        return (
          <h3 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h3>
        );
      }
      
      if (paragraph.startsWith('### ')) {
        return (
          <h4 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h4>
        );
      }
      
      // 处理列表项
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-lg text-gray-700 mb-2">
            {paragraph.replace('- ', '')}
          </li>
        );
      }
      
      // 处理粗体文本
      const boldText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return (
        <p key={index} className="text-lg text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldText }} />
      );
    }).filter(Boolean);
  }, []);

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
            {article.status && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs">
                {article.status}
              </span>
            )}
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
          <div className="relative h-64 overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover"
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
              {renderContent(article.content)}
            </div>
          </div>

          {/* 关键词标签 */}
          {article.keywords && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">关键词</h4>
              <div className="flex flex-wrap gap-2">
                {article.keywords.split(',').map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 文章底部 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-gray-500 text-sm">
                <div>发布时间：{formatDate(article.date)}</div>
                {article.author && <div className="mt-1">作者：{article.author}</div>}
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

const News = ({ dict }) => {
  const { t } = useOptimizedTranslation();
  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isVisible, setIsVisible] = useState(isMobileScreen);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  // 从CMS加载文章数据
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 从Netlify CMS生成的JSON文件加载文章
        const response = await fetch('/api/news-index.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const articlesData = await response.json();
        
        // 过滤已发布的文章并按日期排序
        const publishedArticles = articlesData
          .filter(article => article.status === '已发布' || article.status === 'published')
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setArticles(publishedArticles);
        console.log('Successfully loaded articles:', publishedArticles.length);
        
      } catch (error) {
        console.error('Failed to load articles:', error);
        setError('加载文章失败，请稍后重试');
        
        // 使用备用的静态文章数据
        setArticles([
          {
            id: 'fallback-1',
            title: '岩林株式会社正式成立',
            date: '2025-01-15',
            category: '公司动态',
            summary: '岩林株式会社正式成立，致力于打造中日贸易新桥梁',
            content: '2025年1月，岩林株式会社正式成立。作为一家专注于中日双边贸易的综合性贸易公司，我们将秉持专业、高效、共赢的经营理念。',
            status: '已发布',
            author: '岩林株式会社'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // 使用优化翻译缓存News页面的UI文本（保持不变）
  const newsData = useMemo(() => {
    const baseInfo = {
      title: t('news.title', { defaultValue: '新闻动态' }),
      subtitle: t('news.subtitle', { defaultValue: '最新动态与行业洞察' }),
      noArticles: t('news.noArticles', { defaultValue: '暂无相关文章' }),
      selectOtherCategory: t('news.selectOtherCategory', { defaultValue: '请选择其他分类查看更多内容' })
    };

    const categories = [
      { id: 'all', label: t('news.categories.0.label', { defaultValue: '全部' }), icon: '📰' },
      { id: '公司动态', label: t('news.categories.1.label', { defaultValue: '公司动态' }), icon: '🏢' },
      { id: '市场分析', label: t('news.categories.2.label', { defaultValue: '市场分析' }), icon: '📊' },
      { id: '行业洞察', label: t('news.categories.3.label', { defaultValue: '行业洞察' }), icon: '🔍' }
    ];

    const industryTrends = {
      title: t('news.industryTrends.title', { defaultValue: '行业趋势概览' }),
      description: t('news.industryTrends.description', { defaultValue: '把握中日贸易发展脉搏，洞察市场变化趋势' }),
      trends: [
        {
          title: t('news.industryTrends.trends.0.title', { defaultValue: '日本健康食品市场' }),
          trend: t('news.industryTrends.trends.0.trend', { defaultValue: '持续增长' }),
          value: t('news.industryTrends.trends.0.value', { defaultValue: '15.2%' }),
          desc: t('news.industryTrends.trends.0.desc', { defaultValue: '年增长率' })
        },
        {
          title: t('news.industryTrends.trends.1.title', { defaultValue: '中日贸易总额' }),
          trend: t('news.industryTrends.trends.1.trend', { defaultValue: '稳步上升' }),
          value: t('news.industryTrends.trends.1.value', { defaultValue: '¥3.2万亿' }),
          desc: t('news.industryTrends.trends.1.desc', { defaultValue: '2024年预计' })
        },
        {
          title: t('news.industryTrends.trends.2.title', { defaultValue: '跨境电商增长' }),
          trend: t('news.industryTrends.trends.2.trend', { defaultValue: '快速发展' }),
          value: t('news.industryTrends.trends.2.value', { defaultValue: '28.5%' }),
          desc: t('news.industryTrends.trends.2.desc', { defaultValue: '同比增长' })
        }
      ]
    };

    const newsletter = {
      title: t('news.newsletter.title', { defaultValue: '订阅我们的资讯' }),
      description: t('news.newsletter.description', { defaultValue: '第一时间获取中日贸易最新动态和市场洞察' }),
      placeholder: t('news.newsletter.placeholder', { defaultValue: '请输入您的邮箱地址' }),
      subscribe: t('news.newsletter.subscribe', { defaultValue: '订阅' })
    };

    return {
      ...baseInfo,
      categories,
      industryTrends,
      newsletter
    };
  }, [t]);

  // 可见性检测
  useEffect(() => {
    if (isMobileScreen) {
      setIsVisible(true);
      trackEvent('news_page_viewed');
      return;
    }

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
      // 这里可以添加实际的订阅逻辑
    }
  }, [newsletterEmail]);

  const handleNewsletterEmailChange = useCallback((e) => {
    setNewsletterEmail(e.target.value);
  }, []);

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
                {newsData.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {newsData.subtitle}
            </p>
            {/* 显示文章统计 */}
            <div className="mt-4 text-sm text-gray-500">
              {loading ? '正在加载文章...' : `共${articles.length}篇文章`}
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
          </div>
        </div>
      </section>

      {/* 文章分类筛选 */}
      <section className="relative py-8 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
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

      {/* 文章列表 */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* 加载状态 */}
          {loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">正在加载最新文章...</p>
            </div>
          )}

          {/* 文章网格 */}
          {!loading && filteredArticles.length > 0 ? (
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
          ) : !loading ? (
            // 空状态
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
                📰
              </div>
              <h3 className="text-2xl font-bold text-gray-500 mb-4">{newsData.noArticles}</h3>
              <p className="text-gray-400">{newsData.selectOtherCategory}</p>
              {error && (
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  重新加载
                </button>
              )}
            </div>
          ) : null}
        </div>
      </section>

      {/* 行业趋势概览 */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {newsData.industryTrends.title}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {newsData.industryTrends.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsData.industryTrends.trends.map((trend, index) => (
              <TrendCard key={index} trend={trend} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 订阅资讯 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
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
              className="px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
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