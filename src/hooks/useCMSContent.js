// src/hooks/useCMSContent.js
import { useState, useEffect } from 'react';

/**
 * 通用CMS内容加载Hook
 * @param {string} contentPath - 内容文件路径
 * @param {object} defaultContent - 默认内容
 * @returns {object} { content, loading, error }
 */
export const useCMSContent = (contentPath, defaultContent = {}) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // 尝试从API端点加载内容
        const ts = Date.now();
        const response = await fetch(`/api/${contentPath}.json?ts=${ts}`);
        
        if (response.ok) {
          const data = await response.json();
          setContent({ ...defaultContent, ...data });
        } else {
          // 如果API失败，使用默认内容
          console.warn(`Failed to load CMS content from ${contentPath}, using defaults`);
          setContent(defaultContent);
        }
      } catch (err) {
        console.error('Error loading CMS content:', err);
        setError(err.message);
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentPath]);

  return { content, loading, error };
};

/**
 * 公司信息加载Hook
 */
export const useCompanyInfo = () => {
  const defaultCompanyInfo = {
    company_name: "岩林株式会社",
    english_name: "IWABAYASHI Corporation",
    established_year: "2025",
    headquarters: "日本东京",
    main_business: "中日双边贸易综合服务",
    vision: "搭建中日优质商品流通桥梁，促进两国经贸繁荣，成为具有国际影响力的贸易服务商",
    mission: "精选全球好产品，服务中国与日本市场，创造更高品质的生活价值",
    values: ["专业", "高效", "共赢", "诚信"],
    employee_count: "20-50人",
    registered_capital: "1000万日元"
  };

  return useCMSContent('company/basic-info', defaultCompanyInfo);
};

/**
 * 团队成员加载Hook
 */
export const useTeamMembers = () => {
  const defaultTeamMembers = {
    members: [
      {
        name: "赵子淇",
        position: "CEO",
        bio: "拥有丰富的国际贸易经验和卓越的领导能力",
        email: "ceo@iwabayashi.com",
        order: 1
      },
      {
        name: "田中太郎", 
        position: "运营总监",
        bio: "专注于供应链管理和业务运营优化",
        email: "operations@iwabayashi.com",
        order: 2
      }
    ]
  };

  return useCMSContent('company/team-members', defaultTeamMembers);
};

/**
 * 服务内容加载Hook
 */
export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        
        // 加载服务列表
        const serviceFiles = [
          'health-products-import',
          'export-business'
        ];

        const servicePromises = serviceFiles.map(async (serviceId) => {
          try {
            const response = await fetch(`/api/services/${serviceId}.json`);
            if (response.ok) {
              return await response.json();
            }
            return null;
          } catch (err) {
            console.warn(`Failed to load service: ${serviceId}`);
            return null;
          }
        });

        const loadedServices = await Promise.all(servicePromises);
        const validServices = loadedServices.filter(service => service !== null);

        if (validServices.length > 0) {
          setServices(validServices);
        } else {
          // 使用默认服务数据
          setServices(getDefaultServices());
        }
      } catch (err) {
        console.error('Error loading services:', err);
        setError(err.message);
        setServices(getDefaultServices());
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, loading, error };
};

/**
 * 联系信息加载Hook  
 */
export const useContactInfo = () => {
  const defaultContactInfo = {
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
    ]
  };

  return useCMSContent('contact/info', defaultContactInfo);
};

/**
 * 首页内容加载Hook
 */
export const useHomeContent = () => {
  const defaultHomeContent = {
    hero: {
      slogan: "上質な製品でユーザーとつながる",
      subtitle: "搭建中日优质商品流通桥梁，促进两国经贸繁荣",
      description: "岩林株式会社致力于成为具有国际影响力的贸易服务商",
      features: [
        "日本保健品进口代理",
        "中国大宗商品出口", 
        "供应链管理",
        "专业服务"
      ]
    }
  };

  return useCMSContent('pages/home-content', defaultHomeContent);
};

/**
 * 页脚内容加载Hook
 */
export const useFooterContent = () => {
  const defaultFooterContent = {
    description: "岩林株式会社致力于成为中日贸易领域最受信赖的合作伙伴，为客户提供专业、高效的贸易解决方案。",
    business_items: [
      "日本保健品进口代理",
      "中国大宗商品出口",
      "市场咨询服务", 
      "供应链管理"
    ],
    quick_links: [
      { name: "关于我们", url: "/about", external: false },
      { name: "服务内容", url: "/services", external: false },
      { name: "新闻动态", url: "/news", external: false },
      { name: "联系我们", url: "/contact", external: false }
    ],
    social_media: [
      { platform: "邮箱", url: "mailto:info@iwabayashi.com", icon: "📧" },
      { platform: "电话", url: "tel:+81-3-1234-5678", icon: "📞" },
      { platform: "微信", url: "#wechat", icon: "💬" }
    ],
    copyright: "© 2025 岩林株式会社 (IWABAYASHI Corporation). All rights reserved.",
    filing_info: "专业的中日贸易综合服务商"
  };

  return useCMSContent('pages/footer-content', defaultFooterContent);
};

// 默认服务数据
function getDefaultServices() {
  return [
    {
      id: "health-products-import",
      title: "日本保健品进口代理",
      type: "进行中",
      icon: "🏥",
      description: "依托日本先进的生产工艺与严格的品质标准，精心甄选优质保健品，为中国消费者引入安全、健康、可信赖的产品。",
      features: [
        "严格的品质甄选标准",
        "完善的进口代理服务", 
        "专业的市场咨询支持",
        "高效的供应链管理"
      ],
      advantages: [
        "日本先进生产工艺",
        "严格品质控制体系",
        "安全可信赖产品",
        "满足健康消费需求"
      ],
      process: [
        { step: 1, title: "产品甄选", description: "严格筛选优质产品" },
        { step: 2, title: "质量检测", description: "全面质量控制检测" },
        { step: 3, title: "进口代理", description: "专业进口手续办理" },
        { step: 4, title: "市场推广", description: "协助产品市场推广" }
      ],
      order: 1,
      enabled: true
    },
    {
      id: "export-business",
      title: "中国大宗商品出口拓展", 
      type: "规划中",
      icon: "🚢",
      description: "依托中国丰富的产业基础和优质的商品资源，积极布局大宗商品出口业务，助力更多优质中国产品进入日本市场。",
      features: [
        "丰富的产业基础资源",
        "优质的商品资源整合",
        "专业的市场开拓能力", 
        "完善的出口服务体系"
      ],
      advantages: [
        "中国制造优势",
        "日本市场准入经验",
        "双向贸易服务能力",
        "促进两国经贸合作"
      ],
      process: [
        { step: 1, title: "市场调研", description: "深入了解目标市场" },
        { step: 2, title: "渠道建立", description: "构建稳定销售渠道" },
        { step: 3, title: "业务扩展", description: "全面开展出口业务" },
        { step: 4, title: "规模化运营", description: "实现规模化稳定运营" }
      ],
      order: 2,
      enabled: true
    }
  ];
}