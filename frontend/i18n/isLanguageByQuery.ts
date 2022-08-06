export type Languages = 'en' | 'ja';

export function isLanguageByQuery(lang: string | string[] | undefined): Languages {
  if (typeof lang === 'string') {
    switch (lang) {
      case 'en':
        return 'en';
      case 'ja':
        return 'ja';
    }
  }
  return 'en';
}
