const en = require('./translations.en.json');
const ja = require('./translations.ja.json');

const i18n = {
  translations: {
    en: en.i18n,
    ja: ja.i18n,
  },
  defaultLang: 'en',
  useBrowserDefault: true,
};

module.exports = i18n;
