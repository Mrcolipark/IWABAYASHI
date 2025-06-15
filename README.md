# IWABAYASHI
# 🌟 岩林株式会社官方网站

> 🎨 **顶级视觉效果** | 🌐 **三语言支持** | 📱 **完美响应式**

![IWABAYASHI Logo](public/logo.png)

# 岩林株式会社官网

> 现代化的中日贸易企业官网，支持三语言（中文/日语/英语），响应式设计，配备内容管理系统

## 🌟 项目概览

岩林株式会社（IWABAYASHI Corporation）是一家专注于中日双边贸易的综合性贸易公司。本项目为其打造了一个现代化、国际化的企业官网，旨在展示公司形象、吸引潜在客户、促进业务发展。

### 🎯 项目目标
- 🌐 建立专业的企业在线形象
- 🗾 开拓中日两国市场
- 📱 提供优秀的多设备用户体验
- 📊 通过数据分析指导营销决策

## 📌 最新进展
- 首页、新闻、关于、服务及联系等页面已成功连接CMS
- 页脚导航和联系方式实时读取CMS配置
- 清理过时备份文件，代码更简洁

## ✨ 核心特性

### 🌍 多语言国际化
- **完整的三语言支持**：简体中文、日本語、English
- **智能语言切换**：基于用户地理位置和浏览器语言自动推荐
- **SEO友好**：每种语言独立的URL结构和meta信息
- **本地化体验**：日期格式、数字格式等本地化处理

### 📱 响应式现代设计
- **移动优先**：针对手机端优化的界面设计
- **跨设备兼容**：完美适配桌面、平板、手机
- **现代美学**：简洁大气的设计风格，符合企业形象
- **流畅动画**：精心设计的交互动画和过渡效果

### 🎛️ 内容管理系统 (CMS)
- **可视化编辑**：类似WordPress的后台管理界面
- **多语言内容**：每种语言独立管理和发布
- **实时更新**：内容修改后网站立即生效
- **本地编辑提示**：修改 `content/` 下的 Markdown 后，需运行 `npm run generate-cms`
  重新生成 JSON 文件（或直接执行 `npm start`/`npm run build`，脚本会自动完成）。
- **媒体管理**：图片、文件上传和管理功能
- **全站动态内容**：首页、关于我们、新闻、服务、联系等页面均从CMS读取

### 📈 数据分析 & SEO
- **Google Analytics 4**：完整的用户行为分析
- **搜索引擎优化**：结构化数据、sitemap、robots.txt
- **性能监控**：Web Vitals指标追踪
- **转化追踪**：询盘表单、下载等关键动作监控

## 🛠️ 技术栈

### 前端技术
```json
{
  "框架": "React 18",
  "路由": "React Router 6",
  "样式": "TailwindCSS + 自定义主题",
  "国际化": "react-i18next",
  "状态管理": "React Query + Context",
  "构建工具": "Create React App",
  "分析": "React GA4"
}
```

### 后端与CMS
```json
{
  "CMS": "Strapi (开源无头CMS)",
  "数据库": "PostgreSQL / SQLite",
  "API": "RESTful API",
  "认证": "JWT Token",
  "文件存储": "本地存储 / 云存储"
}
```

### 部署与运维
```json
{
  "前端托管": "Vercel (免费)",
  "后端托管": "Railway / Heroku",
  "CDN": "Vercel Edge Network",
  "域名": "iwabayashi.com (待购买)",
  "SSL": "免费自动续期",
  "监控": "Vercel Analytics + Google Analytics"
}
```

## 📁 项目结构

```
iwabayashi-website/
├── public/                    # 静态资源
│   ├── images/               # 图片资源
│   ├── videos/               # 视频资源
│   └── favicon.ico           # 网站图标
├── src/
│   ├── components/           # 可复用组件
│   │   ├── Layout/          # 布局组件
│   │   ├── UI/              # 基础UI组件
│   │   └── ...
│   ├── pages/               # 页面组件
│   │   ├── Home.jsx         # 首页
│   │   ├── About.jsx        # 关于我们
│   │   ├── Services.jsx     # 服务介绍
│   │   ├── News.jsx         # 新闻动态
│   │   └── Contact.jsx      # 联系我们
│   ├── hooks/               # 自定义Hooks
│   │   ├── useDict.js       # 多语言字典
│   │   └── useCMS.js        # CMS数据获取
│   ├── i18n/                # 国际化配置
│   │   ├── index.js         # i18n配置
│   │   └── resources/       # 翻译资源
│   │       ├── zh/          # 中文翻译
│   │       ├── ja/          # 日语翻译
│   │       └── en/          # 英语翻译
│   ├── services/            # API服务
│   │   └── cmsApi.js        # CMS API接口
│   ├── utils/               # 工具函数
│   │   ├── Analytics.js     # 数据分析
│   │   └── dictUtils.js     # 字典工具
│   └── styles/              # 样式文件
└── package.json             # 项目配置
```

## 🚀 快速开始

### 环境要求
- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器
- Git 版本控制

### 安装和运行

```bash
# 1. 克隆项目
git clone https://github.com/your-username/iwabayashi-website.git
cd iwabayashi-website

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 配置相关参数

# 4. 启动开发服务器
# `npm start` 现会在启动前自动生成最新的 CMS 与新闻数据
npm start

# 5. 访问项目
# 浏览器打开 http://localhost:3000
```

### 环境变量配置

```bash
# .env.local
REACT_APP_CMS_URL=http://localhost:1337
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```


`REACT_APP_GA_TRACKING_ID` 为在 Google Analytics 中创建的 Measurement ID，用于初始化统计脚本。


## 📊 当前开发状态

### ✅ 已完成功能
- [x] **基础架构搭建** - React应用框架
- [x] **页面结构设计** - 5个主要页面布局
- [x] **响应式设计** - 移动端和桌面端适配
- [x] **多语言系统** - 完整的i18n框架
- [x] **组件开发** - 可复用的UI组件库
- [x] **路由配置** - 单页应用路由系统
- [x] **样式系统** - TailwindCSS主题定制
- [x] **性能优化** - 代码分割和懒加载
- [x] **错误处理** - 错误边界和降级展示
- [x] **CMS集成** - 首页、新闻、关于、服务及联系页内容可在后台编辑

### 🚧 开发中功能
- [ ] **真实内容替换** - 将占位内容替换为真实公司信息
- [ ] **联系表单功能** - EmailJS集成和邮件发送
- [ ] **图片资源优化** - 真实图片素材和压缩优化
- [ ] **多语言翻译** - 日语和英语内容翻译完善


### 📋 待开发功能
- [ ] **Google Analytics** - 完整的数据分析配置
- [ ] **SEO优化完善** - 元数据优化和搜索引擎提交
- [ ] **性能监控** - Web Vitals和错误监控
- [ ] **PWA功能** - 离线访问和应用化体验
- [ ] **社交媒体集成** - 分享功能和社交链接


## 🎨 设计系统

### 色彩主题
```css
/* 主色调 - 自然绿色系 */
--brand-green: #1a4d32;      /* 深墨绿 - 主要文字 */
--accent-green: #2d5a3d;     /* 中等绿 - 强调色 */
--light-green: #52b788;      /* 亮绿 - 悬停效果 */
--sage-green: #95d5b2;       /* 浅绿 - 装饰色 */

/* 中性色调 */
--primary-white: #ffffff;
--soft-gray: #f8f9fa;
--text-primary: #1a4d32;
--text-secondary: #6c757d;
```

### 字体系统
- **中文字体**：PingFang SC, Microsoft YaHei
- **日文字体**：Hiragino Kaku Gothic Pro, Yu Gothic
- **英文字体**：Inter, Montserrat
- **代码字体**：JetBrains Mono, Consolas

## 📱 页面功能

### 🏠 首页 (Home)
- 公司品牌展示
- 核心服务介绍
- 多语言欢迎信息
- 行动召唤按钮

### 👥 关于我们 (About)
- 公司简介和历史
- 团队成员介绍
- 企业文化展示
- 发展愿景说明

### 💼 服务介绍 (Services)
- 当前业务详情（日本保健品进口代理）
- 未来业务规划（中国商品出口）
- 服务流程说明
- 业务优势展示

### 📰 新闻动态 (News)
- 公司新闻发布
- 行业分析文章
- 市场洞察分享
- 分类筛选功能

### 📞 联系我们 (Contact)
- 联系表单提交
- 公司联系信息
- 地理位置展示
- 常见问题解答

## 🔧 开发工具和命令

### 可用脚本
```bash
# 开发模式
# 自动生成 CMS 与新闻数据后启动
npm start

# 生产构建
npm run build

# 构建脚本会自动生成 CMS 与新闻数据
# (等同于依次执行 `npm run generate-cms` 和 `npm run generate-news`)

# 生成 CMS 数据并启动开发服务器
npm run dev

# 测试运行
npm test

# 代码检查
npm run lint

# 类型检查
npm run type-check

# 依赖分析
npm run analyze
```

### 代码质量工具
- **ESLint** - 代码规范检查
- **Prettier** - 代码格式化
- **Husky** - Git钩子管理
- **lint-staged** - 暂存文件检查

## 📈 性能指标

### 目标性能指标
- **首次内容绘制 (FCP)**: < 1.5s
- **最大内容绘制 (LCP)**: < 2.5s
- **首次输入延迟 (FID)**: < 100ms
- **累积布局偏移 (CLS)**: < 0.1

### 优化策略
- 图片懒加载和WebP格式
- 代码分割和按需加载
- CDN内容分发网络
- 浏览器缓存策略

## 🌐 部署信息

### 测试环境
- **URL**: https://iwabayashi-dev.vercel.app
- **CMS**: https://iwabayashi-cms-dev.railway.app
- **自动部署**: 每次提交到develop分支

### 生产环境
- **URL**: https://iwabayashi.com (待配置)
- **CMS**: https://cms.iwabayashi.com (待配置)
- **自动部署**: 每次提交到main分支
- Netlify 构建流程会自动执行 `npm run generate-cms` 和 `npm run generate-news`

## 🤝 贡献指南

### 开发流程
1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request
6. 等待 CI 自动执行 `npm run generate-cms` 与 `npm run generate-news`

### 代码规范
- 使用 ESLint 和 Prettier 保持代码风格一致
- 组件名使用 PascalCase
- 文件名使用 camelCase
- 提交信息遵循 Conventional Commits 规范

## 📚 技术文档

### 相关文档链接
- [React官方文档](https://reactjs.org/)
- [TailwindCSS文档](https://tailwindcss.com/)
- [React i18next文档](https://react.i18next.com/)
- [Strapi文档](https://docs.strapi.io/)
- [Vercel部署文档](https://vercel.com/docs)

### 项目特定文档
- [多语言配置指南](./docs/i18n-guide.md)
- [CMS使用手册](./docs/cms-manual.md) (待创建)
- [部署操作指南](./docs/deployment-guide.md) (待创建)

## 🐛 问题反馈

如果您在使用过程中遇到问题，请：

1. 查看 [Issues](https://github.com/your-username/iwabayashi-website/issues)
2. 搜索是否有类似问题
3. 创建新的 Issue 并详细描述问题

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者信息

**开发者**: [Dana Ainiwaer]
- GitHub: [@Mrcolipark]((https://github.com/Mrcolipark/))
- 邮箱: danaanwer@outlook.com
- 项目开始时间: 2025年6月

## 🎯 项目里程碑

### 版本历史
- **v0.1.0** (2025-06-08) - 项目初始化，基础架构搭建
- **v0.2.0** (2025-06-11) - 页面组件开发完成
- **v0.3.0** (2025-06-14) - CMS 集成并接入首页、新闻、关于、服务与联系页内容
- **v1.0.0** (计划中) - 正式版本发布

### 近期计划
- [x] 完成CMS系统集成 (已完成)
- [ ] 真实内容和图片替换 (预计1周)
- [ ] 功能测试和优化 (预计3天)
- [ ] 正式部署上线 (预计2天)

---

## 🌟 致谢

感谢所有为这个项目提供帮助和支持的朋友们，特别是：
- 岩林株式会社团队提供的业务需求和内容支持
- 开源社区提供的优秀工具和库
- 设计师朋友们的视觉建议和反馈

**让我们一起打造优秀的企业级网站！** 🚀
---

**🌟 岩林株式会社** - 搭建中日优质商品流通桥梁，用最美的网站展现最专业的服务
