import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/Analytics';

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const [lastUpdated] = useState('2024年12月20日');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    trackEvent('privacy_policy_viewed', { language: i18n.language });
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

  // 根据语言返回相应内容
  const getContent = () => {
    switch (i18n.language) {
      case 'ja':
        return {
          title: 'プライバシーポリシー',
          lastUpdated: '最終更新日：2024年12月20日',
          sections: [
            {
              title: '1. 基本方針',
              content: `岩林株式会社（以下「当社」といいます）は、お客様の個人情報の保護に関して、以下の方針に基づき適切に取り扱うことをお約束いたします。当社は、個人情報保護法をはじめとする個人情報保護に関する法令を遵守し、お客様に安心してサービスをご利用いただけるよう努めております。`
            },
            {
              title: '2. 収集する情報の種類',
              content: `当社では、以下の種類の個人情報を収集する場合があります：
              
• お名前、会社名、部署名、役職
• 電子メールアドレス、電話番号、FAX番号
• 郵便番号、住所
• お問い合わせ内容、ご要望
• ウェブサイトの利用状況（IPアドレス、ブラウザ情報、アクセス日時等）
• その他、サービス提供に必要な情報`
            },
            {
              title: '3. 情報収集の目的',
              content: `収集した個人情報は、以下の目的で利用いたします：
              
• お問い合わせへの回答およびサービス提供
• 貿易関連サービスのご案内
• 契約の締結および履行
• アフターサービスの提供
• 新サービスや重要な情報のご案内
• ウェブサイトの改善および品質向上
• 法令に基づく対応`
            },
            {
              title: '4. Cookieの使用',
              content: `当社ウェブサイトでは、より良いサービス提供のためCookieを使用しています：
              
• Google Analyticsによるアクセス解析
• ウェブサイトの機能改善
• ユーザー体験の向上
• 言語設定の記憶

Cookieの使用を無効にしたい場合は、ブラウザの設定で拒否することができます。ただし、一部機能が制限される場合があります。`
            },
            {
              title: '5. 第三者提供',
              content: `当社は、以下の場合を除き、お客様の同意なしに個人情報を第三者に提供することはありません：
              
• 法令に基づく場合
• 人の生命、身体または財産の保護のために必要がある場合
• 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合
• 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合`
            },
            {
              title: '6. 安全管理措置',
              content: `当社は、個人情報の漏えい、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます：
              
• アクセス制御による個人情報への不正アクセス防止
• 情報システムの監視による不正利用の防止
• 従業員への教育・研修の実施
• 個人情報の取扱いに関する規程の整備`
            },
            {
              title: '7. 個人情報の開示・訂正・削除',
              content: `お客様は、当社が保有するご自身の個人情報について、開示、訂正、削除を求めることができます。ご希望の場合は、以下の連絡先までお問い合わせください。本人確認を行った後、合理的な期間内に対応いたします。`
            },
            {
              title: '8. お問い合わせ窓口',
              content: `個人情報の取扱いに関するお問い合わせは、以下までご連絡ください：
              
岩林株式会社
〒107-0052 東京都港区赤坂1-2-3 岩林ビル10F
電話：+81-3-1234-5678
メール：privacy@iwabayashi.com
受付時間：平日 9:00-18:00（日本標準時）`
            }
          ]
        };
      
      case 'en':
        return {
          title: 'Privacy Policy',
          lastUpdated: 'Last Updated: December 20, 2024',
          sections: [
            {
              title: '1. Basic Policy',
              content: `IWABAYASHI Corporation ("we", "our", or "us") is committed to protecting your personal information in accordance with the following policy. We comply with applicable privacy laws and regulations to ensure you can use our services with confidence.`
            },
            {
              title: '2. Types of Information We Collect',
              content: `We may collect the following types of personal information:
              
• Name, company name, department, title
• Email address, phone number, fax number
• Postal code, address
• Inquiry content and requests
• Website usage information (IP address, browser information, access times, etc.)
• Other information necessary for service provision`
            },
            {
              title: '3. Purpose of Information Collection',
              content: `We use collected personal information for the following purposes:
              
• Responding to inquiries and providing services
• Information about trade-related services
• Contract conclusion and performance
• Providing after-sales service
• Notifications about new services and important information
• Website improvement and quality enhancement
• Legal compliance`
            },
            {
              title: '4. Use of Cookies',
              content: `Our website uses cookies to provide better services:
              
• Google Analytics for access analysis
• Website functionality improvement
• User experience enhancement
• Language preference storage

You can disable cookies through your browser settings. However, some functions may be limited.`
            },
            {
              title: '5. Third Party Disclosure',
              content: `We do not provide personal information to third parties without your consent, except in the following cases:
              
• When required by law
• When necessary to protect life, body or property
• When particularly necessary for public health improvement or promoting healthy child development
• When necessary to cooperate with government agencies or local public entities in performing legally mandated duties`
            },
            {
              title: '6. Security Measures',
              content: `We implement necessary and appropriate measures for the security management of personal information to prevent leakage, loss, or damage:
              
• Access control to prevent unauthorized access to personal information
• Information system monitoring to prevent unauthorized use
• Employee education and training
• Establishment of personal information handling regulations`
            },
            {
              title: '7. Disclosure, Correction, and Deletion of Personal Information',
              content: `You may request disclosure, correction, or deletion of your personal information held by us. If you wish to do so, please contact us using the information below. We will respond within a reasonable timeframe after verifying your identity.`
            },
            {
              title: '8. Contact Information',
              content: `For inquiries regarding the handling of personal information, please contact:
              
IWABAYASHI Corporation
Iwabayashi Building 10F, 1-2-3 Akasaka, Minato-ku, Tokyo 107-0052, Japan
Phone: +81-3-1234-5678
Email: privacy@iwabayashi.com
Business Hours: Weekdays 9:00-18:00 (JST)`
            }
          ]
        };
      
      default: // 中文
        return {
          title: '隐私政策',
          lastUpdated: '最后更新：2024年12月20日',
          sections: [
            {
              title: '1. 基本方针',
              content: `岩林株式会社（以下简称"我们"或"本公司"）致力于保护您的个人信息隐私。我们严格遵守相关法律法规，按照以下政策处理您的个人信息，确保您能够安心使用我们的服务。`
            },
            {
              title: '2. 收集信息的类型',
              content: `我们可能收集以下类型的个人信息：
              
• 姓名、公司名称、部门、职位
• 电子邮箱地址、电话号码、传真号码
• 邮政编码、地址
• 咨询内容和需求
• 网站使用信息（IP地址、浏览器信息、访问时间等）
• 其他提供服务所必需的信息`
            },
            {
              title: '3. 信息收集的目的',
              content: `我们收集的个人信息将用于以下目的：
              
• 回复咨询并提供服务
• 介绍贸易相关服务
• 签订和履行合同
• 提供售后服务
• 通知新服务和重要信息
• 改善网站功能和提升服务质量
• 遵守法律法规要求`
            },
            {
              title: '4. Cookie的使用',
              content: `我们的网站使用Cookie来提供更好的服务：
              
• 使用Google Analytics进行访问分析
• 改善网站功能
• 提升用户体验
• 记住语言设置

您可以通过浏览器设置拒绝Cookie，但这可能会影响部分网站功能的使用。`
            },
            {
              title: '5. 第三方信息提供',
              content: `除以下情况外，我们不会在未经您同意的情况下向第三方提供您的个人信息：
              
• 法律法规要求的情况
• 为保护生命、身体或财产安全所必需的情况
• 为促进公共卫生或儿童健康成长所特别必需的情况
• 需要配合国家机关或地方政府执行法定职务的情况`
            },
            {
              title: '6. 安全管理措施',
              content: `我们采取必要且适当的措施来保护个人信息的安全，防止泄露、丢失或损坏：
              
• 通过访问控制防止对个人信息的未授权访问
• 监控信息系统以防止未授权使用
• 对员工进行教育培训
• 建立个人信息处理相关规定`
            },
            {
              title: '7. 个人信息的披露、更正和删除',
              content: `您可以要求我们披露、更正或删除我们持有的您的个人信息。如有此类需求，请通过以下联系方式与我们联系。在确认您的身份后，我们将在合理期限内给予回复。`
            },
            {
              title: '8. 联系窗口',
              content: `关于个人信息处理的咨询，请联系：
              
岩林株式会社
地址：〒107-0052 日本东京都港区赤坂1-2-3 岩林大厦10楼
电话：+81-3-1234-5678
邮箱：privacy@iwabayashi.com
工作时间：工作日 9:00-18:00（日本标准时间）`
            }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      
      {/* Hero区域 */}
      <section className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-green-600/5 to-green-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tr from-green-500/5 to-green-700/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-green-800 bg-clip-text text-transparent">
                {content.title}
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {content.lastUpdated}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>🔒</span>
              <span>您的隐私对我们很重要</span>
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* 快速导航 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">快速导航</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {content.sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-gray-700 hover:text-green-800"
                  onClick={() => trackEvent('privacy_section_clicked', { section: section.title })}
                >
                  <span className="text-green-600">▶</span>
                  <span className="text-sm">{section.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 政策内容 */}
          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div
                key={index}
                id={`section-${index}`}
                className={`bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-1000 delay-${index * 100} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 联系信息强调 */}
          <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">有疑问？我们随时为您解答</h3>
              <p className="text-green-100 mb-6">
                如果您对我们的隐私政策有任何疑问或建议，请随时与我们联系
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@iwabayashi.com"
                  className="px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                  onClick={() => trackEvent('privacy_contact_clicked', { method: 'email' })}
                >
                  <span>📧</span>
                  <span>发送邮件</span>
                </a>
                <Link
                  to="/contact"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => trackEvent('privacy_contact_clicked', { method: 'contact_page' })}
                >
                  <span>💬</span>
                  <span>联系我们</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 页面底部导航 */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">相关页面</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                to="/terms"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => trackEvent('privacy_related_link_clicked', { target: 'terms' })}
              >
                <span className="text-2xl">📄</span>
                <div>
                  <div className="font-semibold text-gray-800">使用条款</div>
                  <div className="text-sm text-gray-500">了解服务使用规则</div>
                </div>
              </Link>
              
              <Link
                to="/contact"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => trackEvent('privacy_related_link_clicked', { target: 'contact' })}
              >
                <span className="text-2xl">📞</span>
                <div>
                  <div className="font-semibold text-gray-800">联系我们</div>
                  <div className="text-sm text-gray-500">获取更多帮助</div>
                </div>
              </Link>
              
              <Link
                to="/sitemap"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => trackEvent('privacy_related_link_clicked', { target: 'sitemap' })}
              >
                <span className="text-2xl">🗺️</span>
                <div>
                  <div className="font-semibold text-gray-800">网站地图</div>
                  <div className="text-sm text-gray-500">浏览所有页面</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;