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
  // Common translations
  ...common,
  
  // SEO metadata
  meta,
  
  // Page translations
  home,
  about,
  services,
  news,
  contact,
  
  // Component translations
  footer,
  stats
};