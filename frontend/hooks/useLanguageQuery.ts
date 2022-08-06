import { NextRouter } from 'next/router';

type LanguageQuery = {
  lang?: string;
};

export const useLanguageQuery = (router: NextRouter): LanguageQuery => {
  if (typeof router.query.lang === 'string') {
    return {
      lang: router.query.lang,
    };
  } else {
    return {};
  }
};
