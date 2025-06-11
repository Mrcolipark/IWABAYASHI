export default {
  title: "News",
  subtitle: "Latest developments and industry insights",
  
  categories: [
    { id: "all", label: "All" },
    { id: "company", label: "Company News" },
    { id: "market", label: "Market Analysis" },
    { id: "industry", label: "Industry Insights" }
  ],

  articles: [
    {
      id: 1,
      title: "IWABAYASHI Corporation Officially Established",
      date: "2025-01-15",
      category: "Company News",
      summary: "IWABAYASHI Corporation officially established, dedicated to building new bridges for China-Japan trade",
      content: "In January 2025, IWABAYASHI Corporation was officially established. As a comprehensive trading company focusing on China-Japan bilateral trade, we will uphold the business philosophy of professionalism, efficiency, and win-win cooperation, actively expand international market resources, and build bridges for China-Japan commodity circulation.\n\nFrom the beginning of the company's establishment, we have clarified our development direction: starting with Japanese health product import agency and gradually expanding to commodity export and other fields. We believe that through professional services and unremitting efforts, we will surely contribute to economic and trade cooperation between China and Japan."
    },
    {
      id: 2,
      title: "Japanese Health Product Market Analysis Report",
      date: "2025-01-10",
      category: "Market Analysis",
      summary: "In-depth analysis of the current status and development trends of the Japanese health product market",
      content: "The Japanese health product market is globally renowned for its strict quality standards and advanced production technology. According to the latest market data, the Japanese health product market size continues to grow, with an annual growth rate of 15.2%.\n\nMarket characteristics include: extremely high consumer quality requirements, strong demand for functional products, and aging society driving market development. This provides good opportunities for introducing premium Japanese health products to the Chinese market."
    },
    {
      id: 3,
      title: "New Opportunities for China-Japan Trade Cooperation",
      date: "2025-01-05",
      category: "Industry Insights",
      summary: "Exploring new development opportunities for trade cooperation between China and Japan",
      content: "With the deepening development of global economic integration, China and Japan are welcoming new development opportunities in trade cooperation. Both sides have broad cooperation space in health industry, advanced manufacturing, green energy and other fields.\n\nEspecially with the rapid development of cross-border e-commerce, the trade models of the two countries are undergoing profound changes, providing enterprises with more cooperation possibilities."
    }
  ],

  industryTrends: {
    title: "Industry Trends Overview",
    description: "Grasping the pulse of China-Japan trade development and insights into market change trends",
    trends: [
      {
        title: "Japanese Health Food Market",
        trend: "Continuous Growth",
        value: "15.2%",
        desc: "Annual Growth Rate"
      },
      {
        title: "China-Japan Trade Volume",
        trend: "Steady Rise",
        value: "¥3.2 Trillion",
        desc: "2024 Forecast"
      },
      {
        title: "Cross-border E-commerce Growth",
        trend: "Rapid Development",
        value: "28.5%",
        desc: "Year-over-year Growth"
      }
    ]
  },

  newsletter: {
    title: "Subscribe to Our Newsletter",
    description: "Get the latest China-Japan trade developments and market insights first",
    placeholder: "Enter your email address",
    subscribe: "Subscribe"
  },

  noArticles: "No related articles",
  selectOtherCategory: "Please select other categories to view more content"
};