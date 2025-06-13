// scripts/generate-news-index.js
// 这个脚本在构建时运行，将markdown文件转换为JSON索引

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '../content/news');
const OUTPUT_FILE = path.join(__dirname, '../public/api/news-index.json');

function generateNewsIndex() {
  console.log('🔄 正在生成新闻文章索引...');
  
  try {
    // 确保输出目录存在
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 读取content/news目录
    if (!fs.existsSync(CONTENT_DIR)) {
      console.log('⚠️  content/news 目录不存在，创建默认索引文件');
      createDefaultIndex();
      return;
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`📁 找到 ${markdownFiles.length} 个markdown文件`);

    const articles = [];

    markdownFiles.forEach((filename) => {
      try {
        const filePath = path.join(CONTENT_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);
        
        // 只包含已发布的文章
        if (frontmatter.status === '已发布' || frontmatter.status === 'published') {
          const article = {
            id: frontmatter.id || filename.replace('.md', ''),
            title: frontmatter.title || 'Untitled',
            date: frontmatter.date || new Date().toISOString(),
            category: frontmatter.category || '未分类',
            summary: frontmatter.summary || content.substring(0, 200) + '...',
            content: content,
            featuredImage: frontmatter.featuredImage || null,
            status: frontmatter.status || '已发布',
            author: frontmatter.author || '岩林株式会社',
            keywords: frontmatter.keywords || '',
            slug: frontmatter.slug || filename.replace('.md', '')
          };
          
          articles.push(article);
          console.log(`✅ 处理文章: ${article.title}`);
        } else {
          console.log(`⏭️  跳过草稿: ${frontmatter.title || filename}`);
        }
      } catch (error) {
        console.error(`❌ 处理文件 ${filename} 时出错:`, error.message);
      }
    });

    // 按日期排序，最新的在前
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 写入JSON文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2));
    
    console.log(`✅ 成功生成文章索引: ${articles.length} 篇文章`);
    console.log(`📄 索引文件位置: ${OUTPUT_FILE}`);
    
    // 输出文章列表
    articles.forEach((article, index) => {
      console.log(`   ${index + 1}. ${article.title} (${article.category})`);
    });

  } catch (error) {
    console.error('❌ 生成文章索引时出错:', error);
    createDefaultIndex();
  }
}

function createDefaultIndex() {
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
      slug: "2025-06-12-赵子淇出任岩林集团ceo"
    },
    {
      id: "2025-01-15-company-establishment",
      title: "岩林株式会社正式成立",
      date: "2025-01-15",
      category: "公司动态",
      summary: "岩林株式会社正式成立，致力于打造中日贸易新桥梁，专注于日本保健品进口代理服务",
      content: "2025年1月15日，岩林株式会社正式成立。作为一家专注于中日双边贸易的综合性贸易公司，我们将秉持专业、高效、共赢的经营理念，积极拓展国际市场资源，搭建中日商品流通的桥梁。\n\n## 发展愿景\n\n公司成立之初，我们就明确了发展方向：以日本保健品进口代理为切入点，逐步拓展到大宗商品出口等领域。我们相信，通过专业的服务和不懈的努力，必将为中日两国的经贸合作贡献力量。\n\n## 核心业务\n\n### 当前重点业务\n- **日本保健品进口代理**: 严格甄选优质日本保健品，为中国消费者提供安全、健康、可信赖的产品\n\n### 未来规划\n- **中国大宗商品出口**: 计划在2025年下半年开始布局，助力中国优质商品进入日本市场\n\n## 团队特色\n\n作为一家年轻而充满活力的公司，我们拥有开放务实的团队，致力于为合作伙伴提供：\n- 专业的市场咨询\n- 灵活的供应链管理\n- 高效的进出口服务\n\n## 联系我们\n\n如果您对我们的服务感兴趣，欢迎随时联系我们：\n- 邮箱: info@iwabayashi.com\n- 电话: +81-3-1234-5678\n\n让我们携手共创中日贸易新未来！",
      status: "已发布",
      author: "岩林株式会社",
      keywords: "岩林株式会社,成立,中日贸易,保健品进口",
      slug: "2025-01-15-company-establishment"
    },
    {
      id: "2025-01-10-health-product-market-analysis",
      title: "日本保健品市场深度解析",
      date: "2025-01-10",
      category: "市场分析",
      summary: "探索日本保健品行业的发展现状与未来趋势，分析市场机遇与挑战",
      content: "日本保健品市场以其严格的质量标准和先进的生产工艺而闻名全球。根据最新市场数据显示，日本保健品市场规模持续增长，年增长率达到15.2%。\n\n## 市场特点\n\n### 消费者特征\n- **品质要求极高**: 日本消费者对产品质量和安全性要求严格\n- **功能性需求旺盛**: 偏好具有明确功效的保健品\n- **品牌忠诚度高**: 倾向于选择知名品牌和老字号\n\n### 市场趋势\n1. **老龄化社会推动**: 日本人口老龄化为保健品市场提供了强劲动力\n2. **健康意识提升**: 疫情后消费者更加注重健康管理\n3. **个性化需求**: 针对不同年龄层和健康需求的定制化产品增长\n\n## 主要产品类别\n\n### 营养补充剂\n- 维生素和矿物质补充剂\n- 蛋白质粉和氨基酸\n- 益生菌产品\n\n### 功能性食品\n- 抗氧化产品\n- 关节健康产品\n- 心血管健康产品\n\n### 美容保健品\n- 胶原蛋白产品\n- 抗衰老补充剂\n- 皮肤健康产品\n\n## 市场机遇\n\n对于有意进入日本保健品市场的企业来说，以下几个方面值得关注：\n\n1. **高端市场定位**: 日本消费者愿意为高品质产品支付溢价\n2. **创新产品需求**: 市场对具有创新功效的产品接受度高\n3. **电商渠道发展**: 在线销售渠道快速增长",
      status: "已发布",
      author: "市场分析部",
      keywords: "日本保健品,市场分析,健康产业,消费趋势",
      slug: "2025-01-10-health-product-market-analysis"
    }
  ];

  // 确保输出目录存在
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(defaultArticles, null, 2));
  console.log(`✅ 创建默认索引文件成功: ${defaultArticles.length} 篇文章`);
}

if (require.main === module) {
  generateNewsIndex();
}

module.exports = { generateNewsIndex };