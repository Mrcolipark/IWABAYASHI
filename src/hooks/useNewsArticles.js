// src/hooks/useNewsArticles.js
import { useState, useEffect } from 'react';
import i18n from '../i18n';

export const useNewsArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 尝试从生成的JSON文件加载文章，优先使用当前语言
        const lang = i18n.language || 'zh';
        let response = await fetch(`/api/news-index.${lang}.json`);
        if (!response.ok) {
          response = await fetch('/api/news-index.json');
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const articlesData = await response.json();
        
        // 过滤已发布的文章并按日期排序
        const publishedArticles = articlesData
          .filter(article => 
            article.status === '已发布' || 
            article.status === 'published' ||
            article.status === '發布'
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setArticles(publishedArticles);
        console.log('Successfully loaded articles:', publishedArticles.length);
        
      } catch (error) {
        console.error('Failed to load articles:', error);
        setError('加载文章失败，请稍后重试');
        
        // 使用备用的静态文章数据
        const fallbackArticles = [
          {
            id: 'company-establishment',
            title: '岩林株式会社正式成立',
            date: '2025-01-15T00:00:00.000Z',
            category: '公司动态',
            summary: '岩林株式会社正式成立，致力于打造中日贸易新桥梁，专注于日本保健品进口代理服务',
            content: `2025年1月15日，岩林株式会社正式成立。作为一家专注于中日双边贸易的综合性贸易公司，我们将秉持专业、高效、共赢的经营理念，积极拓展国际市场资源，搭建中日商品流通的桥梁。

## 发展愿景

公司成立之初，我们就明确了发展方向：以日本保健品进口代理为切入点，逐步拓展到大宗商品出口等领域。我们相信，通过专业的服务和不懈的努力，必将为中日两国的经贸合作贡献力量。

## 核心业务

### 当前重点业务
- **日本保健品进口代理**: 严格甄选优质日本保健品，为中国消费者提供安全、健康、可信赖的产品

### 未来规划
- **中国大宗商品出口**: 计划在2025年下半年开始布局，助力中国优质商品进入日本市场

## 团队特色

作为一家年轻而充满活力的公司，我们拥有开放务实的团队，致力于为合作伙伴提供：
- 专业的市场咨询
- 灵活的供应链管理
- 高效的进出口服务

## 联系我们

如果您对我们的服务感兴趣，欢迎随时联系我们：
- 邮箱: info@iwabayashi.com
- 电话: +81-3-1234-5678

让我们携手共创中日贸易新未来！`,
            status: '已发布',
            author: '岩林株式会社',
            keywords: '岩林株式会社,成立,中日贸易,保健品进口',
            slug: 'company-establishment',
            tags: ['公司成立', '中日贸易', '保健品'],
            readingTime: '3分钟',
            lastModified: '2025-01-15T00:00:00.000Z'
          },
          {
            id: 'ceo-appointment',
            title: '赵子淇出任岩林集团CEO',
            date: '2025-06-12T10:31:33.590Z',
            category: '公司动态',
            summary: '赵子淇正式出任岩林集团CEO，将带领公司迈向新的发展阶段',
            content: `我们很高兴地宣布，赵子淇先生正式出任岩林集团CEO一职。赵先生拥有丰富的国际贸易经验和卓越的领导能力，将带领岩林株式会社迈向新的发展阶段。

## 发展重点

在担任CEO后，赵子淇先生将专注于以下几个关键领域：
- 深化中日贸易合作关系
- 拓展日本保健品进口业务
- 推进中国商品出口日本市场的战略规划
- 加强公司的数字化转型

## 展望未来

我们相信，在赵子淇先生的领导下，岩林株式会社将在中日贸易领域取得更大的成就，为两国经贸合作做出更大贡献。`,
            featuredImage: '/images/uploads/img_4232.jpg',
            status: '已发布',
            author: '岩林株式会社',
            keywords: 'CEO,赵子淇,岩林集团,任命',
            slug: 'ceo-appointment',
            tags: ['人事任命', '管理层', '发展战略'],
            readingTime: '2分钟',
            lastModified: '2025-06-12T10:31:33.590Z'
          },
          {
            id: 'health-product-market-analysis',
            title: '日本保健品市场深度解析',
            date: '2025-01-10T00:00:00.000Z',
            category: '市场分析',
            summary: '探索日本保健品行业的发展现状与未来趋势，分析市场机遇与挑战',
            content: `日本保健品市场以其严格的质量标准和先进的生产工艺而闻名全球。根据最新市场数据显示，日本保健品市场规模持续增长，年增长率达到15.2%。

## 市场特点

### 消费者特征
- **品质要求极高**: 日本消费者对产品质量和安全性要求严格
- **功能性需求旺盛**: 偏好具有明确功效的保健品
- **品牌忠诚度高**: 倾向于选择知名品牌和老字号

### 市场趋势
1. **老龄化社会推动**: 日本人口老龄化为保健品市场提供了强劲动力
2. **健康意识提升**: 疫情后消费者更加注重健康管理
3. **个性化需求**: 针对不同年龄层和健康需求的定制化产品增长

## 投资机会

对于希望进入中国市场的日本保健品品牌，现在是一个绝佳的时机。中国消费者对高品质健康产品的需求持续增长，为优质日本保健品提供了广阔的市场空间。`,
            status: '已发布',
            author: '市场分析部',
            keywords: '日本保健品,市场分析,健康产业,消费趋势',
            slug: 'health-product-market-analysis',
            tags: ['市场分析', '保健品', '日本市场'],
            readingTime: '4分钟',
            lastModified: '2025-01-10T00:00:00.000Z'
          }
        ];
        
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return { articles, loading, error };
};