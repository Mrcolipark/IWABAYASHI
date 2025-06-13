import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { useNewsArticles } from '../hooks/useNewsArticles';

export default function NewsArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { articles, loading, error } = useNewsArticles();
  const [article, setArticle] = useState(null);
  
  // 找到对应的文章
  useEffect(() => {
    if (!loading && articles.length > 0) {
      const foundArticle = articles.find(a => a.slug === slug);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        // 文章不存在，跳转到新闻列表页
        navigate('/news', { replace: true });
      }
    }
  }, [slug, articles, loading, navigate]);

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '';
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

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">文章不存在或已被移除</p>
        <Link to="/news" className="mt-4 inline-block text-brand-green hover:underline">
          返回新闻列表
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 面包屑导航 */}
      <div className="mb-6">
        <nav className="flex text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-green">首页</Link>
          <span className="mx-2">/</span>
          <Link to="/news" className="hover:text-brand-green">新闻动态</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{article.title}</span>
        </nav>
      </div>

      {/* 文章头部 */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className="px-3 py-1 bg-green-50 text-brand-green text-sm rounded-full">
            {article.category}
          </span>
          <time className="text-gray-500">
            {formatDate(article.date)}
          </time>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed">
          {article.summary}
        </p>
      </header>

      {/* 特色图片 */}
      {article.featuredImage && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img 
            src={article.featuredImage} 
            alt={article.title} 
            className="w-full h-auto"
          />
        </div>
      )}

      {/* 文章内容 */}
      <div 
        className="prose prose-lg max-w-none prose-green"
        dangerouslySetInnerHTML={{ __html: marked(article.content) }}
      />

      {/* 文章底部 */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            {article.author ? `作者: ${article.author}` : ''}
            {article.keywords && (
              <div className="mt-2">
                标签: {article.keywords.split(',').map(k => k.trim()).join(', ')}
              </div>
            )}
          </div>
          
          <Link 
            to="/news" 
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            返回文章列表
          </Link>
        </div>
      </footer>
    </div>
  );
}