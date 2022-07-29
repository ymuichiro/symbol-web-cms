import { LangsCode } from '../model/SystemModel';

/**
 * key name is same with strapi plugin
 */
export function useIndexLangs(lang: LangsCode) {
  const currentLang: LangsCode = lang;

  const obj = {
    sub_title: {
      'ja-JP': '個人に力を与える、Symbolブロックチェーン',
      en: 'Empowering Individuals, Symbol Blockchain',
    },
  };

  return {
    get: (key: keyof typeof obj) => obj[key][currentLang],
  };
}
