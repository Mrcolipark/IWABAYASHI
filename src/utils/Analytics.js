// 用户行为分析和事件追踪

// 初始化分析工具
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

export function initAnalytics() {
  // Google Analytics 4 初始化
  if (GA_TRACKING_ID && typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  } else if (!GA_TRACKING_ID) {
    console.warn('GA_TRACKING_ID is not defined');
  }
  
  console.log('Analytics initialized');
}

// 事件追踪
export function trackEvent(eventName, properties = {}) {
  try {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: properties.category || 'user_interaction',
        event_label: properties.label,
        value: properties.value,
        ...properties
      });
    }
    
    // 控制台日志（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Event tracked:', eventName, properties);
    }
    
    // 自定义分析（可以集成其他分析工具）
    if (window.customAnalytics) {
      window.customAnalytics.track(eventName, properties);
    }
    
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

// 页面浏览追踪
export function trackPageView(page, title = '') {
  trackEvent('page_view', {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: page
  });
}

// 用户交互追踪
export function trackUserInteraction(action, element, section = '') {
  trackEvent('user_interaction', {
    action,
    element,
    section,
    timestamp: Date.now()
  });
}

// 业务事件追踪
export function trackBusinessEvent(event, data = {}) {
  trackEvent('business_event', {
    business_event: event,
    ...data,
    timestamp: Date.now()
  });
}

// 性能监控
export function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        trackEvent('performance', {
          load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          dom_ready: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          first_paint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0)
        });
      }, 0);
    });
  }
}

// 错误追踪
export function trackError(error, errorInfo = {}) {
  trackEvent('error', {
    error_message: error.message,
    error_stack: error.stack,
    error_info: JSON.stringify(errorInfo),
    url: window.location.href,
    timestamp: Date.now()
  });
}

// Web Vitals 监控（需要安装 web-vitals 包）
export function trackWebVitals() {
  try {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      function sendToAnalytics(metric) {
        trackEvent('web_vital', {
          metric_name: metric.name,
          metric_value: metric.value,
          metric_id: metric.id,
        });
      }

      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  } catch (error) {
    console.warn('Web Vitals not available:', error);
  }
}

// 用户会话追踪
export function trackSession() {
  const sessionStart = Date.now();
  const sessionId = Math.random().toString(36).substr(2, 9);
  
  // 会话开始
  trackEvent('session_start', {
    session_id: sessionId,
    timestamp: sessionStart
  });
  
  // 页面卸载时追踪会话结束
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Date.now() - sessionStart;
    trackEvent('session_end', {
      session_id: sessionId,
      session_duration: sessionDuration,
      timestamp: Date.now()
    });
  });
  
  return sessionId;
}

// A/B 测试支持
export function getABTestVariant(testName, variants = ['A', 'B']) {
  const userId = localStorage.getItem('user_id') || Math.random().toString(36).substr(2, 9);
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const variant = variants[Math.abs(hash) % variants.length];
  
  trackEvent('ab_test_assignment', {
    test_name: testName,
    variant,
    user_id: userId
  });
  
  return variant;
}

// 热力图数据收集
export function trackHeatmap(element, action = 'click') {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  trackEvent('heatmap_interaction', {
    action,
    x: rect.left + rect.width / 2,
    y: rect.top + scrollTop + rect.height / 2,
    element_tag: element.tagName,
    element_class: element.className,
    element_id: element.id,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight
  });
}

// 初始化所有追踪
export function initAllTracking() {
  initAnalytics();
  trackPerformance();
  trackWebVitals();
  trackSession();
  
  // 全局错误捕获
  window.addEventListener('error', (event) => {
    trackError(event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  // 未处理的 Promise 拒绝
  window.addEventListener('unhandledrejection', (event) => {
    trackError(new Error(event.reason), {
      type: 'unhandled_promise_rejection'
    });
  });
}