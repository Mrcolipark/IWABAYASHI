// src/utils/dictUtils.js
// 安全的字典访问工具函数

/**
 * 安全获取嵌套对象属性
 * @param {Object} obj - 源对象
 * @param {string} path - 属性路径，如 'about.title'
 * @param {any} defaultValue - 默认值
 * @returns {any} 属性值或默认值
 */
export function safeGet(obj, path, defaultValue = '') {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  
  return result !== undefined && result !== null ? result : defaultValue;
}

/**
 * 安全获取数组元素
 * @param {Array} arr - 源数组
 * @param {number} index - 索引
 * @param {any} defaultValue - 默认值
 * @returns {any} 数组元素或默认值
 */
export function safeArrayGet(arr, index, defaultValue = '') {
  if (!Array.isArray(arr) || index < 0 || index >= arr.length) {
    return defaultValue;
  }
  return arr[index] !== undefined ? arr[index] : defaultValue;
}

/**
 * 安全获取菜单项
 * @param {Object} dict - 字典对象
 * @param {number} index - 菜单索引
 * @returns {string} 菜单项文本
 */
export function getMenuLabel(dict, index) {
  const defaultMenus = ['首页', '关于我们', '服务', '新闻', '联系我们'];
  return safeArrayGet(safeGet(dict, 'menu', defaultMenus), index, defaultMenus[index] || '页面');
}

/**
 * 安全获取页面标题
 * @param {Object} dict - 字典对象
 * @param {string} page - 页面名称
 * @returns {string} 页面标题
 */
export function getPageTitle(dict, page) {
  const titles = {
    home: safeGet(dict, 'home.title', '首页'),
    about: safeGet(dict, 'about.title', '关于我们'),
    services: safeGet(dict, 'services.title', '服务'),
    news: safeGet(dict, 'news.title', '新闻'),
    contact: safeGet(dict, 'contact.title', '联系我们')
  };
  
  return titles[page] || '岩林株式会社';
}

/**
 * 安全获取联系信息
 * @param {Object} dict - 字典对象
 * @param {string} field - 字段名
 * @returns {string} 联系信息
 */
export function getContactInfo(dict, field) {
  const defaults = {
    email: 'info@iwabayashi.com',
    phone: '+81-3-1234-5678',
    address: '日本东京都港区',
    company: '岩林株式会社',
    businessHours: '周一至周五 9:00-18:00'
  };
  
  return safeGet(dict, `contact.info.${field}`, defaults[field] || '');
}

/**
 * 安全获取表单标签
 * @param {Object} dict - 字典对象
 * @param {string} field - 字段名
 * @returns {string} 表单标签
 */
export function getFormLabel(dict, field) {
  const defaults = {
    name: '姓名',
    email: '邮箱',
    company: '公司',
    phone: '电话',
    subject: '主题',
    message: '留言',
    submit: '发送'
  };
  
  return safeGet(dict, `contact.form.${field}`, defaults[field] || field);
}

/**
 * 检查字典完整性
 * @param {Object} dict - 字典对象
 * @returns {Object} 检查结果
 */
export function validateDict(dict) {
  const requiredPaths = [
    'meta.title',
    'menu',
    'home.slogan',
    'about.title',
    'services.title',
    'news.title',
    'contact.title'
  ];
  
  const missing = [];
  const warnings = [];
  
  for (const path of requiredPaths) {
    const value = safeGet(dict, path, null);
    if (value === null || value === '') {
      missing.push(path);
    }
  }
  
  // 检查菜单数组长度
  const menu = safeGet(dict, 'menu', []);
  if (!Array.isArray(menu) || menu.length < 5) {
    warnings.push('Menu array incomplete');
  }
  
  return {
    isValid: missing.length === 0,
    missing,
    warnings,
    completeness: ((requiredPaths.length - missing.length) / requiredPaths.length * 100).toFixed(1)
  };
}

/**
 * 创建带默认值的安全字典
 * @param {Object} originalDict - 原始字典
 * @param {Object} fallbackDict - 后备字典
 * @returns {Object} 安全字典
 */
export function createSafeDict(originalDict, fallbackDict) {
  if (!originalDict && !fallbackDict) {
    return getDefaultDict();
  }
  
  if (!originalDict) {
    return fallbackDict || getDefaultDict();
  }
  
  if (!fallbackDict) {
    return originalDict;
  }
  
  // 深度合并，originalDict 优先，fallbackDict 作为默认值
  return deepMerge(fallbackDict, originalDict);
}

/**
 * 深度合并对象
 * @param {Object} target - 目标对象
 * @param {Object} source - 源对象
 * @returns {Object} 合并后的对象
 */
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

/**
 * 获取默认字典
 * @returns {Object} 默认字典对象
 */
function getDefaultDict() {
  return {
    meta: {
      title: '岩林株式会社',
      description: '专业的中日贸易综合服务商',
      keywords: '日本贸易,保健品进口,岩林株式会社'
    },
    menu: ["首页", "关于我们", "服务", "新闻", "联系我们"],
    home: {
      slogan: "连接优质产品",
      subtitle: "搭建中日贸易桥梁",
      description: "专业的贸易服务商"
    },
    about: {
      title: "关于我们",
      subtitle: "专业的贸易服务",
      companyInfo: {
        name: "岩林株式会社",
        englishName: "IWABAYASHI Corporation",
        established: "2025年",
        headquarters: "日本",
        business: "中日贸易服务"
      }
    },
    services: {
      title: "服务",
      subtitle: "专业的贸易服务"
    },
    news: {
      title: "新闻",
      subtitle: "最新动态"
    },
    contact: {
      title: "联系我们",
      subtitle: "期待合作",
      info: {
        email: "info@iwabayashi.com",
        phone: "+81-3-1234-5678",
        address: "日本东京都",
        company: "岩林株式会社"
      },
      form: {
        name: "姓名",
        email: "邮箱",
        submit: "发送"
      }
    },
    footer: {
      description: "专业的贸易服务商"
    }
  };
}