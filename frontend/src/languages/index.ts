import ja from '@/languages/_ja';
import en from '@/languages/_en';
import ko from '@/languages/_ko';
import zhHantTw from '@/languages/_zh_hant_tw';
import zh from '@/languages/_zh';

export type lang = typeof ja;

export const languages = [
  {
    code: 'ja',
    label: '日本語',
  },
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'ko',
    label: '한국어',
  },
  {
    code: 'zh',
    label: '中文簡体',
  },
  {
    code: 'zh-hant-tw',
    label: '中文繁体',
  },
];

/**
 * Convert the i18n language key on the front end side and the language key on the Strapi side
 */
export function languageSwitchToStrapi(locale: string): string {
  switch (locale) {
    case 'en':
      return 'en';
    case 'ja':
      return 'ja-JP';
    case 'ko':
      return 'ko';
    case 'zh':
      return 'zh';
    case 'zh-hant-tw':
      return 'zh-Hant-TW';
    case 'all':
      return 'all';
    default:
      return 'ja-JP';
  }
}

/**
 * Convert the i18n language key on the front end side and the language key on the Strapi side
 */
export function languageSwitchToFrontend(locale: string): string {
  switch (locale) {
    case 'en':
      return 'en';
    case 'ja-JP':
      return 'ja';
    case 'ko':
      return 'ko';
    case 'zh':
      return 'zh';
    case 'zh-Hant-TW':
      return 'zh-hant-tw';
    case 'all':
      return 'all';
    default:
      return 'ja';
  }
}

export const langSelecter = (locale?: string): lang => {
  switch (locale) {
    case 'en':
      return en;
    case 'ja':
      return ja;
    case 'ko':
      return ko;
    case 'zh':
      return zh;
    case 'zh-hant-tw':
      return zhHantTw;
    default:
      return en;
  }
};
