import common from './common';
import home from './home';
import about from './about';
import services from './services';
import news from './news';
import contact from './contact';
import footer from './footer';
import meta from './meta';
import stats from './stats';

export default {
  // 通用翻译
  ...common,
  
  // SEO元数据
  meta,
  
  // 各页面翻译
  home,
  about,
  services,
  news,
  contact,
  
  // 其他组件翻译
  footer,
  stats
};