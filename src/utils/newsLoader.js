// src/utils/newsLoader.js
import matter from 'gray-matter';

// 加载新闻文章的工具函数
export async function loadNewsArticles() {
  try {
    // 这里需要根据你的构建设置来调整
    // 如果使用 Webpack 5，可以这样动态导入
    const articlesContext = require.context(
      '../content/news',
      false,
      /\.md$/
    );
    
    const articles = [];
    
    for (const filename of articlesContext.keys()) {
      try {
        const fileContent = await import(`../content/news/${filename.replace('./', '')}`);
        const { data, content } = matter(fileContent.default);
        
        // 只加载已发布的文章
        if (data.status === '已发布') {
          articles.push({
            id: filename.replace('./', '').replace('.md', ''),
            ...data,
            content: content,
            slug: filename.replace('./', '').replace('.md', '')
          });
        }
      } catch (error) {
        console.warn('Failed to load article:', filename, error);
      }
    }
    
    // 按日期排序，最新的在前
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
  } catch (error) {
    console.error('Failed to load news articles:', error);
    return getStaticArticles(); // 回退到静态文章
  }
}

// 静态文章作为后备
function getStaticArticles() {
  return [
    {
      id: 1,
      title: '岩林株式会社正式成立',
      date: '2025-01-15',
      category: '公司动态',
      summary: '岩林株式会社正式成立，致力于打造中日贸易新桥梁',
      content: '2025年1月，岩林株式会社正式成立...',
      status: '已发布'
    },
    {
      id: 2,
      title: '日本保健品市场分析报告',
      date: '2025-01-10',
      category: '市场分析', 
      summary: '深度解析日本保健品市场现状与发展趋势',
      content: '日本保健品市场以其严格的质量标准...',
      status: '已发布'
    }
  ];
}