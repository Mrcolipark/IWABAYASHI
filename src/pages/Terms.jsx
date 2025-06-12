import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/Analytics';

const Terms = () => {
  const { t, i18n } = useTranslation();
  const [lastUpdated] = useState('2024年12月20日');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    trackEvent('terms_of_service_viewed', { language: i18n.language });
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
          title: '利用規約',
          lastUpdated: '最終更新日：2024年12月20日',
          sections: [
            {
              title: '1. 基本事項',
              content: `本利用規約（以下「本規約」といいます）は、岩林株式会社（以下「当社」といいます）が運営する本ウェブサイト（以下「本サイト」といいます）の利用条件を定めるものです。本サイトをご利用になる場合には、本規約にご同意いただいたものと見なします。

本サイトは、日中間の貿易に関する情報提供およびサービス案内を目的として運営しております。`
            },
            {
              title: '2. サービス内容',
              content: `本サイトでは以下のサービスを提供しています：

• 貿易関連情報の提供
• 会社案内および事業紹介
• 商品・サービスに関する情報提供
• お問い合わせの受付
• その他、当社が適切と判断するサービス

当社は、予告なくサービス内容を変更、追加、または削除する場合があります。`
            },
            {
              title: '3. 利用規則',
              content: `本サイトをご利用いただく際は、以下の行為を禁止いたします：

• 法令に違反する行為
• 当社または第三者の知的財産権を侵害する行為
• 当社または第三者の名誉・信用を毀損する行為
• 虚偽の情報を送信する行為
• コンピューターウイルス等の有害なプログラムを送信する行為
• 本サイトの運営を妨害する行為
• その他、当社が不適切と判断する行為`
            },
            {
              title: '4. 知的財産権',
              content: `本サイトに掲載されている文章、画像、動画、音声、プログラム等のすべての情報（以下「コンテンツ」といいます）は、当社または正当な権利者が著作権その他の知的財産権を有しています。

ユーザーは、個人的な利用の範囲内で、かつ非営利目的に限り、本サイトのコンテンツを利用することができます。ただし、著作権表示の削除、改変等は禁止いたします。`
            },
            {
              title: '5. 免責事項',
              content: `当社は、以下について一切の責任を負いません：

• 本サイトの情報の正確性、完全性、有用性
• 本サイトの利用により生じた損害
• 第三者によるサイトの改ざん、情報の盗用等
• 通信回線やコンピューターの故障等による損害
• 不可抗力による損害

本サイトの情報は参考情報として提供されており、投資判断や業務判断の根拠として使用される場合は、ユーザーの責任において行ってください。`
            },
            {
              title: '6. プライバシー保護',
              content: `当社は、お客様の個人情報を適切に保護いたします。個人情報の取扱いについては、別途定める「プライバシーポリシー」をご参照ください。

Cookie等の技術を使用して、サイトの利用状況を分析する場合があります。これらの情報は、サービス向上のために使用されます。`
            },
            {
              title: '7. 適用法律・管轄裁判所',
              content: `本規約は日本法に準拠し、日本法により解釈されるものとします。

本サイトの利用または本規約に関して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。`
            },
            {
              title: '8. 規約の変更',
              content: `当社は、必要に応じて本規約を変更することがあります。変更後の規約は、本サイトに掲載された時点から効力を生じます。

重要な変更がある場合は、本サイト上で事前に通知いたします。変更後も本サイトをご利用いただく場合は、変更後の規約に同意したものと見なします。`
            },
            {
              title: '9. お問い合わせ',
              content: `本規約に関するお問い合わせは、以下までご連絡ください：

岩林株式会社
〒107-0052 東京都港区赤坂1-2-3 岩林ビル10F
電話：+81-3-1234-5678
メール：legal@iwabayashi.com
受付時間：平日 9:00-18:00（日本標準時）`
            }
          ]
        };
      
      case 'en':
        return {
          title: 'Terms of Service',
          lastUpdated: 'Last Updated: December 20, 2024',
          sections: [
            {
              title: '1. Basic Provisions',
              content: `These Terms of Service ("Terms") set forth the conditions for use of this website ("Site") operated by IWABAYASHI Corporation ("we", "our", or "us"). By using this Site, you agree to be bound by these Terms.

This Site is operated for the purpose of providing information and service introductions related to trade between China and Japan.`
            },
            {
              title: '2. Service Content',
              content: `This Site provides the following services:

• Provision of trade-related information
• Company introduction and business overview
• Information about products and services
• Inquiry handling
• Other services deemed appropriate by us

We may change, add, or remove service content without prior notice.`
            },
            {
              title: '3. Usage Rules',
              content: `When using this Site, the following activities are prohibited:

• Activities that violate laws and regulations
• Activities that infringe on intellectual property rights of us or third parties
• Activities that damage the reputation or credibility of us or third parties
• Transmission of false information
• Transmission of harmful programs such as computer viruses
• Activities that interfere with the operation of this Site
• Other activities deemed inappropriate by us`
            },
            {
              title: '4. Intellectual Property Rights',
              content: `All information including text, images, videos, audio, programs, etc. ("Content") posted on this Site is owned by us or legitimate rights holders who hold copyright and other intellectual property rights.

Users may use the Content of this Site only for personal use and non-commercial purposes. However, deletion or modification of copyright notices is prohibited.`
            },
            {
              title: '5. Disclaimer',
              content: `We assume no responsibility for the following:

• Accuracy, completeness, or usefulness of information on this Site
• Damages arising from use of this Site
• Site tampering or information theft by third parties
• Damages due to communication line or computer failures
• Damages due to force majeure

Information on this Site is provided as reference information. When used as a basis for investment or business decisions, it should be done at the user's own responsibility.`
            },
            {
              title: '6. Privacy Protection',
              content: `We appropriately protect customer personal information. Please refer to our separately defined "Privacy Policy" for details on personal information handling.

We may use technologies such as cookies to analyze site usage patterns. This information is used to improve our services.`
            },
            {
              title: '7. Governing Law and Jurisdiction',
              content: `These Terms shall be governed by and construed in accordance with Japanese law.

In case of disputes arising from the use of this Site or these Terms, the Tokyo District Court shall be the exclusive agreed court of jurisdiction for the first instance.`
            },
            {
              title: '8. Changes to Terms',
              content: `We may change these Terms as necessary. The revised Terms will become effective from the time they are posted on this Site.

In case of important changes, we will provide advance notice on this Site. Continued use of this Site after changes constitutes acceptance of the revised Terms.`
            },
            {
              title: '9. Contact Information',
              content: `For inquiries regarding these Terms, please contact:

IWABAYASHI Corporation
Iwabayashi Building 10F, 1-2-3 Akasaka, Minato-ku, Tokyo 107-0052, Japan
Phone: +81-3-1234-5678
Email: legal@iwabayashi.com
Business Hours: Weekdays 9:00-18:00 (JST)`
            }
          ]
        };
      
      default: // 中文
        return {
          title: '使用条款',
          lastUpdated: '最后更新：2024年12月20日',
          sections: [
            {
              title: '1. 基本条款',
              content: `本使用条款（以下简称"条款"）规定了使用岩林株式会社（以下简称"我们"或"本公司"）运营的本网站（以下简称"本网站"）的使用条件。使用本网站即表示您同意遵守本条款。

本网站旨在提供中日双边贸易相关信息及服务介绍。`
            },
            {
              title: '2. 服务内容',
              content: `本网站提供以下服务：

• 提供贸易相关信息
• 公司介绍和业务说明
• 产品和服务信息
• 咨询受理
• 其他我们认为适当的服务

我们可能会在不事先通知的情况下更改、增加或删除服务内容。`
            },
            {
              title: '3. 使用规则',
              content: `在使用本网站时，禁止以下行为：

• 违反法律法规的行为
• 侵犯我们或第三方知识产权的行为
• 损害我们或第三方名誉、信用的行为
• 发送虚假信息的行为
• 发送计算机病毒等有害程序的行为
• 妨碍本网站运营的行为
• 其他我们认为不当的行为`
            },
            {
              title: '4. 知识产权',
              content: `本网站上发布的所有内容，包括文字、图片、视频、音频、程序等（以下简称"内容"），均由我们或合法权利人拥有著作权及其他知识产权。

用户可以在个人使用范围内且仅限非商业目的使用本网站内容。但禁止删除或修改著作权标识。`
            },
            {
              title: '5. 免责声明',
              content: `对于以下情况，我们不承担任何责任：

• 本网站信息的准确性、完整性、实用性
• 因使用本网站而产生的损害
• 第三方对网站的篡改、信息盗用等
• 因通信线路或计算机故障等造成的损害
• 因不可抗力造成的损害

本网站信息仅作为参考信息提供。当作为投资判断或业务判断依据使用时，请用户自行承担责任。`
            },
            {
              title: '6. 隐私保护',
              content: `我们将妥善保护客户的个人信息。关于个人信息的处理，请参阅我们单独制定的"隐私政策"。

我们可能使用Cookie等技术来分析网站使用情况。这些信息将用于改善我们的服务。`
            },
            {
              title: '7. 适用法律和管辖法院',
              content: `本条款适用日本法律，并按照日本法律进行解释。

因使用本网站或本条款产生争议时，以东京地方法院为第一审专属管辖法院。`
            },
            {
              title: '8. 条款变更',
              content: `我们可能根据需要变更本条款。变更后的条款从在本网站公布之时起生效。

如有重要变更，我们将在本网站上提前通知。变更后继续使用本网站即视为同意变更后的条款。`
            },
            {
              title: '9. 联系方式',
              content: `关于本条款的咨询，请联系：

岩林株式会社
地址：〒107-0052 日本东京都港区赤坂1-2-3 岩林大厦10楼
电话：+81-3-1234-5678
邮箱：legal@iwabayashi.com
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
              <span>📄</span>
              <span>{i18n.language === 'ja' ? '以下の規約を必ずお読みください' : i18n.language === 'en' ? 'Please read the following terms carefully' : '请仔细阅读以下条款'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* 快速导航 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {i18n.language === 'ja' ? 'クイックナビゲーション' : i18n.language === 'en' ? 'Quick Navigation' : '快速导航'}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {content.sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-gray-700 hover:text-green-800"
                  onClick={() => trackEvent('terms_section_clicked', { section: section.title })}
                >
                  <span className="text-green-600">▶</span>
                  <span className="text-sm">{section.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 重要提示 */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-2xl">ℹ️</span>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  {i18n.language === 'ja' ? '重要なお知らせ' : i18n.language === 'en' ? 'Important Notice' : '重要提示'}
                </h3>
                <p className="text-green-700 leading-relaxed">
                  {i18n.language === 'ja' 
                    ? 'ウェブサイトをご利用になる前に、本利用規約をよくお読みください。ウェブサイトを継続してご利用いただくことにより、以下の規約に同意したものとみなされます。本規約のいずれかの部分に同意いただけない場合は、ウェブサイトのご利用をお控えください。'
                    : i18n.language === 'en'
                    ? 'Before using this website, please carefully read these Terms of Service. Continued use of this website indicates your agreement to the following terms. If you do not agree to any part of these terms, please discontinue use of this website.'
                    : '使用本网站前，请仔细阅读本使用条款。继续使用本网站即表示您同意遵守以下条款。如果您不同意本条款的任何部分，请停止使用本网站。'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* 条款内容 */}
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

          {/* 生效声明 */}
          <div className="mt-12 bg-gradient-to-r from-gray-800 to-green-800 rounded-2xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                {i18n.language === 'ja' ? '規約の効力' : i18n.language === 'en' ? 'Terms Effectiveness' : '条款生效'}
              </h3>
              <p className="text-green-100 mb-6">
                {i18n.language === 'ja' 
                  ? 'この利用規約は、お客様が本ウェブサイトの利用を開始した時点から効力を生じます。当社は、これらの規約をいつでも変更する権利を留保します。ご不明な点がございましたら、お気軽にお問い合わせください。'
                  : i18n.language === 'en'
                  ? 'These Terms of Service take effect from the moment you begin using this website. We reserve the right to modify these terms at any time. If you have any questions, please feel free to contact us.'
                  : '本使用条款自您开始使用本网站时生效。我们保留随时修改这些条款的权利。如有疑问，请随时与我们联系。'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@iwabayashi.com"
                  className="px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                  onClick={() => trackEvent('terms_contact_clicked', { method: 'email' })}
                >
                  <span>📧</span>
                  <span>{i18n.language === 'ja' ? '法務相談' : i18n.language === 'en' ? 'Legal Consultation' : '法务咨询'}</span>
                </a>
                <Link
                  to="/contact"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => trackEvent('terms_contact_clicked', { method: 'contact_page' })}
                >
                  <span>💬</span>
                  <span>{i18n.language === 'ja' ? '一般相談' : i18n.language === 'en' ? 'General Inquiry' : '一般咨询'}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 页面底部导航 */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {i18n.language === 'ja' ? '関連ページ' : i18n.language === 'en' ? 'Related Pages' : '相关页面'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                to="/privacy"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => trackEvent('terms_related_link_clicked', { target: 'privacy' })}
              >
                <span className="text-2xl">🔒</span>
                <div>
                  <div className="font-semibold text-gray-800">
                    {i18n.language === 'ja' ? 'プライバシーポリシー' : i18n.language === 'en' ? 'Privacy Policy' : '隐私政策'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {i18n.language === 'ja' ? '個人情報保護' : i18n.language === 'en' ? 'Personal Information Protection' : '个人信息保护'}
                  </div>
                </div>
              </Link>
              
              <Link
                to="/contact"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => trackEvent('terms_related_link_clicked', { target: 'contact' })}
              >
                <span className="text-2xl">📞</span>
                <div>
                  <div className="font-semibold text-gray-800">
                    {i18n.language === 'ja' ? 'お問い合わせ' : i18n.language === 'en' ? 'Contact Us' : '联系我们'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {i18n.language === 'ja' ? 'さらなるサポートを得る' : i18n.language === 'en' ? 'Get More Help' : '获取更多帮助'}
                  </div>
                </div>
              </Link>
              
              <Link
                to="/sitemap"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => trackEvent('terms_related_link_clicked', { target: 'sitemap' })}
              >
                <span className="text-2xl">🗺️</span>
                <div>
                  <div className="font-semibold text-gray-800">
                    {i18n.language === 'ja' ? 'サイトマップ' : i18n.language === 'en' ? 'Sitemap' : '网站地图'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {i18n.language === 'ja' ? '全ページを閲覧' : i18n.language === 'en' ? 'Browse All Pages' : '浏览所有页面'}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* 法律声明 */}
          <div className="mt-8 p-6 bg-gray-100 rounded-xl">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              <strong>
                {i18n.language === 'ja' ? '法的声明：' : i18n.language === 'en' ? 'Legal Statement:' : '法律声明：'}
              </strong>
              {i18n.language === 'ja' 
                ? 'この利用規約は日本法に準拠します。本規約に関して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。本規約の中国語版は参考用であり、日本語版と相違がある場合は日本語版を優先します。'
                : i18n.language === 'en'
                ? 'These Terms of Service are governed by Japanese law. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance. The Chinese version of these terms is for reference only; in case of conflict with the Japanese version, the Japanese version shall prevail.'
                : '本使用条款受日本法律管辖。如因本条款产生争议，将由东京地方法院作为第一审专属管辖法院。本条款的中文版本仅供参考，如与日文版本有冲突，以日文版本为准。'
              }
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;