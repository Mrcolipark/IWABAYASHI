import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

// 默认字典数据
const defaultDict = {
  meta: {
    title: '岩林株式会社 - 专业的中日贸易综合服务商',
    description: '岩林株式会社成立于2025年，致力于中日双边贸易的综合性贸易公司。',
    keywords: '日本贸易,保健品进口,大宗商品出口,中日贸易,岩林株式会社'
  },
  menu: ["首页", "关于我们", "服务内容", "新闻动态", "联系我们"],
  home: {
    slogan: '上質な製品でユーザーとつながる',
    subtitle: '搭建中日优质商品流通桥梁，促进两国经贸繁荣',
    description: '岩林株式会社致力于成为具有国际影响力的贸易服务商'
  },
  about: {
    title: '关于我们',
    subtitle: '年轻而充满活力的中日贸易桥梁',
    companyInfo: {
      name: '岩林株式会社',
      englishName: 'IWABAYASHI Corporation',
      established: '2025年',
      headquarters: '日本',
      business: '中日双边贸易综合服务'
    },
    description: '岩林株式会社成立于2025年，总部位于日本。作为一家致力于中日双边贸易的综合性贸易公司，我们秉持专业、高效、共赢的经营理念，积极拓展国际市场资源，搭建中日商品流通的桥梁。',
    philosophy: {
      title: '经营理念',
      values: ['专业', '高效', '共赢']
    },
    vision: {
      title: '公司愿景',
      content: '搭建中日优质商品流通桥梁，促进两国经贸繁荣，成为具有国际影响力的贸易服务商。'
    },
    mission: {
      title: '公司使命',
      content: '精选全球好产品，服务中国与日本市场，创造更高品质的生活价值。'
    },
    team: {
      title: '团队特色',
      content: '作为一家年轻而充满活力的公司，我们拥有开放务实的团队，致力于为合作伙伴提供专业的市场咨询、灵活的供应链管理与高效的进出口服务。'
    }
  },
  services: {
    title: '服务内容',
    subtitle: '专业的贸易服务，连接中日优质商品'
  },
  news: {
    title: '新闻动态',
    subtitle: '最新动态与行业洞察',
    articles: [
      {
        id: 1,
        title: '岩林株式会社正式成立',
        date: "2025-01-15",
        category: '公司动态',
        summary: '岩林株式会社正式成立，致力于打造中日贸易新桥梁',
        content: '2025年1月，岩林株式会社正式成立。作为一家专注于中日双边贸易的综合性贸易公司，我们将秉持专业、高效、共赢的经营理念。'
      }
    ]
  },
  contact: {
    title: '联系我们',
    subtitle: '期待与您建立合作关系',
    info: {
      company: '岩林株式会社',
      email: 'info@iwabayashi.com',
      phone: '+81-3-1234-5678',
      address: '日本东京都港区赤坂1-2-3 岩林大厦10F',
      businessHours: '周一至周五 9:00-18:00 (JST)'
    },
    form: {
      name: '姓名',
      email: '邮箱',
      company: '公司名称',
      phone: '联系电话',
      subject: '咨询主题',
      message: '留言内容',
      submit: '发送消息',
      success: '消息发送成功！我们会尽快回复您。',
      error: '发送失败，请稍后重试。'
    }
  },
  footer: {
    description: '岩林株式会社致力于成为中日贸易领域最受信赖的合作伙伴，为客户提供专业、高效的贸易解决方案。',
    quickLinks: '快速链接',
    contact: '联系方式',
    business: '业务内容',
    links: {
      privacy: '隐私政策',
      terms: '使用条款',
      sitemap: '网站地图'
    }
  }
};

export const useDict = () => {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [dict, setDict] = useState(defaultDict);

  useEffect(() => {
    // 等待i18n初始化完成
    if (i18n.isInitialized) {
      setIsReady(true);
      console.log('i18n is ready, current language:', i18n.language);
    } else {
      const handleInitialized = () => {
        setIsReady(true);
        console.log('i18n initialized, current language:', i18n.language);
      };
      
      i18n.on('initialized', handleInitialized);
      return () => i18n.off('initialized', handleInitialized);
    }
  }, [i18n]);

  // 安全的翻译函数
  const safeT = (key, defaultValue = '') => {
    if (!isReady) {
      return defaultValue;
    }
    
    try {
      const translation = t(key);
      // 如果翻译结果是 key 本身（没有翻译），则返回默认值
      return translation === key ? defaultValue : translation;
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return defaultValue;
    }
  };

  // 生成动态字典
  useEffect(() => {
    if (!isReady) return;

    try {
      const dynamicDict = {
        // SEO元数据
        meta: {
          title: safeT('meta.title', defaultDict.meta.title),
          description: safeT('meta.description', defaultDict.meta.description),
          keywords: safeT('meta.keywords', defaultDict.meta.keywords)
        },

        // 导航菜单
        menu: [
          safeT('navigation.home', '首页'),
          safeT('navigation.about', '关于我们'),
          safeT('navigation.services', '服务内容'),
          safeT('navigation.news', '新闻动态'),
          safeT('navigation.contact', '联系我们')
        ],

        // 首页内容
        home: {
          slogan: safeT('home.slogan', defaultDict.home.slogan),
          subtitle: safeT('home.subtitle', defaultDict.home.subtitle),
          description: safeT('home.description', defaultDict.home.description)
        },

        // 公司简介
        about: {
          title: safeT('about.title', defaultDict.about.title),
          subtitle: safeT('about.subtitle', defaultDict.about.subtitle),
          
          companyInfo: {
            name: safeT('about.companyInfo.name', defaultDict.about.companyInfo.name),
            englishName: safeT('about.companyInfo.englishName', defaultDict.about.companyInfo.englishName),
            established: safeT('about.companyInfo.established', defaultDict.about.companyInfo.established),
            headquarters: safeT('about.companyInfo.headquarters', defaultDict.about.companyInfo.headquarters),
            business: safeT('about.companyInfo.business', defaultDict.about.companyInfo.business)
          },

          description: safeT('about.description', defaultDict.about.description),

          philosophy: {
            title: safeT('about.philosophy.title', defaultDict.about.philosophy.title),
            values: [
              safeT('about.philosophy.values.0', defaultDict.about.philosophy.values[0]), 
              safeT('about.philosophy.values.1', defaultDict.about.philosophy.values[1]), 
              safeT('about.philosophy.values.2', defaultDict.about.philosophy.values[2])
            ]
          },

          vision: {
            title: safeT('about.vision.title', defaultDict.about.vision.title),
            content: safeT('about.vision.content', defaultDict.about.vision.content)
          },

          mission: {
            title: safeT('about.mission.title', defaultDict.about.mission.title), 
            content: safeT('about.mission.content', defaultDict.about.mission.content)
          },

          team: {
            title: safeT('about.team.title', defaultDict.about.team.title),
            content: safeT('about.team.content', defaultDict.about.team.content)
          },

          cta: {
            title: safeT('about.cta.title', '准备与我们合作了吗？'),
            description: safeT('about.cta.description', '我们期待与您建立长期合作关系，共同开拓中日贸易新机遇'),
            learnServices: safeT('about.cta.learnServices', '了解我们的服务')
          }
        },

        // 业务内容
        services: {
          title: safeT('services.title', defaultDict.services.title),
          subtitle: safeT('services.subtitle', defaultDict.services.subtitle)
        },

        // 新闻动态
        news: {
          title: safeT('news.title', defaultDict.news.title),
          subtitle: safeT('news.subtitle', defaultDict.news.subtitle),
          articles: defaultDict.news.articles // 使用默认数据
        },

        // 联系方式
        contact: {
          title: safeT('contact.title', defaultDict.contact.title),
          subtitle: safeT('contact.subtitle', defaultDict.contact.subtitle),
          
          info: {
            company: safeT('contact.info.company', defaultDict.contact.info.company),
            email: safeT('contact.info.email', defaultDict.contact.info.email),
            phone: safeT('contact.info.phone', defaultDict.contact.info.phone),
            address: safeT('contact.info.address', defaultDict.contact.info.address),
            businessHours: safeT('contact.info.businessHours', defaultDict.contact.info.businessHours)
          },

          form: {
            name: safeT('contact.form.name', defaultDict.contact.form.name),
            email: safeT('contact.form.email', defaultDict.contact.form.email),
            company: safeT('contact.form.company', defaultDict.contact.form.company),
            phone: safeT('contact.form.phone', defaultDict.contact.form.phone),
            subject: safeT('contact.form.subject', defaultDict.contact.form.subject),
            message: safeT('contact.form.message', defaultDict.contact.form.message),
            submit: safeT('contact.form.submit', defaultDict.contact.form.submit),
            success: safeT('contact.form.success', defaultDict.contact.form.success),
            error: safeT('contact.form.error', defaultDict.contact.form.error)
          }
        },

        // 页脚
        footer: {
          description: safeT('footer.description', defaultDict.footer.description),
          quickLinks: safeT('footer.quickLinks', defaultDict.footer.quickLinks),
          contact: safeT('footer.contact', defaultDict.footer.contact),
          business: safeT('footer.business', defaultDict.footer.business),
          links: {
            privacy: safeT('footer.links.privacy', defaultDict.footer.links.privacy),
            terms: safeT('footer.links.terms', defaultDict.footer.links.terms),
            sitemap: safeT('footer.links.sitemap', defaultDict.footer.links.sitemap)
          }
        }
      };

      setDict(dynamicDict);
      console.log('Dict updated for language:', i18n.language);
    } catch (error) {
      console.error('Error building dynamic dict:', error);
      setDict(defaultDict); // 出错时使用默认数据
    }
  }, [isReady, i18n.language]);

  console.log('useDict returning dict:', dict);
  return dict;
};