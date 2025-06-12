import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/Analytics';

const Sitemap = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    trackEvent('sitemap_viewed', { language: i18n.language });
  }, [i18n.language]);

  // 安全的翻译函数
  const safeT = (key, defaultValue = '') => {
    try {
      const translation = t(key);
      return translation === key ? defaultValue : translation;
    } catch (error) {
      return defaultValue;
    }
  };

  // 根据语言返回页面数据
  const getPageData = () => {
    switch (i18n.language) {
      case 'ja':
        return {
          title: 'サイトマップ',
          subtitle: 'ウェブサイトの全ページ構成',
          description: '岩林株式会社ウェブサイトの全ページへのリンクをご確認いただけます。',
          mainPages: {
            title: 'メインページ',
            description: '主要なページとサービス情報',
            pages: [
              {
                path: '/',
                name: 'ホーム',
                description: '岩林株式会社のトップページ',
                icon: '🏠',
                details: '会社概要、サービス紹介、最新情報'
              },
              {
                path: '/about',
                name: '会社概要',
                description: '会社の詳細情報とビジョン',
                icon: '🏢',
                details: '企業理念、沿革、チーム紹介'
              },
              {
                path: '/services',
                name: '事業内容',
                description: '提供サービスと事業案内',
                icon: '💼',
                details: '日本健康食品輸入代理、中国商品輸出計画'
              },
              {
                path: '/news',
                name: 'ニュース',
                description: '最新動向と業界インサイト',
                icon: '📰',
                details: '会社動向、市場分析、業界洞察'
              },
              {
                path: '/contact',
                name: 'お問い合わせ',
                description: '連絡先とお問い合わせフォーム',
                icon: '📞',
                details: '所在地、営業時間、お問い合わせフォーム'
              }
            ]
          },
          legalPages: {
            title: '法的ページ',
            description: '法的文書と規約',
            pages: [
              {
                path: '/privacy',
                name: 'プライバシーポリシー',
                description: '個人情報保護方針',
                icon: '🔒',
                details: '個人情報の取扱い、Cookie使用について'
              },
              {
                path: '/terms',
                name: '利用規約',
                description: 'ウェブサイト利用条件',
                icon: '📄',
                details: 'サービス利用規則、免責事項'
              }
            ]
          },
          businessInfo: {
            title: '事業情報',
            description: '事業内容とサービス詳細',
            items: [
              {
                title: '日本健康食品輸入代理',
                status: '実施中',
                description: '日本の優良健康食品の中国市場への導入',
                features: ['品質管理', '輸入手続き', '市場コンサルティング']
              },
              {
                title: '中国商品輸出事業',
                status: '計画中',
                description: '中国優質商品の日本市場開拓支援',
                features: ['市場調査', 'チャネル構築', '規模化運営']
              }
            ]
          },
          quickLinks: {
            title: 'クイックリンク',
            email: 'info@iwabayashi.com',
            phone: '+81-3-1234-5678',
            address: '東京都港区赤坂1-2-3 岩林ビル10F',
            businessHours: '平日 9:00-18:00 (JST)',
            quickContactText: '詳細情報はお気軽にお問い合わせください',
            contactInfoLink: '詳細な連絡先を見る',
            siteStats: 'ウェブサイト統計',
            mainPagesCount: 'メインページ',
            legalPagesCount: '法的ページ',
            businessCategories: '事業カテゴリ',
            supportedLanguages: '対応言語',
            bottomTip: {
              text: 'このサイトマップには、アクセス可能なすべてのページが表示されています。ご利用中にご不明な点がございましたら、または特定のニーズに関する情報が見つからない場合は、お気軽に連絡ページからお問い合わせください。',
              languages: ['🇨🇳 中文', '🇯🇵 日本語', '🇺🇸 English']
            },
            contactLabels: {
              email: 'メール',
              phone: '電話',
              address: '住所',
              businessHours: '営業時間'
            }
          }
        };
      
      case 'en':
        return {
          title: 'Sitemap',
          subtitle: 'Complete Website Structure',
          description: 'Find all pages and sections of the IWABAYASHI Corporation website.',
          mainPages: {
            title: 'Main Pages',
            description: 'Primary pages and service information',
            pages: [
              {
                path: '/',
                name: 'Home',
                description: 'IWABAYASHI Corporation homepage',
                icon: '🏠',
                details: 'Company overview, services, latest updates'
              },
              {
                path: '/about',
                name: 'About Us',
                description: 'Company details and vision',
                icon: '🏢',
                details: 'Corporate philosophy, history, team introduction'
              },
              {
                path: '/services',
                name: 'Services',
                description: 'Our services and business offerings',
                icon: '💼',
                details: 'Japanese health product import agency, Chinese commodity export plans'
              },
              {
                path: '/news',
                name: 'News',
                description: 'Latest developments and industry insights',
                icon: '📰',
                details: 'Company news, market analysis, industry insights'
              },
              {
                path: '/contact',
                name: 'Contact',
                description: 'Contact information and inquiry form',
                icon: '📞',
                details: 'Office location, business hours, contact form'
              }
            ]
          },
          legalPages: {
            title: 'Legal Pages',
            description: 'Legal documents and policies',
            pages: [
              {
                path: '/privacy',
                name: 'Privacy Policy',
                description: 'Personal information protection policy',
                icon: '🔒',
                details: 'Personal data handling, Cookie usage'
              },
              {
                path: '/terms',
                name: 'Terms of Service',
                description: 'Website usage conditions',
                icon: '📄',
                details: 'Service usage rules, disclaimer'
              }
            ]
          },
          businessInfo: {
            title: 'Business Information',
            description: 'Business content and service details',
            items: [
              {
                title: 'Japanese Health Product Import Agency',
                status: 'Active',
                description: 'Introducing premium Japanese health products to Chinese market',
                features: ['Quality control', 'Import procedures', 'Market consulting']
              },
              {
                title: 'Chinese Commodity Export Business',
                status: 'Planned',
                description: 'Supporting Chinese premium products entering Japanese market',
                features: ['Market research', 'Channel development', 'Scale operations']
              }
            ]
          },
          quickLinks: {
            title: 'Quick Links',
            email: 'info@iwabayashi.com',
            phone: '+81-3-1234-5678',
            address: 'Iwabayashi Building 10F, 1-2-3 Akasaka, Minato-ku, Tokyo',
            businessHours: 'Weekdays 9:00-18:00 (JST)',
            quickContactText: 'Contact us quickly for more information',
            contactInfoLink: 'View Complete Contact Information',
            siteStats: 'Website Statistics',
            mainPagesCount: 'Main Pages',
            legalPagesCount: 'Legal Pages',
            businessCategories: 'Business Categories',
            supportedLanguages: 'Supported Languages',
            bottomTip: {
              text: 'This sitemap displays all accessible pages on the website. If you encounter any issues while browsing or cannot find information about specific needs, please feel free to contact us through the contact page.',
              languages: ['🇨🇳 Chinese', '🇯🇵 Japanese', '🇺🇸 English']
            },
            contactLabels: {
              email: 'Email',
              phone: 'Phone',
              address: 'Address',
              businessHours: 'Business Hours'
            }
          }
        };
      
      default: // 中文
        return {
          title: '网站地图',
          subtitle: '完整的网站结构导览',
          description: '查看岩林株式会社网站的所有页面和功能模块。',
          mainPages: {
            title: '主要页面',
            description: '核心页面和服务信息',
            pages: [
              {
                path: '/',
                name: '首页',
                description: '岩林株式会社官网首页',
                icon: '🏠',
                details: '公司概况、服务介绍、最新动态'
              },
              {
                path: '/about',
                name: '关于我们',
                description: '公司详细信息和愿景',
                icon: '🏢',
                details: '企业理念、发展历程、团队介绍'
              },
              {
                path: '/services',
                name: '服务内容',
                description: '业务服务和解决方案',
                icon: '💼',
                details: '日本保健品进口代理、中国商品出口规划'
              },
              {
                path: '/news',
                name: '新闻动态',
                description: '最新动态与行业洞察',
                icon: '📰',
                details: '公司动态、市场分析、行业洞察'
              },
              {
                path: '/contact',
                name: '联系我们',
                description: '联系方式和咨询表单',
                icon: '📞',
                details: '办公地址、营业时间、在线咨询'
              }
            ]
          },
          legalPages: {
            title: '法律页面',
            description: '法律文件和政策条款',
            pages: [
              {
                path: '/privacy',
                name: '隐私政策',
                description: '个人信息保护政策',
                icon: '🔒',
                details: '个人数据处理、Cookie使用说明'
              },
              {
                path: '/terms',
                name: '使用条款',
                description: '网站使用条件和规则',
                icon: '📄',
                details: '服务使用规则、免责声明'
              }
            ]
          },
          businessInfo: {
            title: '业务信息',
            description: '业务内容和服务详情',
            items: [
              {
                title: '日本保健品进口代理',
                status: '进行中',
                description: '引进日本优质保健品到中国市场',
                features: ['质量控制', '进口手续', '市场咨询']
              },
              {
                title: '中国大宗商品出口',
                status: '规划中',
                description: '助力中国优质商品进入日本市场',
                features: ['市场调研', '渠道建设', '规模化运营']
              }
            ]
          },
          quickLinks: {
            title: '快速链接',
            email: 'info@iwabayashi.com',
            phone: '+81-3-1234-5678',
            address: '日本东京都港区赤坂1-2-3 岩林大厦10F',
            businessHours: '工作日 9:00-18:00 (JST)',
            quickContactText: '快速联系我们获取更多信息',
            contactInfoLink: '查看完整联系信息',
            siteStats: '网站统计',
            mainPagesCount: '主要页面',
            legalPagesCount: '法律页面',
            businessCategories: '业务类别',
            supportedLanguages: '支持语言',
            bottomTip: {
              text: '本网站地图展示了所有可访问的页面。如果您在浏览过程中遇到任何问题，或者有特定需求无法找到相关信息，请随时通过联系页面与我们取得联系。',
              languages: ['🇨🇳 中文', '🇯🇵 日本語', '🇺🇸 English']
            },
            contactLabels: {
              email: '邮箱',
              phone: '电话',
              address: '地址',
              businessHours: '营业时间'
            }
          }
        };
    }
  };

  const data = getPageData();

  const handlePageClick = (pagePath, pageName) => {
    trackEvent('sitemap_page_clicked', { 
      page: pagePath, 
      name: pageName,
      language: i18n.language 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 */}
      <section className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-green-600/5 to-green-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tr from-green-500/5 to-green-700/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-green-800 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🗺️
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-green-800 bg-clip-text text-transparent">
                  {data.title}
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">{data.subtitle}</p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* 主要页面 */}
          <div className={`mb-16 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.mainPages.title}</h2>
              <p className="text-gray-600">{data.mainPages.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.mainPages.pages.map((page, index) => (
                <Link
                  key={index}
                  to={page.path}
                  onClick={() => handlePageClick(page.path, page.name)}
                  className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-green-800 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {page.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-800 transition-colors">
                        {page.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {page.description}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {page.details}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{page.path}</span>
                    <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 法律页面 */}
          <div className={`mb-16 transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.legalPages.title}</h2>
              <p className="text-gray-600">{data.legalPages.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {data.legalPages.pages.map((page, index) => (
                <Link
                  key={index}
                  to={page.path}
                  onClick={() => handlePageClick(page.path, page.name)}
                  className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {page.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-700 transition-colors">
                        {page.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {page.description}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {page.details}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{page.path}</span>
                    <span className="text-gray-600 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 业务信息概览 */}
          <div className={`mb-16 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.businessInfo.title}</h2>
              <p className="text-gray-600">{data.businessInfo.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {data.businessInfo.items.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-6">
                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === '进行中' || item.status === '実施中' || item.status === 'Active'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <div className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 快速联系 */}
          <div className={`transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-gray-800 to-green-800 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">{data.quickLinks.title}</h2>
                <p className="text-green-100">{data.quickLinks.quickContactText}</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <a
                  href={`mailto:${data.quickLinks.email}`}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 group"
                  onClick={() => trackEvent('sitemap_quick_contact', { method: 'email' })}
                >
                  <div className="text-3xl mb-2">📧</div>
                  <div className="text-white font-semibold mb-1">{data.quickLinks.contactLabels.email}</div>
                  <div className="text-green-100 text-sm group-hover:text-white transition-colors">
                    {data.quickLinks.email}
                  </div>
                </a>
                
                <a
                  href={`tel:${data.quickLinks.phone}`}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 group"
                  onClick={() => trackEvent('sitemap_quick_contact', { method: 'phone' })}
                >
                  <div className="text-3xl mb-2">📞</div>
                  <div className="text-white font-semibold mb-1">{data.quickLinks.contactLabels.phone}</div>
                  <div className="text-green-100 text-sm group-hover:text-white transition-colors">
                    {data.quickLinks.phone}
                  </div>
                </a>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">📍</div>
                  <div className="text-white font-semibold mb-1">{data.quickLinks.contactLabels.address}</div>
                  <div className="text-green-100 text-sm">
                    {data.quickLinks.address}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🕒</div>
                  <div className="text-white font-semibold mb-1">{data.quickLinks.contactLabels.businessHours}</div>
                  <div className="text-green-100 text-sm">
                    {data.quickLinks.businessHours}
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => trackEvent('sitemap_contact_cta')}
                >
                  {data.quickLinks.contactInfoLink}
                </Link>
              </div>
            </div>
          </div>

          {/* 页面统计 */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{data.quickLinks.siteStats}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">{data.mainPages.pages.length}</div>
                <div className="text-gray-600 text-sm">{data.quickLinks.mainPagesCount}</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">{data.legalPages.pages.length}</div>
                <div className="text-gray-600 text-sm">{data.quickLinks.legalPagesCount}</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">{data.businessInfo.items.length}</div>
                <div className="text-gray-600 text-sm">{data.quickLinks.businessCategories}</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <div className="text-gray-600 text-sm">{data.quickLinks.supportedLanguages}</div>
              </div>
            </div>
          </div>

          {/* 底部提示 */}
          <div className="mt-12 p-6 bg-gray-100 rounded-xl text-center">
            <p className="text-gray-600 leading-relaxed">
              <strong>{i18n.language === 'ja' ? 'ヒント：' : i18n.language === 'en' ? 'Tip:' : '提示：'}</strong>
              {data.quickLinks.bottomTip.text}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {data.quickLinks.bottomTip.languages.map((lang, index) => (
                <span key={index} className="text-sm text-gray-500">{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;