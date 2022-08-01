/*

 注意：このファイルは node_modules 内部の next-export-i18n から読み込みを行なっている為、
      ファイル名を変更すると作動しなくなります

*/
const en = require('./translations.en.json');
const ja = require('./translations.ja.json');

const i18n = {
  translations: {
    en: en.i18n,
    ja: ja.i18n,
  },
  defaultLang: 'en',
  useBrowserDefault: process.env.NODE_ENV === 'production',
};

module.exports = i18n;
