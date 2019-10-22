import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementRuLocale from 'element-ui/lib/locale/lang/ru-RU'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';// element-ui lang
import elementViLocale from 'element-ui/lib/locale/lang/vi';// element-ui lang
import enLocale from './en';
import ruLocale from './ru';
import zhLocale from './zh';
import viLocale from './vi';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  ru: {
    ...ruLocale,
    ...elementRuLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
  vi: {
    ...viLocale,
    ...elementViLocale,
  },
};

export function getLanguage() {
  const chooseLanguage = Cookies.get('language');
  if (chooseLanguage) {
    return chooseLanguage;
  }

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'en';
}
const i18n = new VueI18n({
  // set locale
  // options: en | ru | vi | zh
  locale: getLanguage(),
  // set locale messages
  messages,
});

export default i18n;
