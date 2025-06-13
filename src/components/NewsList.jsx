import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNewsArticles } from '../hooks/useNewsArticles';

export default function NewsList({ limit = 0, showCategories = true }) {
  const { articles, loading, error } = useNewsArticles();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // 获取所有分类
  const categories = ['all', ...new Set(articles.map(article => article.category))];
  
  // 根据分类筛选文章
  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(article => article.category === activeCategory);
  
  // 如果设置了limit，则只显示指定数量的文章
  const displayArticles = limit > 0 ? filteredArticles.slice(0, limit) : filteredArticles;

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">加载文章中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">无法加载文章</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 分类筛选 */}
      {showCategories && categories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? 'bg-brand-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
      )}

      {/* 文章列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* 文章特色图片 */}
            {article.featuredImage && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.featuredImage} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            
            <div className="p-6">
              {/* 分类和日期 */}
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 bg-green-50 text-brand-green text-xs rounded-full">
                  {article.category}
                </span>
                <time className="text-gray-500 text-sm">{formatDate(article.date)}</time>
              </div>
              
              {/* 标题 */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {article.title}
              </h3>
              
              {/* 摘要 */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.summary}
              </p>
              
              {/* 阅读更多链接 */}
              <Link
                to={`/news/${article.slug}`}
                className="text-brand-green font-medium hover:text-accent-green inline-flex items-center"
              >
                阅读更多 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      {/* 显示更多按钮 */}
      {limit > 0 && filteredArticles.length > limit && (
        <div className="text-center mt-8">
          <Link
            to="/news"
            className="inline-block px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-accent-green transition-colors"
          >
            查看更多文章
          </Link>
        </div>
      )}
    </div>
  );
}