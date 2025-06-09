import React, { useState, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import langData from "./i18n/langData";
import "./index.css";

// 懒加载非首屏组件
const ServicesSection = React.lazy(() => import("./components/Services"));
const ContactSection = React.lazy(() => import("./components/Contact"));

function App() {
  const [lang, setLang] = useState("zh");
  const dict = langData[lang];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100" lang={lang}>
      <ErrorBoundary>
        <Navbar lang={lang} setLang={setLang} />
      </ErrorBoundary>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner 区域 */}
        <ErrorBoundary>
          <Banner slogan={dict.slogan} subtitle={dict.subtitle} />
        </ErrorBoundary>

        {/* 服务介绍 （懒加载） */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-64 bg-gray-800 rounded-lg animate-pulse" />}>
            <section id="services" className="mt-16">
              <h2 className="text-2xl font-bold text-emerald-300 mb-8 text-center">
                {dict.servicesTitle}
              </h2>
              <ServicesSection services={dict.services} />
            </section>
          </Suspense>
        </ErrorBoundary>

        {/* 联系方式 （懒加载） */}
        <ErrorBoundary>
          <Suspense fallback={<div className="h-96 bg-gray-800 rounded-lg animate-pulse mt-16" />}>
            <section id="contact" className="mt-16">
              <h2 className="text-2xl font-bold text-emerald-300 mb-8 text-center">
                {dict.contactTitle}
              </h2>
              <ContactSection dict={dict} />
            </section>
          </Suspense>
        </ErrorBoundary>

        {/* 页脚 */}
        <footer className="mt-20 text-center py-8 border-t border-gray-700">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} 岩林株式会社 (IWABAYASHI)
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
