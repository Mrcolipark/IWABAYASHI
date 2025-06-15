// scripts/generate-news-index.js
// 改进版：支持CMS文章并增强错误处理

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Languages that have dedicated translation folders
const LANGUAGES = ['en', 'ja'];

const CONTENT_DIR = path.join(__dirname, '../content/news');
const OUTPUT_FILE = path.join(__dirname, '../public/api/news-index.json');

function generateNewsIndexForDir(contentDir, outputFile) {
  console.log(`🔄 正在生成新闻文章索引: ${contentDir}`);
  
  try {
    // 确保输出目录存在
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 检查内容目录
    if (!fs.existsSync(contentDir)) {
      console.log(`⚠️  ${contentDir} 目录不存在，创建目录和默认索引文件`);
      fs.mkdirSync(contentDir, { recursive: true });
      createDefaultIndex(outputFile);
      return;
    }

    const files = fs.readdirSync(contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`📁 找到 ${markdownFiles.length} 个markdown文件`);

    const articles = [];
    let processedCount = 0;
    let errorCount = 0;

    markdownFiles.forEach((filename) => {
      try {
        const filePath = path.join(contentDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);
        
        // 检查文章状态，支持中英文状态
        const isPublished = frontmatter.status === '已发布' || 
                           frontmatter.status === 'published' || 
                           frontmatter.status === '發布' ||
                           (!frontmatter.status && content.trim().length > 0); // 没有状态但有内容的文章默认为发布
        
        if (isPublished) {
          // 生成文章ID（如果没有的话）
          const articleId = frontmatter.id || 
                           frontmatter.slug || 
                           filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
          
          // 生成文章slug
          const slug = frontmatter.slug || filename.replace('.md', '');
          
          // 处理日期
          let articleDate = frontmatter.date;
          if (articleDate) {
            // 确保日期是ISO格式
            if (typeof articleDate === 'string' && !articleDate.includes('T')) {
              articleDate = new Date(articleDate).toISOString();
            } else if (articleDate instanceof Date) {
              articleDate = articleDate.toISOString();
            }
          } else {
            // 如果没有日期，从文件名提取或使用当前时间
            const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) {
              articleDate = new Date(dateMatch[1]).toISOString();
            } else {
              articleDate = new Date().toISOString();
            }
          }
          
          // 生成摘要（如果没有的话）
          let summary = frontmatter.summary || frontmatter.description || frontmatter.excerpt;
          if (!summary && content) {
            // 从内容中提取前200字符作为摘要
            const plainText = content
              .replace(/#{1,6}\s/g, '') // 移除markdown标题
              .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
              .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
              .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接但保留文本
              .replace(/\n+/g, ' ') // 替换换行为空格
              .trim();
            
            summary = plainText.length > 200 
              ? plainText.substring(0, 197) + '...'
              : plainText;
          }
          
          const article = {
            id: articleId,
            title: frontmatter.title || '无标题文章',
            date: articleDate,
            category: frontmatter.category || '未分类',
            summary: summary || '暂无摘要',
            content: content || '',
            featuredImage: frontmatter.featuredImage || frontmatter.image || null,
            status: frontmatter.status || '已发布',
            author: frontmatter.author || '岩林株式会社',
            keywords: frontmatter.keywords || '',
            slug: slug,
            // 额外的CMS字段
            tags: frontmatter.tags || [],
            readingTime: estimateReadingTime(content),
            lastModified: frontmatter.lastModified || articleDate
          };
          
          articles.push(article);
          processedCount++;
          console.log(`✅ 处理文章: ${article.title} (${article.category})`);
        } else {
          console.log(`⏭️  跳过草稿: ${frontmatter.title || filename} (状态: ${frontmatter.status || '未设置'})`);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ 处理文件 ${filename} 时出错:`, error.message);
        console.error(`   文件路径: ${path.join(contentDir, filename)}`);
      }
    });

    // 按日期排序，最新的在前
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 写入JSON文件
    const indexData = {
      generated: new Date().toISOString(),
      totalArticles: articles.length,
      categories: getUniqueCategories(articles),
      articles: articles
    };

    // 美化JSON输出
    const jsonString = JSON.stringify(articles, null, 2);
    fs.writeFileSync(outputFile, jsonString, 'utf8');
    
    console.log(`✅ 成功生成文章索引: ${articles.length} 篇已发布文章`);
    console.log(`📄 索引文件位置: ${outputFile}`);
    console.log(`📊 处理统计: 成功 ${processedCount}, 错误 ${errorCount}, 草稿 ${markdownFiles.length - processedCount - errorCount}`);
    
    // 输出分类统计
    const categoryStats = getUniqueCategories(articles);
    console.log(`📂 文章分类: ${categoryStats.join(', ')}`);
    
    // 输出文章列表
    if (articles.length > 0) {
      console.log('\n📰 已发布文章列表:');
      articles.forEach((article, index) => {
        const date = new Date(article.date).toLocaleDateString('zh-CN');
        console.log(`   ${index + 1}. ${article.title} (${article.category}) - ${date}`);
      });
    }

    // 验证生成的JSON
    try {
      const testParse = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
      console.log(`\n✅ JSON文件验证通过，包含 ${testParse.length} 篇文章`);
    } catch (parseError) {
      console.error('❌ JSON文件验证失败:', parseError.message);
    }

  } catch (error) {
    console.error('❌ 生成文章索引时出错:', error);
    console.error('📍 错误堆栈:', error.stack);
    createDefaultIndex(outputFile);
  }
}

function generateNewsIndex() {
  // 默认中文索引
  generateNewsIndexForDir(CONTENT_DIR, OUTPUT_FILE);
  // 为语言切换生成 zh 索引文件
  const zhOut = path.join(__dirname, '../public/api/news-index.zh.json');
  generateNewsIndexForDir(CONTENT_DIR, zhOut);
  // 生成其它语言索引
  LANGUAGES.forEach((lang) => {
    const langDir = path.join(__dirname, `../content/${lang}/news`);
    const langOut = path.join(__dirname, `../public/api/news-index.${lang}.json`);
    generateNewsIndexForDir(langDir, langOut);
  });
}

// 估算阅读时间（基于中文阅读速度）
function estimateReadingTime(content) {
  if (!content) return '1分钟';
  
  const wordsPerMinute = 300; // 中文阅读速度约300字/分钟
  const wordCount = content.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes}分钟`;
}

// 获取所有唯一的分类
function getUniqueCategories(articles) {
  const categories = articles.map(article => article.category);
  return [...new Set(categories)].filter(Boolean);
}

function createDefaultIndex(outputFile) {
  console.log('🔧 创建默认文章索引...');
  
  const defaultArticles = [
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
      keywords: "CEO,赵子淇,岩林集团,任命",
      slug: "2025-06-12-赵子淇出任岩林集团ceo",
      tags: ["人事任命", "管理层", "发展战略"],
      readingTime: "2分钟",
      lastModified: "2025-06-12T10:31:33.590Z"
    },
    {
      id: "2025-01-15-company-establishment",
      title: "岩林株式会社正式成立",
      date: "2025-01-15T00:00:00.000Z",
      category: "公司动态",
      summary: "岩林株式会社正式成立，致力于打造中日贸易新桥梁，专注于日本保健品进口代理服务",
      content: "2025年1月15日，岩林株式会社正式成立。作为一家专注于中日双边贸易的综合性贸易公司，我们将秉持专业、高效、共赢的经营理念，积极拓展国际市场资源，搭建中日商品流通的桥梁。\n\n## 发展愿景\n\n公司成立之初，我们就明确了发展方向：以日本保健品进口代理为切入点，逐步拓展到大宗商品出口等领域。我们相信，通过专业的服务和不懈的努力，必将为中日两国的经贸合作贡献力量。\n\n## 核心业务\n\n### 当前重点业务\n- **日本保健品进口代理**: 严格甄选优质日本保健品，为中国消费者提供安全、健康、可信赖的产品\n\n### 未来规划\n- **中国大宗商品出口**: 计划在2025年下半年开始布局，助力中国优质商品进入日本市场\n\n## 团队特色\n\n作为一家年轻而充满活力的公司，我们拥有开放务实的团队，致力于为合作伙伴提供：\n- 专业的市场咨询\n- 灵活的供应链管理\n- 高效的进出口服务\n\n## 联系我们\n\n如果您对我们的服务感兴趣，欢迎随时联系我们：\n- 邮箱: info@iwabayashi.com\n- 电话: +81-3-1234-5678\n\n让我们携手共创中日贸易新未来！",
      status: "已发布",
      author: "岩林株式会社",
      keywords: "岩林株式会社,成立,中日贸易,保健品进口",
      slug: "2025-01-15-company-establishment",
      tags: ["公司成立", "中日贸易", "保健品"],
      readingTime: "3分钟",
      lastModified: "2025-01-15T00:00:00.000Z"
    },
    {
      id: "2025-01-10-health-product-market-analysis",
      title: "日本保健品市场深度解析",
      date: "2025-01-10T00:00:00.000Z",
      category: "市场分析",
      summary: "探索日本保健品行业的发展现状与未来趋势，分析市场机遇与挑战",
      content: "日本保健品市场以其严格的质量标准和先进的生产工艺而闻名全球。根据最新市场数据显示，日本保健品市场规模持续增长，年增长率达到15.2%。\n\n## 市场特点\n\n### 消费者特征\n- **品质要求极高**: 日本消费者对产品质量和安全性要求严格\n- **功能性需求旺盛**: 偏好具有明确功效的保健品\n- **品牌忠诚度高**: 倾向于选择知名品牌和老字号\n\n### 市场趋势\n1. **老龄化社会推动**: 日本人口老龄化为保健品市场提供了强劲动力\n2. **健康意识提升**: 疫情后消费者更加注重健康管理\n3. **个性化需求**: 针对不同年龄层和健康需求的定制化产品增长",
      status: "已发布",
      author: "市场分析部",
      keywords: "日本保健品,市场分析,健康产业,消费趋势",
      slug: "2025-01-10-health-product-market-analysis",
      tags: ["市场分析", "保健品", "日本市场"],
      readingTime: "4分钟",
      lastModified: "2025-01-10T00:00:00.000Z"
    }
  ];

  // 确保输出目录存在
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(defaultArticles, null, 2), 'utf8');
  console.log(`✅ 创建默认索引文件成功: ${defaultArticles.length} 篇文章`);
  console.log(`📄 文件位置: ${outputFile}`);
}

// 检查是否从命令行直接运行
if (require.main === module) {
  generateNewsIndex();
}

module.exports = { generateNewsIndex };