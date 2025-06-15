// scripts/generate-cms-content.js
// 增强版内容生成脚本，支持多种CMS内容类型

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Supported language folders under content/ used for translations
const LANGUAGES = ['en', 'ja'];

// 输出目录
const OUTPUT_DIR = path.join(__dirname, '../public/api');
const CONTENT_DIR = path.join(__dirname, '../content');

// 确保输出目录存在
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ 创建目录: ${dir}`);
  }
}

// 读取和解析Markdown文件
function readMarkdownFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  文件不存在: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    return {
      ...frontmatter,
      content: content.trim()
    };
  } catch (error) {
    console.error(`❌ 读取文件失败: ${filePath}`, error.message);
    return null;
  }
}

// Generate translation JSON files if translation markdown exists
function generateTranslations(relativePath, outputDir, outputName) {
  LANGUAGES.forEach((lang) => {
    const langPath = path.join(CONTENT_DIR, lang, `${relativePath}.md`);
    const data = readMarkdownFile(langPath);
    if (data) {
      ensureDirectoryExists(outputDir);
      writeJsonFile(path.join(outputDir, `${outputName}.${lang}.json`), data);
    }
  });
}

// 写入JSON文件
function writeJsonFile(outputPath, data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(outputPath, jsonString, 'utf8');
    console.log(`✅ 生成文件: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ 写入文件失败: ${outputPath}`, error.message);
    return false;
  }
}

// 生成公司基本信息JSON
function generateCompanyInfo() {
  console.log('\n📋 生成公司基本信息...');
  
  const basicInfoPath = path.join(CONTENT_DIR, 'company/basic-info.md');
  const companyInfo = readMarkdownFile(basicInfoPath);
  
  const outputPath = path.join(OUTPUT_DIR, 'company');
  ensureDirectoryExists(outputPath);

  if (companyInfo) {
    writeJsonFile(path.join(outputPath, 'basic-info.json'), companyInfo);
  } else {
    // 创建默认公司信息
    const defaultInfo = {
      company_name: "岩林株式会社",
      english_name: "IWABAYASHI Corporation", 
      established_year: "2025",
      headquarters: "日本东京",
      main_business: "中日双边贸易综合服务",
      vision: "搭建中日优质商品流通桥梁，促进两国经贸繁荣，成为具有国际影响力的贸易服务商",
      mission: "精选全球好产品，服务中国与日本市场，创造更高品质的生活价值",
      values: ["专业", "高效", "共赢", "诚信"],
      employee_count: "20-50人",
      registered_capital: "1000万日元",
      content: "岩林株式会社成立于2025年，是一家专注于中日双边贸易的综合性贸易公司。"
    };
    writeJsonFile(path.join(outputPath, 'basic-info.json'), defaultInfo);
  }

  // generate translations
  generateTranslations('company/basic-info', outputPath, 'basic-info');
}

// 生成团队成员JSON
function generateTeamMembers() {
  console.log('\n👥 生成团队成员信息...');
  
  const teamMembersPath = path.join(CONTENT_DIR, 'company/team-members.md');
  const teamData = readMarkdownFile(teamMembersPath);
  
  const outputPath = path.join(OUTPUT_DIR, 'company');
  ensureDirectoryExists(outputPath);
  
  if (teamData && teamData.members) {
    writeJsonFile(path.join(outputPath, 'team-members.json'), teamData);
  } else {
    // 创建默认团队信息
    const defaultTeam = {
      members: [
        {
          name: "赵子淇",
          position: "CEO",
          bio: "拥有丰富的国际贸易经验和卓越的领导能力",
          email: "ceo@iwabayashi.com",
          order: 1,
        },
        {
          name: "Dana",
          position: "打工的",
          bio: "专注网站维护",
          email: "danaanwer@outlook.com",
          order: 2,
        },
      ],
      content: "我们的团队由经验丰富的专业人士组成。",
    };
    writeJsonFile(path.join(outputPath, 'team-members.json'), defaultTeam);
  }

  generateTranslations('company/team-members', outputPath, 'team-members');
}

// 生成服务内容JSON
function generateServices() {
  console.log('\n💼 生成服务内容...');
  
  const servicesDir = path.join(CONTENT_DIR, 'services');
  const outputPath = path.join(OUTPUT_DIR, 'services');
  ensureDirectoryExists(outputPath);
  
  // 服务文件列表
  const serviceFiles = [
    'health-products-import.md',
    'export-business.md'
  ];
  
  const allServices = [];
  
  serviceFiles.forEach(filename => {
    const servicePath = path.join(servicesDir, filename);
    const serviceData = readMarkdownFile(servicePath);

    if (serviceData) {
      const serviceId = filename.replace('.md', '');
      serviceData.id = serviceId;

      // 写入单独的服务文件
      writeJsonFile(path.join(outputPath, `${serviceId}.json`), serviceData);
      generateTranslations(`services/${serviceId}`, outputPath, serviceId);

      // 添加到总服务列表
      allServices.push(serviceData);
    }
  });
  
  // 如果没有服务文件，创建默认服务
  if (allServices.length === 0) {
    const defaultServices = [
      {
        id: "health-products-import",
        title: "日本保健品进口代理",
        type: "进行中",
        icon: "🏥",
        description: "依托日本先进的生产工艺与严格的品质标准，精心甄选优质保健品。",
        features: ["严格的品质甄选标准", "完善的进口代理服务"],
        advantages: ["日本先进生产工艺", "严格品质控制体系"],
        process: [
          { step: 1, title: "产品甄选", description: "严格筛选优质产品" },
          { step: 2, title: "质量检测", description: "全面质量控制检测" }
        ],
        order: 1,
        enabled: true,
        content: "专业的日本保健品进口代理服务。"
      },
      {
        id: "export-business", 
        title: "中国大宗商品出口拓展",
        type: "规划中",
        icon: "🚢",
        description: "依托中国丰富的产业基础，积极布局大宗商品出口业务。",
        features: ["丰富的产业基础资源", "优质的商品资源整合"],
        advantages: ["中国制造优势", "日本市场准入经验"],
        process: [
          { step: 1, title: "市场调研", description: "深入了解目标市场" },
          { step: 2, title: "渠道建立", description: "构建稳定销售渠道" }
        ],
        order: 2,
        enabled: true,
        content: "规划中的大宗商品出口业务。"
      }
    ];
    
    defaultServices.forEach(service => {
      writeJsonFile(path.join(outputPath, `${service.id}.json`), service);
      generateTranslations(`services/${service.id}`, outputPath, service.id);
      allServices.push(service);
    });
  }
  
  // 写入服务总览文件
  writeJsonFile(path.join(outputPath, 'index.json'), {
    services: allServices.sort((a, b) => (a.order || 0) - (b.order || 0)),
    total: allServices.length,
    generated: new Date().toISOString()
  });

  // Translation indexes
  LANGUAGES.forEach((lang) => {
    const langServices = [];
    serviceFiles.forEach((filename) => {
      const langData = readMarkdownFile(
        path.join(CONTENT_DIR, lang, 'services', filename)
      );
      if (langData) {
        langData.id = filename.replace('.md', '');
        langServices.push(langData);
      }
    });
    if (langServices.length) {
      writeJsonFile(path.join(outputPath, `index.${lang}.json`), {
        services: langServices.sort((a, b) => (a.order || 0) - (b.order || 0)),
        total: langServices.length,
        generated: new Date().toISOString(),
      });
    }
  });
}

// 生成联系信息JSON
function generateContactInfo() {
  console.log('\n📞 生成联系信息...');
  
  const contactInfoPath = path.join(CONTENT_DIR, 'contact/info.md');
  const contactData = readMarkdownFile(contactInfoPath);
  
  const outputPath = path.join(OUTPUT_DIR, 'contact');
  ensureDirectoryExists(outputPath);
  
  if (contactData) {
    writeJsonFile(path.join(outputPath, 'info.json'), contactData);
  } else {
    // 创建默认联系信息
    const defaultContact = {
      email: "info@iwabayashi.com",
      support_email: "support@iwabayashi.com",
      phone: "+81-3-1234-5678", 
      fax: "+81-3-1234-5679",
      address: "日本东京都港区赤坂1-2-3 岩林大厦10F",
      address_ja: "日本国東京都港区赤坂1-2-3 岩林ビル10F",
      business_hours: "周一至周五 9:00-18:00 (JST)",
      website: "https://iwabayashi.com",
      wechat: "iwabayashi_official",
      linkedin: "https://linkedin.com/company/iwabayashi",
      transportation: [
        "东京Metro银座线、丸之内线 赤坂见附站 步行5分钟",
        "东京Metro千代田线 赤坂站 步行3分钟",
        "JR中央线、总武线 四谷站 步行10分钟"
      ],
      content: "欢迎联系岩林株式会社。"
    };
    writeJsonFile(path.join(outputPath, 'info.json'), defaultContact);
  }

  generateTranslations('contact/info', outputPath, 'info');
}

// 生成页面内容JSON
function generatePageContent() {
  console.log('\n📄 生成页面内容...');
  
  const pagesDir = path.join(CONTENT_DIR, 'pages');
  const outputPath = path.join(OUTPUT_DIR, 'pages');
  ensureDirectoryExists(outputPath);
  
  // 首页内容
  const homeContentPath = path.join(pagesDir, 'home-content.md');
  const homeData = readMarkdownFile(homeContentPath);
  
  if (homeData) {
    writeJsonFile(path.join(outputPath, 'home-content.json'), homeData);
  } else {
    const defaultHome = {
      hero: {
        slogan: "上質な製品でユーザーとつながる",
        subtitle: "搭建中日优质商品流通桥梁，促进两国经贸繁荣",
        description: "岩林株式会社致力于成为具有国际影响力的贸易服务商",
        features: ["日本保健品进口代理", "中国大宗商品出口", "供应链管理", "专业服务"]
      },
      content: "首页内容配置。"
    };
    writeJsonFile(path.join(outputPath, 'home-content.json'), defaultHome);
  }
  generateTranslations('pages/home-content', outputPath, 'home-content');
  
  // 页脚内容
  const footerContentPath = path.join(pagesDir, 'footer-content.md');
  const footerData = readMarkdownFile(footerContentPath);
  
  if (footerData) {
    writeJsonFile(path.join(outputPath, 'footer-content.json'), footerData);
  } else {
    const defaultFooter = {
      description: "岩林株式会社致力于成为中日贸易领域最受信赖的合作伙伴。",
      business_items: ["日本保健品进口代理", "中国大宗商品出口", "市场咨询服务", "供应链管理"],
      quick_links: [
        { name: "关于我们", url: "/about", external: false },
        { name: "服务内容", url: "/services", external: false }
      ],
      social_media: [
        { platform: "邮箱", url: "mailto:info@iwabayashi.com", icon: "📧" }
      ],
      copyright: "© 2025 岩林株式会社 (IWABAYASHI Corporation). All rights reserved.",
      content: "页脚内容配置。"
    };
    writeJsonFile(path.join(outputPath, 'footer-content.json'), defaultFooter);
  }
  generateTranslations('pages/footer-content', outputPath, 'footer-content');
}

// 生成内容索引
function generateContentIndex() {
  console.log('\n📑 生成内容索引...');
  
  const contentIndex = {
    generated: new Date().toISOString(),
    version: "1.0.0",
    collections: {
      company: {
        basic_info: "/api/company/basic-info.json",
        team_members: "/api/company/team-members.json"
      },
      services: {
        index: "/api/services/index.json",
        health_products: "/api/services/health-products-import.json",
        export_business: "/api/services/export-business.json"
      },
      contact: {
        info: "/api/contact/info.json"
      },
      pages: {
        home_content: "/api/pages/home-content.json",
        footer_content: "/api/pages/footer-content.json"
      },
      news: {
        index: "/api/news-index.json"
      }
    },
    stats: {
      company_files: 2,
      service_files: 3,
      contact_files: 1,
      page_files: 2
    }
  };
  
  writeJsonFile(path.join(OUTPUT_DIR, 'cms-index.json'), contentIndex);
}

// 主函数
function main() {
  console.log('🚀 开始生成CMS内容API文件...\n');
  
  // 确保输出目录存在
  ensureDirectoryExists(OUTPUT_DIR);
  
  try {
    // 生成各类内容
    generateCompanyInfo();
    generateTeamMembers(); 
    generateServices();
    generateContactInfo();
    generatePageContent();
    generateContentIndex();
    
    console.log('\n✅ 所有CMS内容生成完成！');
    console.log(`📁 输出目录: ${OUTPUT_DIR}`);
    console.log('\n📋 生成的API端点:');
    console.log('   - /api/company/basic-info.json');
    console.log('   - /api/company/team-members.json'); 
    console.log('   - /api/services/index.json');
    console.log('   - /api/services/health-products-import.json');
    console.log('   - /api/services/export-business.json');
    console.log('   - /api/contact/info.json');
    console.log('   - /api/pages/home-content.json');
    console.log('   - /api/pages/footer-content.json');
    console.log('   - /api/cms-index.json');
    
  } catch (error) {
    console.error('\n❌ 生成过程中出现错误:', error);
    process.exit(1);
  }
}

// 执行脚本
if (require.main === module) {
  main();
}

module.exports = {
  generateCompanyInfo,
  generateTeamMembers,
  generateServices,
  generateContactInfo,
  generatePageContent,
  generateContentIndex
};