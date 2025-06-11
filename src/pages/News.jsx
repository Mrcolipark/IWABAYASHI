import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/Analytics';

const News = ({ dict }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const sectionRef = useRef(null);
  const newsData = dict.news;

  // 可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 追踪页面访问
    trackEvent('news_page_viewed');

    return () => observer.disconnect();
  }, []);

  // 文章分类 - 使用翻译
  const categories = t('news.categories', { returnObjects: true }) || [
    { id: 'all', label: '全部', icon: '📰' },
    { id: '公司动态', label: '公司动态', icon: '🏢' },
    { id: '市场分析', label: '市场分析', icon: '📊' },
    { id: '行业洞察', label: '行业洞察', icon: '🔍' }
  ];

  // 过滤文章
  const filteredArticles = selectedCategory === 'all' 
    ? newsData.articles 
    : newsData.articles.filter(article => article.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    trackEvent('news_category_changed', { category });
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    trackEvent('news_article_opened', { 
      articleId: article.id, 
      title: article.title,
      category: article.category 
    });
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 - 墨绿色主题 */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* 背景装饰 */}
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
          </div>
        </div>
      </section>

      {/* 文章分类筛选 - 墨绿色主题 */}
      <section className="relative py-8 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* 文章网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                className={`group cursor-pointer transform transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => handleArticleClick(article)}
              >
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  
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
                        <span>{t('buttons.readFullArticle', '阅读全文')}</span>
                      </div>
                      <div className="text-green-800 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 空状态 */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
                📰
              </div>
              <h3 className="text-2xl font-bold text-gray-500 mb-4">{t('news.noArticles', '暂无相关文章')}</h3>
              <p className="text-gray-400">{t('news.selectOtherCategory', '请选择其他分类查看更多内容')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 行业趋势概览 */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t('news.industryTrends.title', '行业趋势概览')}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('news.industryTrends.description', '把握中日贸易发展脉搏，洞察市场变化趋势')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(t('news.industryTrends.trends', { returnObjects: true }) || [
              {
                title: '日本健康食品市场',
                trend: '↗️ 持续增长',
                value: '15.2%',
                desc: '年增长率',
                color: 'from-gray-800 to-green-800'
              },
              {
                title: '中日贸易总额',
                trend: '📈 稳步上升',
                value: '¥3.2万亿',
                desc: '2024年预计',
                color: 'from-slate-700 to-gray-800'
              },
              {
                title: '跨境电商增长',
                trend: '🚀 快速发展',
                value: '28.5%',
                desc: '同比增长',
                color: 'from-green-800 to-slate-600'
              }
            ]).map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto`}>
                    📊
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                  <div className="text-3xl font-bold text-green-800 mb-2">{item.value}</div>
                  <div className="text-sm text-gray-500 mb-4">{item.desc}</div>
                  <div className="text-slate-600 text-sm font-medium">{item.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 订阅资讯 */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-green-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            {t('news.newsletter.title', '订阅我们的资讯')}
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('news.newsletter.description', '第一时间获取中日贸易最新动态和市场洞察')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('news.newsletter.placeholder', '请输入您的邮箱地址')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 border border-gray-300"
            />
            <button
              onClick={() => trackEvent('newsletter_subscribe_clicked')}
              className="px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {t('news.newsletter.subscribe', '订阅')}
            </button>
          </div>
        </div>
      </section>

      {/* 文章详情模态框 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
            
            {/* 模态框头部 */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium">
                  {selectedArticle.category}
                </span>
                <time className="text-gray-500 text-sm">
                  {formatDate(selectedArticle.date)}
                </time>
              </div>
              <button
                onClick={closeArticle}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedArticle.title}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{selectedArticle.summary}</p>
              
              {/* 文章正文 */}
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed space-y-6">
                  {selectedArticle.content.split('\n').map((paragraph, index) => (
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
                    {t('time.publishTime', '发布时间')}：{formatDate(selectedArticle.date)}
                  </div>
                  <Link
                    to="/contact"
                    onClick={() => {
                      trackEvent('article_to_contact_clicked', { articleId: selectedArticle.id });
                      closeArticle();
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-green-800 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
                  >
                    {t('buttons.learnMore', '了解更多详情')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;