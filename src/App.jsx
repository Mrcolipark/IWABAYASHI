import { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import langData from "./i18n/langData";
import { motion } from "framer-motion";
import "./index.css";

function App() {
  // 当前语言状态
  const [lang, setLang] = useState("zh");
  const dict = langData[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-300">
      {/* 顶部导航栏 */}
      <Navbar lang={lang} setLang={setLang} />

      {/* 究极高端Banner，支持多语言主副标题 */}
      <Banner slogan={dict.slogan} subtitle={dict.welcome} />

      {/* 主内容：业务服务卡片，动效美化 */}
      <main className="flex flex-col items-center justify-center pt-8 pb-24">
        {/* 业务卡片区块 */}
        <motion.div
          className="flex gap-6 flex-wrap justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.17 } }
          }}
        >
          {dict.services.map((srv, i) => (
            <motion.div
              key={srv}
              whileHover={{ scale: 1.08, boxShadow: "0 6px 32px #3b82f680" }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.11, duration: 0.5 }}
              className="bg-white/90 rounded-2xl px-10 py-8 shadow-lg text-blue-900 text-xl font-semibold mb-4 cursor-pointer transition backdrop-blur-md"
            >
              {srv}
            </motion.div>
          ))}
        </motion.div>
        {/* 联系方式，支持多语言 */}
        <p className="mt-14 text-white/80">{dict.contact}</p>
      </main>
    </div>
  );
}

export default App;
