export default {
  title: "お問い合わせ",
  subtitle: "お客様との協力関係の構築を期待しております",
  
  info: {
    company: "岩林株式会社",
    email: "info@iwabayashi.com",
    phone: "+81-3-1234-5678",
    address: "日本国東京都港区赤坂1-2-3 岩林ビル10F",
    businessHours: "月曜日〜金曜日 9:00-18:00 (JST)"
  },

  sections: {
    contactInfo: "連絡先",
    sendMessage: "メッセージ送信",
    trafficInfo: "交通情報",
    frequentQuestions: "よくある質問",
    ourLocation: "所在地",
    detailedAddress: "詳細住所",
    visitAppointment: "訪問予約"
  },

  form: {
    name: "お名前",
    email: "メールアドレス",
    company: "会社名",
    phone: "電話番号",
    subject: "お問い合わせ内容",
    message: "メッセージ",
    submit: "メッセージを送信",
    sending: "送信中...",
    success: "メッセージが正常に送信されました！できるだけ早くご返信いたします。",
    error: "送信に失敗しました。しばらくしてから再試行してください。",
    namePlaceholder: "お名前を入力してください",
    emailPlaceholder: "メールアドレスを入力してください",
    companyPlaceholder: "会社名を入力してください",
    phonePlaceholder: "電話番号を入力してください",
    subjectPlaceholder: "お問い合わせ内容を選択してください",
    messagePlaceholder: "ご要望や質問を詳しくお聞かせください。できるだけ早くご返信いたします...",
    subjects: [
      { value: "", label: "お問い合わせ内容を選択してください" },
      { value: "保健品進口代理", label: "日本健康食品輸入代理" },
      { value: "大宗商品出口", label: "中国商品輸出" },
      { value: "供应链管理", label: "サプライチェーン管理サービス" },
      { value: "市场咨询", label: "市場コンサルティングサービス" },
      { value: "合作洽谈", label: "協力相談" },
      { value: "其他", label: "その他のお問い合わせ" }
    ]
  },

  contactMethods: {
    email: "メールアドレス",
    phone: "電話番号",
    address: "オフィス住所",
    hours: "営業時間"
  },

  traffic: [
    "東京メトロ銀座線・丸ノ内線 赤坂見附駅 徒歩5分",
    "東京メトロ千代田線 赤坂駅 徒歩3分",
    "JR中央線・総武線 四ツ谷駅 徒歩10分"
  ],

  mapActions: {
    viewOnMap: "地図で見る",
    phoneAppointment: "電話予約",
    emailAppointment: "メール予約"
  },

  locationDetails: {
    office: "オフィス住所",
    nearestStation: "最寄り駅",
    receptionHours: "受付時間",
    appointmentNote: "※ ご来訪前に事前予約をお願いいたします"
  },

  appointmentInfo: {
    title: "訪問予約",
    description: "オフィスでの面談をご希望の場合は、事前にお電話またはメールでご予約ください。適切な時間を調整し、詳細な交通案内をご提供いたします。"
  },

  faq: [
    {
      question: "どのような日本健康食品の輸入サービスを提供していますか？",
      answer: "日本の優良健康食品の輸入代理業務を専門に行っており、栄養補助食品、美容健康製品、機能性食品などを取り扱っています。日本の多数の有名ブランドと協力関係を築き、製品の品質と安全性を確保しています。"
    },
    {
      question: "輸入代理サービスの一般的な流れはどのくらいの時間がかかりますか？",
      answer: "一般的に、完全な輸入代理プロセスは30-45営業日が必要で、製品審査、資格取得、通関手続き、品質検査などの工程が含まれます。具体的な時間は製品の種類と複雑さによって異なります。"
    },
    {
      question: "輸入製品の品質をどのように保証していますか？",
      answer: "厳格な品質管理体系を構築しており、サプライヤー資格審査、製品品質検査、全工程追跡管理などが含まれます。すべての製品は中国と日本の関連法規基準に適合しています。"
    },
    {
      question: "将来の商品輸出事業はいつ開始しますか？",
      answer: "2025年下半期から段階的に商品輸出事業の展開を計画しています。現在市場調査とチャネル構築を進めており、2026年に正式に関連事業を開始する予定です。"
    },
    {
      question: "サービス料金はどのように計算されますか？",
      answer: "サービス料金は具体的なプロジェクトの複雑さ、製品の種類、サービス範囲などの要因に基づいて決定されます。透明な価格体系を提供しており、具体的な見積もりについてはお気軽にお問い合わせください。"
    },
    {
      question: "どのように協力を開始できますか？",
      answer: "お電話、メール、またはオンラインフォームからお気軽にお問い合わせください。専門アドバイザーがお客様のご要望をお伺いし、適切なサービスプランをご提案いたします。"
    }
  ],

  servicePromise: {
    title: "サービスのお約束",
    description: "お客様との協力関係を築き、日中貿易の新たな機会を共に開拓することを期待しています",
    promises: [
      {
        title: "迅速な対応",
        description: "24時間以内にお問い合わせにご返答"
      },
      {
        title: "専門的なアドバイス",
        description: "専門的な貿易コンサルティングサービスを提供"
      },
      {
        title: "長期協力",
        description: "長期安定した協力関係を構築"
      }
    ]
  }
};